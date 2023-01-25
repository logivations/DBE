/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import TableInstance from './TableInstance';
import ToolbarPanelButtonManager from '../ToolbarPanelManager/ToolbarPanelButtonManager';
import TFunction from '../../models/Types/Types';
import { FilterGroup, FilterItem, ForeignKeyInfo } from '../../models/Classes';

class TableInstanceManager {
	static ORIGINAL_TABLE = 'original_table';
	static FOREIGN_KEY_TABLE = 'foreign_key_table';
	static CLONE_ROW_IN_ORIGINAL_TABLE = 'clone_row_original_table';
	static SCREEN_BUILDER_TABLE = 'screen_builder_table';
	static COMPARE_TABLE_RESULT = 'compare_table_result';

	static instance: TableInstanceManager = null;
	public tableInstanceStorage: Map<string, TableInstance> = new Map();
	public toolbarBarRefs: Map<string, any> = new Map();
	public joinedColumnGroupsByTable: Map<string, { [key: string]: string }[]> = new Map();
	public buttonManager: ToolbarPanelButtonManager = null;

	constructor() {
		if (!TableInstanceManager.instance) {
			TableInstanceManager.instance = this;
		}
		return TableInstanceManager.instance;
	}

	static get zeroOptions() {
		return {
			tableKey: {},
			foreignKeyInfo: {},
			screenBuilderJoinedColumnGroups: [],
			childParentTableJoinedColumnGroups: [],
			close: () => true,
		};
	}

	public refreshCounter: TFunction = () => true;

	public async createInstance(tableName = null, options = {}): Promise<TableInstance> {
		const { foreignKeyInfo, tableKey, close, childParentTableJoinedColumnGroups } = Object.assign(
			TableInstanceManager.zeroOptions,
			options,
		);
		childParentTableJoinedColumnGroups?.length &&
			this.joinedColumnGroupsByTable.set(
				tableName || TableInstanceManager.ORIGINAL_TABLE,
				childParentTableJoinedColumnGroups,
			);
		return TableInstance.createTableInstance(tableName, foreignKeyInfo as ForeignKeyInfo, close, tableKey).then(
			(tableInstance) => {
				if (!this.tableInstanceStorage.has(tableName)) {
					this.tableInstanceStorage.set(tableName || TableInstanceManager.ORIGINAL_TABLE, tableInstance);
				}
				return tableInstance;
			},
		);
	}

	public createCompareTableInstance(tableName = null): Promise<TableInstance> {
		return TableInstance.createCompareTableInstance(tableName).then((tableInstance) => {
			if (!this.tableInstanceStorage.has(tableName)) {
				this.tableInstanceStorage.set(tableName || TableInstanceManager.ORIGINAL_TABLE, tableInstance);
			}
			return tableInstance;
		});
	}

	public deleteTableInstance(tableName): void {
		this.tableInstanceStorage.has(tableName) && this.tableInstanceStorage.delete(tableName);
	}

	public getTableInstance(tableName): TableInstance | null {
		return this.tableInstanceStorage.get(tableName) || null;
	}

	public setToolbarInstance(tableName, toolbarBarRef) {
		this.toolbarBarRefs.set(tableName, toolbarBarRef);
		return this;
	}

	public setRefreshCounter(refreshCounter) {
		this.refreshCounter = refreshCounter;
		return this;
	}

	public initializeEventForOriginalTable(originalGridInstance) {
		const originalTableInstance = this.getTableInstance(TableInstanceManager.ORIGINAL_TABLE);

		originalGridInstance?.on('selectionChanged', ({ selectedRowsData }) => {
			[...this.tableInstanceStorage.entries()].forEach(([tableName, instance]) => {
				const selectedRows = originalTableInstance.tableRelatedUserParameters.lastSelectionMode
					? [selectedRowsData[selectedRowsData.length - 1]]
					: selectedRowsData;
				if (tableName !== TableInstanceManager.ORIGINAL_TABLE) {
					const uniqFieldsRelation: { [key: string]: string }[] =
						this.joinedColumnGroupsByTable.get(tableName);
					const selectionFilter = selectedRows.reduce((filter: FilterGroup, row) => {
						const filterGroup = new FilterGroup();
						uniqFieldsRelation.forEach((data) => {
							Object.entries(data).forEach(([keyForOriginalTable, keyForCurrentTable]) => {
								filterGroup.addFilterCriteria(
									new FilterItem(keyForCurrentTable, '=', row[keyForOriginalTable]),
								);
							});
						});
						filter.addFilterGroup(filterGroup);
						return filter;
					}, new FilterGroup());

					const dxDbeInstance = instance?.getTableDxDbeInstance();
					dxDbeInstance?.filter(selectionFilter);
				}
			});
		});
	}

	public repaintToolbars() {
		return Promise.all(
			[...this.toolbarBarRefs.values()].map(async (ref) => {
				if (ref.current) {
					return await ref.current.instance.repaint();
				}
			}),
		);
	}

	public setButtonManager(buttonManager: ToolbarPanelButtonManager) {
		this.buttonManager = buttonManager;
		return this;
	}
}

export default TableInstanceManager;
