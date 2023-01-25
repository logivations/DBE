/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export enum DxOperations {
	EQUALS = '=',
	NOT_EQUALS = '<>',
	LESS_THEN = '<',
	LESS_THEN_OR_EQUAL = '<=',
	GREATER_THEN = '>',
	GREATER_THEN_OR_EQUAL = '>=',
	CONTAINS = 'contains',
	STATS_WITH = 'startswith',
	ENDS_WITH = 'endswith',
	NOT_CONTAINS = 'notcontains',
	IS_BLANK = 'isblank',
	IS_NOT_BLANK = 'isnotblank',
	ANY_OF = 'anyof',
	NONE_OF = 'noneof',
	BETWEEN = 'between',
	SEARCH_IN_TEXT = 'searchintext',
}
