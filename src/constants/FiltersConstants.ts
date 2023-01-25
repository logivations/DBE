/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import translate from '../i18n/localization';

export const enum FilterActions {
	ADD_EDIT_FILTER = 'AddEditFilter',
	UNFILTER = 'Unfilter',
}

export const enum SortingActions {
	ADD_EDIT_FILTER = 'AddEditFilter',
	REMOVE_SORTING = 'RemoveSorting',
}

export const enum HiddenColumnActions {
	ADD_EDIT_FILTER = 'AddEditFilter',
	SHOW_HIDDEN_COLUMNS = 'ShowHiddenColumns',
}

export const filtersSplit = [
	{
		text: translate('MY_FILTERS'),
		value: 'my_filters',
		ownerUserFilters: true,
	},
	{
		text: translate('OTHER_FILTERS'),
		value: 'other_filters',
		ownerUserFilters: false,
	},
];

export const NO_FILTER = 'no_filter';
