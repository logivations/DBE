/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum SqlSpecificOperator {
	contains = 'LIKE',
	notcontains = 'NOT LIKE',
	startswith = 'LIKE',
	endswith = 'LIKE',
	anyof = 'IN',
	noneof = 'NOT IN',
	'=' = '=',
	'<>' = '<>',
	'searchintext' = 'SEARCH IN TEXT',
}

export enum SqlOperatorsForNullValues {
	'=' = 'IS NULL',
	'<>' = 'IS NOT NULL',
}

export enum SqlSpecificOperatorReverse {
	'LIKE' = 'contains',
	'NOT LIKE' = 'notcontains',
	'IN' = 'anyof',
	'NOT IN' = 'noneof',
	'IS NULL' = '=',
	'IS NOT NULL' = '<>',
	'SEARCH IN TEXT' = 'searchintext',
}

export enum GroupOperators {
	AND = 'and',
	OR = 'or',
}

export default SqlSpecificOperator;
