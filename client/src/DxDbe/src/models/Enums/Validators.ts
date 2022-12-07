/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum Validators {
	'campaignRangeStart' = 'CAMPAIGN_START_DATE_MUST_BE_BEFORE_END_DATE',
	'campaignRangeEnd' = 'CAMPAIGN_END_DATE_MUST_BE_AFTER_START_DATE',
	'uppercaseLatinOrDigitChar' = '_UPPERCASE_OR_DIGIT_VALIDATOR_MESSAGE',
	'onTopTheSameStation' = 'COULD_NOT_SET_STATION_ON_TOP_THE_SAME_STATION',
	'rackAppearanceCalibrationMarkerOfOneType' = '_ONLY_ONE_CALIBRATION_MARKER',
	'positiveNumber' = 'VALUE_SHOULD_BE_POSITIVE',
	'positiveOrZeroNumber' = 'VALUE_SHOULD_BE_POSITIVE_OR_ZERO',
	'rangeMinMax' = 'MIN_VALUE_CANNOT_BE_MORE_THAN_MAX_VALUE_AND_MAX_VALUE_CANNOT_BE_LESS_THAN_MIN_VALUE',
	'chooseOneEndLocation' = 'PLEASE_CHOOSE_ONLY_ONE_END_POINT',
	'chooseOneStartLocation' = 'PLEASE_CHOOSE_ONLY_ONE_START_POINT',
	'checkAccountToAccountEdge' = 'ACCOUNT_TO_ACCOUNT_EDGES_ARE_FORBIDDEN',
}

export enum SimpleValidators {
	'uppercaseLatinOrDigitChar' = '_UPPERCASE_OR_DIGIT_VALIDATOR_MESSAGE',
	'onTopTheSameStation' = 'COULD_NOT_SET_STATION_ON_TOP_THE_SAME_STATION',
	'positiveNumber' = 'VALUE_SHOULD_BE_POSITIVE',
	'positiveOrZeroNumber' = 'VALUE_SHOULD_BE_POSITIVE_OR_ZERO',
}

export default Validators;
