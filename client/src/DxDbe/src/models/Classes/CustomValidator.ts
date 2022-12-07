/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { CustomValidatorType } from '../Enums';

class CustomValidator {
	customValidatorType?: CustomValidatorType;
	parameters?: string[];

	public checkIfRelatedParamsValidator() {}
}

export default CustomValidator;
