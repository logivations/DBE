/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { isDefined } from 'devextreme/core/utils/type';

enum MassUpdateOperationType {
	REPLACE = 'replaceWith',
	REPLACE_TO_ZERO = 'replaceToZero',
	ADD = 'add',
	SUBTRACT_BY = 'subtractBy',
	SUBTRACTED_BY = 'subtractedBy',
	MULTIPLY = 'multiply',
	DIVIDE_BY = 'divideBy',
	DIVIDED_BY = 'dividedBy',
	PREFIX_BY = 'prefixBy',
	SUFFIX_BY = 'suffixBy',
	NULL = 'null',
}

type TypeForOperation = string | number | undefined | any;

export const MassUpdateValueStrategy = {
	[MassUpdateOperationType.REPLACE](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return nextValue;
	},
	[MassUpdateOperationType.REPLACE_TO_ZERO]() {
		return 0;
	},
	[MassUpdateOperationType.ADD](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(prevValue) ? prevValue : 0, 10) + parseInt(isDefined(nextValue) ? nextValue : 0, 10);
	},
	[MassUpdateOperationType.SUBTRACT_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(prevValue) ? prevValue : 0, 10) - parseInt(isDefined(nextValue) ? nextValue : 0, 10);
	},
	[MassUpdateOperationType.SUBTRACTED_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(nextValue) ? nextValue : 0, 10) + parseInt(isDefined(prevValue) ? prevValue : 0, 10);
	},
	[MassUpdateOperationType.MULTIPLY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(prevValue) ? prevValue : 0, 10) * parseInt(isDefined(nextValue) ? nextValue : 0, 10);
	},
	[MassUpdateOperationType.DIVIDE_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(prevValue) ? prevValue : 0, 10) / parseInt(isDefined(nextValue) ? nextValue : 0, 10);
	},
	[MassUpdateOperationType.DIVIDED_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return parseInt(isDefined(nextValue) ? nextValue : 0, 10) - parseInt(isDefined(prevValue) ? prevValue : 0, 10);
	},
	[MassUpdateOperationType.PREFIX_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return (isDefined(nextValue) ? nextValue : '').toString() + (isDefined(prevValue) ? prevValue : '').toString();
	},
	[MassUpdateOperationType.SUFFIX_BY](prevValue: TypeForOperation, nextValue: TypeForOperation) {
		return (isDefined(prevValue) ? prevValue : '').toString() + (isDefined(nextValue) ? nextValue : '').toString();
	},
	[MassUpdateOperationType.NULL]() {
		return null;
	},
};

export default MassUpdateOperationType;
