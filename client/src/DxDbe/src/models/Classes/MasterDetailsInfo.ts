/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class MasterDetailsInfo {
	constructor(
		public isChild?: boolean,
		public childTableName?: string,
		public localizedChildTableName?: string,
		public joinedColumnGroups?: { [index: string]: string }[],
	) {}

	public static create(table: MasterDetailsInfo): MasterDetailsInfo {
		return new MasterDetailsInfo(
			table.isChild,
			table.childTableName,
			table.localizedChildTableName,
			table.joinedColumnGroups,
		);
	}

	public serialize() {
		return {
			isChild: this.isChild,
			table_name: this.childTableName,
			localizedChildTableName: this.localizedChildTableName,
			joinedColumnGroups: this.joinedColumnGroups,
		};
	}
}

export default MasterDetailsInfo;
