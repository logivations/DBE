/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import translate from '../i18n/localization';

export const resultSettings = [
	{ id: 0, text: translate('SHOW_COMMON_RECORDS'), key: 'showCommonRecords' },
	{ id: 1, text: translate('SHOW_CHANGED_ON_DATE'), key: 'showChangedColumn' },
];

export const excludedColumns = ['ID_user_change', 'changed'];
