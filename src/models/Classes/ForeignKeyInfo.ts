/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class ForeignKeyInfo {
	public cellData: { [key: string]: any } = {};
	public columnName?: string;

	constructor(
		public parentTable?: string,
		public decoratedParentTable?: string,
		public joinedKeyColumnNames?: { [index: string]: string },
		public parentKeyColumnText?: string,
		public parentTableVisible?: boolean,
		public combineTextAndId?: boolean,
		public zeroAsAny?: boolean,
		public isParentTableHasWhId?: boolean,
		columnName?: string,
	) {
		this.columnName = columnName;
	}

	public static zeroForeignKeyInfo() {
		return new ForeignKeyInfo('', '', {}, '', false, false, false, false);
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
			foreignKeyInfo.isParentTableHasWhId,
			colName,
		);
	}

	public serialize() {
		return {
			parentTable: this.parentTable,
			decoratedParentTable: this.decoratedParentTable,
			joinedKeyColumnNames: this.joinedKeyColumnNames,
			parentKeyColumnText: this.parentKeyColumnText,
			parentTableVisible: this.parentTableVisible,
			combineTextAndId: this.combineTextAndId,
			zeroAsAny: this.zeroAsAny,
			isParentTableHasWhId: this.isParentTableHasWhId,
		};
	}

	public getForeignCellData(columnData, extraData?, operation?): object {
		const serialize = this.serialize;
		return Object.assign(
			{
				serialize() {
					return serialize.apply(this);
				},
			},
			{
				key: this.parentKeyColumnText,
				parentTable: this.parentTable,
				cellData: columnData,
				extraData,
				operation,
				columnName: this.columnName,
				parentTableColumnName: this.joinedKeyColumnNames[this.columnName],
			},
			{ ...this.serialize() },
		);
	}

	public getJoinedColumnNames(): { [key: string]: string } {
		return this.joinedKeyColumnNames;
	}

	public get parentTableColumnName() {
		return this.joinedKeyColumnNames[this.columnName];
	}
}

export default ForeignKeyInfo;
