/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {FilterItem} from './index';
import {SqlCondition} from '../Enums';
import {GroupOperators} from '../Enums/SqlSpecificOperator';

class FilterGroup {
	public static MAX_LENGTH_URL_FILTER = 2048;

	private interactiveFilterCriteria?: FilterItem[];
	private operatorNullable?: SqlCondition;
	private empty?: boolean;
	private filterGroups: Array<FilterGroup> = [];

	constructor(
		private operator: SqlCondition = SqlCondition.AND,
		private readonly filterCriteria: Array<FilterItem> = [],
	) {}

	public static getOperator(filter: any, isNotOperator = false): SqlCondition {
		const getOperator = (operator) => {
			switch (operator) {
				case GroupOperators.AND:
					return isNotOperator ? SqlCondition.AND_NOT : SqlCondition.AND;
				case GroupOperators.OR:
					return isNotOperator ? SqlCondition.OR_NOT : SqlCondition.OR;
			}
		};

		return filter.reduce((operator, filterItem) => {
			if (
				typeof filterItem === 'string' &&
				(filterItem === GroupOperators.AND || filterItem === GroupOperators.OR)
			) {
				return getOperator(filterItem);
			}
			return operator;
		}, SqlCondition.AND);
	}

	public static create(filter): FilterGroup {
		if (!filter) return new FilterGroup();
		const { condition, criteria, sub } = filter;
		const filterGroup = new FilterGroup(condition);
		criteria.forEach(({ column, operator, values, interactive, refTable }) => {
			filterGroup.addFilterCriteria(new FilterItem(column, operator, values, interactive, refTable));
		});

		if (sub && sub.length) {
			sub.forEach((subFilter) => filterGroup.addFilterGroup(this.create(subFilter)));
		}
		return filterGroup;
	}

	public static parseFilterGroupToDxFilter(filterGroup: FilterGroup) {
		const getFilterItems = (filterCriteria, criteria) =>
			filterCriteria.reduce((filterItems, filterItem, index) => {
				filterItems.push(filterItem.parseToDxFilter());
				if (index !== filterGroup.filterCriteria.length - 1) {
					filterItems.push(criteria);
				}
				return filterItems;
			}, []);
		const filter = [];
		if (filterGroup.operator === SqlCondition.AND_NOT) {
			filter.push('!', getFilterItems(filterGroup.filterCriteria, SqlCondition.AND));
		} else if (filterGroup.operator === SqlCondition.OR_NOT) {
			filter.push('!', getFilterItems(filterGroup.filterCriteria, SqlCondition.OR));
		} else {
			filter.push(...getFilterItems(filterGroup.filterCriteria, filterGroup.operator));
		}

		if (filterGroup.filterGroups.length) {
			filter.push(filterGroup.operator);
			filterGroup.filterGroups.forEach((filterG) => {
				filter.push(this.parseFilterGroupToDxFilter(filterG));
			});
		}
		return filter;
	}

	public static isFilterGroup(filter) {
		return (
			Array.isArray(filter) &&
			filter.some(
				(item) =>
					item === GroupOperators.AND ||
					item === GroupOperators.OR ||
					FilterItem.isFilterItem(item) ||
					item === SqlCondition.NOT,
			)
		);
	}

	public static createFilterGroup(filters: any, sqlOperator?: SqlCondition, modifyValue = (s) => s): FilterGroup {
		if (filters[0] === SqlCondition.NOT) {
			return FilterGroup.createFilterGroup(filters[1], FilterGroup.getOperator(filters[1], true));
		}
		const filterGroup = new FilterGroup();
		filterGroup.setOperator(sqlOperator || FilterGroup.getOperator(filters));

		if (FilterItem.isFilterItem(filters)) {
			const [colName, operator, value] = filters;
			const filterItem = new FilterItem(colName, operator, modifyValue(value));
			filterGroup.addFilterCriteria(filterItem);
			return filterGroup;
		}
		if (FilterGroup.isFilterGroup(filters)) {
			filters.forEach((filter) => {
				if (FilterItem.isFilterItem(filter)) {
					const [colName, operator, value] = filter;
					filterGroup.addFilterCriteria(new FilterItem(colName, operator, modifyValue(value)));
				} else if (FilterGroup.isFilterGroup(filter)) {
					const operator = FilterGroup.getOperator(filter);
					filterGroup.addFilterGroup(FilterGroup.createFilterGroup(filter, operator, modifyValue));
				} else if (Object.hasOwn(filter, 'setting') && filter.setting instanceof FilterGroup) {
					filterGroup.addFilterGroup(filter.setting);
				}
			});
			return filterGroup;
		}
		return filterGroup;
	}

	public static createFilterForLink(filters) {
		const criterias = filters.map(([key, values]) => ({
			column: key,
			operator: 'IN',
			values: values.map((val) => val.toString()),
		}));
		return { condition: SqlCondition.AND, criteria: criterias, sub: [] };
	}

	public getFilterCriteria(): FilterItem[] {
		return this.filterCriteria;
	}

	public getFilterGroups(): FilterGroup[] {
		return this.filterGroups;
	}

	public getOperator(): SqlCondition {
		return this.operator;
	}

	public addFilterGroup(filterGroup: FilterGroup): FilterGroup {
		this.filterGroups.push(filterGroup);
		return this;
	}

	public addFilterCriteria(filterItem: FilterItem): FilterGroup {
		this.filterCriteria.push(filterItem);
		return this;
	}

	public setOperator(operator: SqlCondition) {
		this.operator = operator;
		return this;
	}

	public isZeroFilter(): boolean {
		return this.filterGroups.isEmpty() && this.filterCriteria.isEmpty();
	}
}

export default FilterGroup;
