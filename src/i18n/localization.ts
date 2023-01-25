/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/


export const formatter = function (string: string, ...args: any[]) {
	if (args.length >= 1) {
		for (let i = 0; i < args.length; i++) {
			const regExp = new RegExp(`{${i}+?}`, 'g');
			args[i] !== undefined && (string = string.replace(regExp, args[i]));
		}
	}
	return string;
};

export default function translate(messageKey, ...rest) {
	const M = global['MESSAGES'] || window['MESSAGES'];

	const message = M ? M[messageKey] : messageKey;
	return message ? formatter(message, ...rest) : messageKey;
}
