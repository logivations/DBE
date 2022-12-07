/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { TableSuffix } from '../Enums';
import { SortingData } from './index';
import {WarehouseUiType} from "../Enums/Table";

class DbeTable {
	constructor(
		public tableId: number,
		public tableName: string,
		public tableSuffix: TableSuffix,
		public tableGroupId: number,
		public name: string,
		public namePinned: boolean,
		public checkViewOutdated: boolean,
		public visible: boolean,
		public editable: boolean,
		public deletable: boolean,
		public addable: boolean,
		public mergeable: boolean,
		public sortingData: SortingData[],
		public spName: string,
		public spLink: string,
		public idStrategy: string[],
		public systemParameters: string,
		public parsedUniqueFields: string[],
		public selectionColumn: string,
		public link: string,
		public concurrent: boolean,
		public defaultSrs: number,
		public logsEnabled: boolean,
		public layoutType: number,
		public viewRowsByUserId: boolean,
		public highlightCellsProc: string,
		public updateOnOpen: boolean,
		public hidden: boolean,
		public maxPageSize: number,
		public tableGroupRoot: string,
		public index: number,
	) {}

	public static create(dbeTable: DbeTable) {
		return new DbeTable(
			dbeTable.tableId,
			dbeTable.tableName,
			dbeTable.tableSuffix,
			dbeTable.tableGroupId,
			dbeTable.name,
			dbeTable.namePinned,
			dbeTable.checkViewOutdated,
			dbeTable.visible,
			dbeTable.editable,
			dbeTable.deletable,
			dbeTable.addable,
			dbeTable.mergeable,
			dbeTable.sortingData,
			dbeTable.spName,
			dbeTable.spLink,
			dbeTable.idStrategy,
			dbeTable.systemParameters,
			dbeTable.parsedUniqueFields,
			dbeTable.selectionColumn,
			dbeTable.link,
			dbeTable.concurrent,
			dbeTable.defaultSrs,
			dbeTable.logsEnabled,
			dbeTable.layoutType,
			dbeTable.viewRowsByUserId,
			dbeTable.highlightCellsProc,
			dbeTable.updateOnOpen,
			dbeTable.hidden,
			dbeTable.maxPageSize,
			dbeTable.tableGroupRoot,
			dbeTable.index,
		);
	}

	public getName(): string {
		return this.name;
	}

	public getTableId(): number {
		return this.tableId;
	}

	public getTableName(): string {
		return this.tableName;
	}

	public isNamePinned(): boolean {
		return this.namePinned;
	}

	public getTableSuffix(): TableSuffix {
		return this.tableSuffix;
	}

	public getParsedUniqueFields(): string[] {
		return this.parsedUniqueFields;
	}

	public isDeletable(): boolean {
		return this.deletable;
	}

	public isAddable(): boolean {
		return this.addable;
	}

	public isEditable(): boolean {
		return this.editable;
	}

	public isMergeable(): boolean {
		return this.mergeable;
	}

	public getSpName(): string {
		return this.spName;
	}

	public getHelpLink(): string {
		return this.link;
	}

	public getSpLink(): string {
		return this.spLink;
	}

	public getMaxPageSize(): number {
		return this.maxPageSize;
	}

	public getLayoutType() {
		return WarehouseUiType[this.layoutType];
	}
}

export default DbeTable;
