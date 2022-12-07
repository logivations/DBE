/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {FilterItem} from './index';
import {SqlCondition} from '../Enums';
import {GroupOperators} from '../Enums/SqlSpecificOperator';

class FilterGroup {
    private interactiveFilterCriteria?: FilterItem[];
    private operatorNullable?: SqlCondition;
    private empty?: boolean;
    private filterGroups: FilterGroup[] = [];

    constructor(
        private operator: SqlCondition = SqlCondition.AND,
        private readonly filterCriteria: FilterItem[] = [],
	) {}

	public static getOperator(filter: any): SqlCondition {
		const getOperator = (operator: any) => {
			switch (operator) {
				case GroupOperators.AND:
					return isNotOperatorExist ? SqlCondition.AND_NOT : SqlCondition.AND;
				case GroupOperators.OR:
					return isNotOperatorExist ? SqlCondition.OR_NOT : SqlCondition.OR;
				default:
					return SqlCondition.AND;
			}
		};
		const isNotOperatorExist =
			Array.isArray(filter) && !!filter.find((operator: string) => operator === SqlCondition.NOT);
		const mainFilter = isNotOperatorExist ? filter[1] : filter;

		return Array.isArray(mainFilter)
			? mainFilter.reduce((acc: any, smallFilter: any) => {
					if (smallFilter === GroupOperators.AND) {
						return getOperator(smallFilter);
					}
					return acc;
			  }, SqlCondition.AND)
			: getOperator(mainFilter);
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

	public static createFilterGroup(filters: any, sqlOperator: SqlCondition = SqlCondition.AND): FilterGroup {
		if (typeof filters[0] === 'string' && filters[0] !== SqlCondition.NOT) {
			const [colName, operator, value, refTable] = filters;
			const filterItem = new FilterItem(colName, operator, value, refTable);
			return new FilterGroup(sqlOperator, [filterItem]);
		}
		if (filters[0] === SqlCondition.NOT) {
			return FilterGroup.createFilterGroup(filters[1], this.getOperator(filters));
		}
		return filters.reduce((filterGroup: FilterGroup | null, filter: any[] | any, index, arr) => {
			if (typeof filter === 'string' && filter !== SqlCondition.NOT) {
				filterGroup && filterGroup.setOperator(sqlOperator);
			}

			if (filter.setting && filter.setting instanceof FilterGroup) {
				filterGroup.addFilterGroup(filter.setting);
			}
			if (Array.isArray(filter)) {
				const [colName, operator, value, refTable] = filter;
				const isSingleFilter = typeof colName === 'string';
				if (isSingleFilter) {
					const filterItems = FilterItem.create(colName, operator, value, refTable);
					filterItems.forEach((filterItem) => filterGroup.addFilterCriteria(filterItem));
				} else {
					const operator = this.getOperator(filter);
					filterGroup.addFilterGroup(FilterGroup.createFilterGroup(filter, operator));
				}
			}
			return filterGroup;
		}, new FilterGroup());
	}

	public static createFilterForLink(filters) {
		const criterias = filters.map(([key, values]) => ({
			column: key,
			operator: 'IN',
			values: values.map((val) => val.toString()),
		}));
		return { condition: SqlCondition.OR, criteria: criterias, sub: [] };
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
