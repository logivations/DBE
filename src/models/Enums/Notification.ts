/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export enum Severity {
	SUCCESS,
	INFO,
	WARNING,
	ERROR,
}

export const getNotificationType = (severity: number): string => {
	switch (severity) {
		case Severity.SUCCESS:
			return 'success';
		case Severity.INFO:
			return 'info';
		case Severity.ERROR:
			return 'error';
		case Severity.WARNING:
			return 'warning';
		default:
			return 'info';
	}
};
