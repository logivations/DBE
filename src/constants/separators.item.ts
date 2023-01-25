/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import translate from '../i18n/localization';

export const fieldSeparator = [
	{ id: 0, text: translate('SEMICOLON'), value: ';' },
	{ id: 1, text: translate('COMMA'), value: ',' },
	{ id: 2, text: translate('COLON'), value: ':' },
	{ id: 3, text: translate('PIPE'), value: '|' },
	{ id: 3, text: translate('EXCLAMATION_MARK'), value: '!' },
];

export const floatingPointSeparator = [
	{ id: 0, text: translate('PERIOD'), value: '.' },
	{ id: 1, text: translate('COMMA'), value: ',' },
];

export const nullValueEscape = [
	{ id: 0, text: translate('_CSV_NULL'), value: '\\N' },
	{ id: 1, text: translate('EMPTY_STRING'), value: '' },
];
// export const recordSeparator = [
// 	{ id: 0, text: translate('_CSV_NULL'), value: 'LINE_BREAK_UNIX' },
// 	{ id: 1, text: translate('_CSV_DELIMITER_MAC'), value: 'LINE_BREAK_MAC' },
// 	{ id: 2, text: translate('_CSV_DELIMITER_WINDOWS'), value: 'LINE_BREAK_WINDOWS' },
// ];
export const recordSeparator = [
	{ id: 0, text: translate('_CSV_NULL'), value: '\n' },
	{ id: 1, text: translate('_CSV_DELIMITER_MAC'), value: '\r' },
	{ id: 2, text: translate('_CSV_DELIMITER_WINDOWS'), value: '\r\n' },
];

export const thousandSeparator = [
	{ id: 0, text: translate('EMPTY_STRING'), value: ' ' },
	{ id: 1, text: translate('PERIOD'), value: '.' },
	{ id: 2, text: translate('COMMA'), value: ',' },
];
