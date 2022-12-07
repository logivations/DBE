/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import communicator from '../../api/Communicator';
import TableDataModel from '../TableDataModel/TableDataModel';
import getCustomStore from '../CustomStore';
import CustomStore from 'devextreme/data/custom_store';
import TableUtils from './TableUtils';
import TFunction from '../../models/Types/Types';
import SelectedRowsDexieDB from '../../helpers/SelectedRowsDexieDB';
import CompareTableDto from '../CompareTableManager/CompareTableDto';
import CompareTableDataModel from '../TableDataModel/CompareTableDataModel';
import ToolbarPanelButtonManager from "../ToolbarPanelManager/ToolbarPanelButtonManager";
import {Metadata} from "../../models/Classes";

class TableInstance extends TableUtils {
	public selectedRowsDexieDB: SelectedRowsDexieDB = null;
	private tableRef: any;
	public toolbarPanelButtonManager: ToolbarPanelButtonManager;

	constructor(
		private tableDataModel: TableDataModel | CompareTableDataModel,
		public customStore: CustomStore,
		public parentTableInfo?: object,
		public close?: TFunction,
		public tableKey?: { [index: string]: string },
	) {
		super(tableDataModel.getMetadata());
		this.selectedRowsDexieDB = new SelectedRowsDexieDB(this.campaignId);
	}

	static async createTableInstance(
		tableName: string,
		parentTableInfo: object,
		close: TFunction,
		tableKey: { [index: string]: string },
	): Promise<TableInstance> {
		const tableDataModel: TableDataModel = await TableInstance.createTableDataModel(tableName);

		const customStore: CustomStore = await TableInstance.createCustomStore(tableDataModel, tableName);
		return new TableInstance(tableDataModel, customStore, parentTableInfo, close, tableKey);
	}

	static async createCompareTableInstance(tableName: string) {
		const compareTableDataModel = await TableInstance.createTableCompareDataModel(tableName);
		const customStore: CustomStore = await TableInstance.createTableCompareCustomStore(
			compareTableDataModel,
			tableName,
		);
		return new TableInstance(compareTableDataModel, customStore);
	}
	private static async createTableDataModel(tableName = null): Promise<TableDataModel> {
		const metadata = await communicator.getDbeTableMetaData(tableName);
		return TableDataModel.create(metadata).createDbeColumns();
	}

	private static async createTableCompareDataModel(tableName: string): Promise<CompareTableDataModel> {
		const compareTableDto = new CompareTableDto();
		const targetWarehouseId = compareTableDto.targetWarehouseId;
		const showChangedColumn = compareTableDto.showChangedColumn;
		const hiddenColumns = compareTableDto.hiddenColumns;
		const metadata = await communicator.getTableCompareMetadata(
			targetWarehouseId,
			showChangedColumn,
			hiddenColumns
		);
		const compareDataModel = CompareTableDataModel.create(metadata);
		compareDataModel.createDbeColumns();
		return compareDataModel;
	}

	private static async createCustomStore(tableDataModel, tableName = null): Promise<CustomStore> {
		const getLoadUrl = (tableName) => {
			return communicator.getLoadUrl(tableName);
		};
		const loadDataTransformer = (data) => {
			tableDataModel.setTemporaryTableData(data.data);
			tableDataModel.setTotalRowCount(data.totalCount);
			tableDataModel.refreshCounter(data);
			return data;
		};
		const combinedPrimaryKey = tableDataModel.getPrimaryKeys();
		return await getCustomStore(tableDataModel, tableName, getLoadUrl, loadDataTransformer, combinedPrimaryKey);
	}

	private static async createTableCompareCustomStore(compareTableDataModel, tableName = null): Promise<CustomStore> {
		const compareTableDto = new CompareTableDto();

		const getLoadUrl = (tableName) => {
			return communicator.getLoadUrlForCompareTable(tableName);
		};
		const loadDataTransformer = (data) => {
			compareTableDataModel.setCompareTableResultTemporaryData(data.data);
			compareTableDataModel.setCompareTableColumns(data.columns);
			return compareTableDataModel.transformData(data);
		};

		const combinedPrimaryKey = compareTableDataModel.getPrimaryKeysForCompareTable();

		return await getCustomStore(
			compareTableDataModel,
			tableName,
			getLoadUrl,
			loadDataTransformer,
			combinedPrimaryKey,
			{
				skippedColumns: compareTableDto.hiddenColumns,
				showChangedColumn: compareTableDto.showChangedColumn,
			},
		);
	}

	public getTableDataModel(): TableDataModel | CompareTableDataModel {
		return this.tableDataModel;
	}

	public getMetadata(): Metadata {
		return this.getTableDataModel().getMetadata();
	}

	public getCustomStore(): CustomStore {
		return this.customStore;
	}

	public getTableKey(): { [index: string]: string } {
		return this.tableKey;
	}

	public setTableRef(tableRef): TableInstance {
		this.tableRef = tableRef;
		return this;
	}

	public setToolbarPanelButtonManager(toolbarPanelButtonManager: ToolbarPanelButtonManager) {
		this.toolbarPanelButtonManager = toolbarPanelButtonManager;
		return this;
	}

	public getTableDxDbeInstance() {
		return this.tableRef?.current.instance;
	}
}

export default TableInstance;
