/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import translate from "../../i18n/localization";

enum MassUpdateRange {
	FILTERED_ROWS = 'FILTERED_ROWS',
	SELECTED_ROWS = 'SELECTED_ROWS',
	ENTIRE_BY_URL_FILTER = 'ENTIRE_BY_URL_FILTER',
	ENTIRE_TABLE = 'ENTIRE_TABLE',
}

export const getConfirmationMessageByRange = (range: MassUpdateRange) => {
	switch (range) {
	case MassUpdateRange.FILTERED_ROWS: return translate('_CONFIRM_FILTERED_ROWS_MASS_UPDATE');
	case MassUpdateRange.SELECTED_ROWS: return translate('_CONFIRM_SELECTED_ROWS_MASS_UPDATE');
	case MassUpdateRange.ENTIRE_BY_URL_FILTER: return translate('_CONFIRM_ENTIRE_TABLE_BY_URL_FILTER_MASS_UPDATE');
	case MassUpdateRange.ENTIRE_TABLE: return translate('_CONFIRM_ENTIRE_TABLE_MASS_UPDATE');
	default: return translate('_CONFIRM_ENTIRE_TABLE_MASS_UPDATE');
	}
};

export default MassUpdateRange;
