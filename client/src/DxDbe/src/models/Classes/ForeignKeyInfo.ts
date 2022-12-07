import MassUpdateOperation from "./MassUpdateOperation";

/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class ForeignKeyInfo {
	public foreignKeyData: { [key: string]: any }[] = [];

	constructor(
		public parentTable?: string,
		public decoratedParentTable?: string,
		public joinedKeyColumnNames?: { [index: string]: string },
		public parentKeyColumnText?: string,
		public parentTableVisible?: boolean,
		public combineTextAndId?: boolean,
		public zeroAsAny?: boolean,
		public columnName?: string,
	) {}

	public static zeroForeignKeyInfo() {
		return new ForeignKeyInfo('', '', {}, '', false, false, false);
	}

	public static create(
		foreignKeyInfo: ForeignKeyInfo = ForeignKeyInfo.zeroForeignKeyInfo(),
		colName,
	): ForeignKeyInfo {
		return new ForeignKeyInfo(
			foreignKeyInfo.parentTable,
			foreignKeyInfo.decoratedParentTable,
			foreignKeyInfo.joinedKeyColumnNames,
			foreignKeyInfo.parentKeyColumnText,
			foreignKeyInfo.parentTableVisible,
			foreignKeyInfo.combineTextAndId,
			foreignKeyInfo.zeroAsAny,
			colName,
		);
	}

	public static getCellText(columnData, foreignKeyData, joinedKeyColumnNames, parentKeyColumnText, columnName, operation: MassUpdateOperation) {
		const resultData: { [key: string]: any } = foreignKeyData.find((keyData) => {
			return Object.entries(joinedKeyColumnNames).every(([key1, key2]: [string, string]) => {
				return keyData.getPropIgnoreCase(key2) === columnData.data.getPropIgnoreCase(key1);
			});
		});

		if (resultData && Object.hasOwn(resultData, parentKeyColumnText)) {
            return {
                cellText: resultData[parentKeyColumnText],
                cellValue: resultData[joinedKeyColumnNames[columnName].toLocaleLowerCase()],
            };
        } else if (operation && operation.toNullOrZeroOperation()) {
			return {cellText: operation.toZeroOperation() ? 'ANY': 'NULL', cellValue: 0};
		} else {
            return {cellText: '\u2014', cellValue: null};
		}
	}

	public async setForeignKeyData(foreignKeyData: any): Promise<ForeignKeyInfo> {
		this.foreignKeyData = foreignKeyData[this.columnName];
		return this;
	}

	public getTextByForeignKeyId(id: number): string {
		const fieldName = this.joinedKeyColumnNames[this.columnName].toLocaleLowerCase();
		const value = this.foreignKeyData.find((foreignData) => foreignData.getPropIgnoreCase(fieldName) === id);
		return value ? value.getPropIgnoreCase(this.parentKeyColumnText) : '';
	}

	public getForeignCellData(columnData, extraData?, extraForeignKeyData?, operation?): object {
		const defaultInfo = Object.assign(
			{},
			{
				data: this.foreignKeyData,
				key: this.parentKeyColumnText,
				parentTable: this.parentTable,
				cellData: columnData,
			},
			this,
		);
		if (!Object.hasOwn(columnData, 'data')) {
			return defaultInfo;
		} else if (extraData && extraForeignKeyData) {
			const { cellText, cellValue } = ForeignKeyInfo.getCellText(
                {data: extraData},
                extraForeignKeyData || [],
                this.joinedKeyColumnNames,
                this.parentKeyColumnText,
                this.columnName,
				operation
            );
			return { ...defaultInfo, cellText, value: cellValue };
		} else {
			const { cellText } = ForeignKeyInfo.getCellText(
                columnData,
                this.foreignKeyData || [],
                this.joinedKeyColumnNames,
                this.parentKeyColumnText,
                this.columnName,
				operation
            );
			return { ...defaultInfo, cellText, value: columnData.value };
		}
	}
}

export default ForeignKeyInfo;
