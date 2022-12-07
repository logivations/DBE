/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import MassUpdateRange from '../models/Enums/MassUpdateRange';
import translate from '../i18n/localization';

export const getButtonNameByType = (type: MassUpdateRange) => {
	switch (type) {
		case MassUpdateRange.ENTIRE_TABLE:
			return translate('_APPLY_ENTIRE_BUTTON');
		case MassUpdateRange.FILTERED_ROWS:
			return translate('_APPLY_TO_FILTERED_BUTTON');
		case MassUpdateRange.ENTIRE_BY_URL_FILTER:
			return translate('_APPLY_TO_FILTERED_BUTTON');
		case MassUpdateRange.SELECTED_ROWS:
			return translate('_APPLY_TO_SELECTED_BUTTON');
		default:
			return translate('APPLY');
	}
};

export const parseBoolean = (value) => {
	if (value === 'true') return true;
	if (value === 'false') return false;
	return value;
};

export const parseValue = (value) => {
	switch (value) {
		case 'true': return true;
		case 'false': return false;
		case 'undefined': return undefined;
		case 'null': return null;
		case '': return undefined;
		default: return value;
	}
};

export const isDefined = (o) => {
	return o !== undefined && o !== null;
};

export const parseToDxFormat = (format: string): string => {
	const formatRegExp = new RegExp('^(#*,?#*)\\.(#*)$', 'gmi');
	const matchResult = format.matchAll(formatRegExp).next().value;
	if (matchResult) {
		const integerPart = matchResult[1];
		const fractionPartLength = matchResult[2].split('').length;
		return integerPart + '0.' + Array(fractionPartLength).fill('0').join('');
	}
	return format;
};


export const checkIfIntegerByFormat = (format: string): boolean => {
	const formatRegExp = new RegExp('^#*$', 'gmi');
	return formatRegExp.test(format);
};


export const sortArray = (array, prop) => {
	return array.sort((a, b) => {
		return a[prop].localeCompare(b[prop]);
	});
}