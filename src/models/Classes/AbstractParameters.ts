/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class AbstractParameters<T> {
	realUserAcronym?: string;
	userAcronym?: string;
	format?: string;

	[key: string]: any;
}

export default AbstractParameters;
