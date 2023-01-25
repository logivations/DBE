/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { SqlSpecificOperator } from '../Enums';
import { SqlOperatorsForNullValues, SqlSpecificOperatorReverse } from '../Enums/SqlSpecificOperator';
import { DxOperations } from '../../constants/FilterBuilderConstants';
import { isDefined } from '../../utils/utils';

const SqlSpecificOperatorList: string[] = [
	'contains',
	'notcontains',
	'startswith',
	'endswith',
	'anyof',
	'noneof',
	'=',
	'<>',
	'searchintext',
	'>=',
	'<=',
	'>',
	'<',
];
class FilterItem {
	public values: string[];
	private readonly alwaysTrue?: boolean;
	private readonly operator: string;

	constructor(
		private columnName: string,
		operator: any,
		values: string[] | string,
		private readonly refTable?: string,
		private readonly interactive?: boolean,
	) {
		this.values = this.parseValues(values, operator);
		this.operator = this.parseOperator(operator, values);
	}

	static isFilterItem(filterItem) {
		if (Array.isArray(filterItem)) {
			const [colName, operator] = filterItem;
			return typeof colName === 'string' && SqlSpecificOperatorList.includes(operator);
		}
		return false;
	}

	public static create(colName, operator, values, refTable) {
		return [new FilterItem(colName, operator, values, refTable)];
	}

	public getColumnName(): string {
		return this.columnName;
	}

	public getOperator(): string {
		return this.operator;
	}

	public getValues(): string[] {
		return this.values || [];
	}

	public parseValues(values, operator) {
		if (!isDefined(values)) {
			return [null];
		}

		const parsedValues = (Array.isArray(values) ? values : [values]).map((val) => val && val.toString());
		switch (operator) {
			case DxOperations.CONTAINS:
				return parsedValues.map((val) => `%${val}%`);
			case DxOperations.STATS_WITH:
				return parsedValues.map((val) => `${val}%`);
			case DxOperations.ENDS_WITH:
				return parsedValues.map((val) => `%${val}`);
			default:
				return parsedValues;
		}
	}

	public parseOperator(dxOperator, values) {
		if (values === null) {
			return SqlOperatorsForNullValues[dxOperator] || dxOperator;
		}
		return SqlSpecificOperator[dxOperator] || dxOperator;
	}

	public parseValuesToDxFilter() {
		const contains = new RegExp('^(%)(.*)(%)$', 'gm');
		const endsWith = new RegExp('^(%)(.*)$', 'gm');
		const startWith = new RegExp('^(.*)(%)$', 'gm');

		if (!this.values) {
			return null;
		}
		const values = this.values.length > 1 ? this.values : this.values[0];
		const value = this.values[0];

		if (this.operator === 'LIKE' && this.values.length === 1) {
			if (value.matchAll(contains).next().value) {
				return value.matchAll(contains).next().value[2];
			} else if (value.matchAll(endsWith).next().value) {
				return value.matchAll(endsWith).next().value[2];
			} else if (value.matchAll(startWith).next().value) {
				return value.matchAll(startWith).next().value[1];
			}
		}

		return values;
	}

	public parseOperatorToDxFilter() {
		const contains = /^(%)(.*)(%)$/gm;
		const endsWith = /^(%)(.*)$/gm;
		const startWith = /^(.*)(%)$/gm;

		if (this.operator === 'LIKE' && this.values.length === 1) {
			const value = this.values[0];
			if (value.match(contains)) {
				return DxOperations.CONTAINS;
			} else if (value.match(endsWith)) {
				return DxOperations.ENDS_WITH;
			} else if (value.match(startWith)) {
				return DxOperations.STATS_WITH;
			}
		}
		return SqlSpecificOperatorReverse[this.operator] || this.operator;
	}

	public parseToDxFilter() {
		return [this.columnName, this.parseOperatorToDxFilter(), this.parseValuesToDxFilter()];
	}
}

export default FilterItem;
