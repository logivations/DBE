/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import FieldType from '../Enums/FieldType';
import MassUpdateOperationType from '../Enums/MassUpdateOperationType';

class MassUpdateOperation {
	constructor(
		private readonly indexKey: MassUpdateOperationType,
		private readonly fieldType: FieldType,
		private readonly message: string,
		private readonly considerUnit: boolean,
	) {
		this.indexKey = indexKey;
		this.fieldType = fieldType;
		this.message = message;
		this.considerUnit = considerUnit;
	}

	public static create(operation: MassUpdateOperation): MassUpdateOperation {
		return new MassUpdateOperation(
			operation.indexKey,
			operation.fieldType,
			operation.message,
			operation.considerUnit,
		);
	}

	public getIndexKey(): string {
		return this.indexKey;
	}

	public getMessageKey(): string {
		return this.message;
	}

	public getFieldType(): FieldType {
		return this.fieldType;
	}

	public toNullOperation(): boolean {
		return this.getIndexKey() == MassUpdateOperationType.NULL;
	}

	public toZeroOperation(): boolean {
		return this.getIndexKey() == MassUpdateOperationType.REPLACE_TO_ZERO;
	}

	public toNullOrZeroOperation(): boolean {
		return (
			this.getIndexKey() == MassUpdateOperationType.NULL ||
			this.getIndexKey() == MassUpdateOperationType.REPLACE_TO_ZERO
		);
	}

	public isDevideBy(): boolean {
		return this.getIndexKey() == MassUpdateOperationType.DIVIDE_BY;
	}

	public isConsiderUnit(): boolean {
		return this.considerUnit;
	}
}

export default MassUpdateOperation;
