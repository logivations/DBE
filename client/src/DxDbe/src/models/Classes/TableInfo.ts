/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class TableInfo {
	constructor(public ID_table: number, public name: string, public table_name: string) {}

	public static create(table: TableInfo): TableInfo {
		return new TableInfo(table.ID_table, table.name, table.table_name);
	}

	public serialize() {
		return {
			ID_table: this.ID_table,
			name: this.name,
			table_name: this.table_name,
		};
	}
}

export default TableInfo;
