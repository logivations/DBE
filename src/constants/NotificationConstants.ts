/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2023
 ******************************************************************************/
import { Error, Info, Success, Warning } from '../assets/icons';
import translate from '../i18n/localization';

export const iconsNotify = {
	warning: Warning,
	info: Info,
	error: Error,
	success: Success,
};

export const textNotify = {
	warning: translate('WARNING'),
	info: translate('INFO'),
	error: translate('ERROR'),
	success: translate('SUCCESS'),
};
