/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2023
 ******************************************************************************/
import TableInstance from '../TableInstanceManager/TableInstance';
import { ForeignKeyInfo } from '../../models/Classes';
import TableDataModel from '../TableDataModel/TableDataModel';
import CompareTableDataModel from '../TableDataModel/CompareTableDataModel';
import translate from '../../i18n/localization';
import Validators from '../../models/Enums/Validators';
import { Severity } from '../../models/Enums/Notification';
import NotificationController from '../Notification/NotificationController';
import AbstractColumnModel from '../../models/Classes/AbstractColumnModel';
import { isDefined } from '../../utils/utils';
import ForeignButtonProxy from './ForeignButtonProxy';

class ForeignButtonUpdater {
	private selectedRow: Map<string, string | number | boolean | null> = new Map();
	public notificationController: NotificationController;
	public foreignProxy: ForeignButtonProxy;
	constructor(
		selectedRows,
		private tableInstance: TableInstance,
		private originalTableDataModel: TableDataModel | CompareTableDataModel,
		private gridInstance: any,
	) {
		this.setSelectedRow(selectedRows);
		this.notificationController = new NotificationController();
		this.foreignProxy = new ForeignButtonProxy();
		this.foreignButtonFilterBuilderUpdate = this.foreignButtonFilterBuilderUpdate.bind(this);
		this.foreignButtonFormUpdate = this.foreignButtonFormUpdate.bind(this);
		this.foreignButtonCellUpdate = this.foreignButtonCellUpdate.bind(this);
	}

	public async update() {
		try {
			await [
				this.foreignButtonFilterBuilderUpdate,
				this.foreignButtonFormUpdate,
				this.foreignButtonCellUpdate,
			].reduce(async (promise, nextPromise) => {
				return promise.then((runNext) => (runNext ? nextPromise() : Promise.resolve(false)));
			}, Promise.resolve(true));
		} catch (e) {
			throw new Error(`Foreign cell update error`);
		}
	}

	public async foreignButtonFilterBuilderUpdate(): Promise<boolean> {
		const editorOption = this.editorOptions;
		if (editorOption && Object.hasOwn(editorOption, 'setValueToBuilder')) {
			this.closeParentTable();
			const { setValueToBuilder } = editorOption;

			if (this.selectedRow.size !== 0) {
				const parentTableColumnName = this.foreignKeyInfo.parentTableColumnName;
				const value = this.selectedRow.get(parentTableColumnName);
				const text = this.selectedRow.get(this.foreignKeyInfo.parentKeyColumnText);
				setValueToBuilder({ foreignButtonId: value, foreignButtonText: text });
			} else {
				setValueToBuilder(null);
			}
			this.foreignProxy.clearCache(editorOption.columnName);
			await this.repaintComponent();

			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	}

	public async foreignButtonFormUpdate(): Promise<boolean> {
		const editorOptions = this.editorOptions;
		const dataFromCellData = this.dataFromCellData;
		if (editorOptions && dataFromCellData && Object.hasOwn(dataFromCellData, 'dataField')) {
			if (this.selectedRow.size === 0) {
				Object.values(this.foreignKeyInfo.joinedKeyColumnNames).forEach((columnName) => {
					this.selectedRow.set(columnName, null);
				});
			}

			const parentColumnName = this.foreignKeyInfo.joinedKeyColumnNames[this.dataFromCellData.dataField];
			editorOptions.setParameters(
				Object.fromEntries(this.selectedRow.entries()),
				dataFromCellData.dataField,
				this.selectedRow.size !== 0 ? this.selectedRow.get(parentColumnName) : null,
			);
			this.closeParentTable();
			this.foreignProxy.clearCache(dataFromCellData.dataField);
			await this.repaintComponent();
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	}

	public async foreignButtonCellUpdate(): Promise<boolean> {
		const dataField = this.cellData.column.dataField;
		const column = this.originalTableDataModel.getColumnByName(dataField);
		const parentColumnName = this.foreignKeyInfo.joinedKeyColumnNames[dataField];
		const data = this.dataFromCellData;
		const rowIndex = this.cellData.rowIndex;
		const validator = column.getValidatorName();

		const newValue = this.selectedRow.size !== 0 ? this.selectedRow.get(parentColumnName) : null;

		const cellToUpdate = Object.entries(this.foreignKeyInfo.joinedKeyColumnNames).reduce(
			(cells, [childColumn, parentColumn]) => {
				const value =
					this.selectedRow.size !== 0 && this.selectedRow.has(parentColumn)
						? this.selectedRow.get(parentColumn)
						: this.getDefaultValue(childColumn);
				this.resolveForeignKeys(value, cells, childColumn);
				return cells;
			},
			{ [dataField]: newValue },
		);

		column.getValidatorForAsyncRule(newValue, { ...data, ...cellToUpdate }).then(async (isValid) => {
			if (isValid) {
				const component = this.component;
				if (component) {
					Object.entries(cellToUpdate).forEach(([dataField, value]) => {
						component.cellValue(rowIndex, dataField, value || 0);
					});
					await component.saveEditData();
				}
				this.foreignProxy.clearCache(dataField);
				this.gridInstance.refresh(true);
				this.closeParentTable();
			} else {
				this.notificationController.createNotification({
					message: translate(Validators[validator]),
					type: Severity.ERROR,
				});
			}
		});
		return Promise.resolve(false);
	}

	private getDefaultValue(columnName) {
		const childColumnModel: AbstractColumnModel = this.originalTableDataModel.getColumnByName(columnName);
		if (childColumnModel) {
			const defaultValue = childColumnModel.getViewModel().getDefaultValue();
			return !isDefined(defaultValue) ? null : defaultValue.toString();
		}
		return null;
	}

	private resolveForeignKeys(value, cells, childColumn) {
		if (value == null) {
			this.originalTableDataModel.getColumns().forEach((columnModel) => {
				if (columnModel.getForeignKeyInfo() !== null) {
					Object.keys(columnModel.getForeignKeyInfo().getJoinedColumnNames()).forEach((key: string) => {
						if (key.equalsIgnoreCase(childColumn) && !childColumn.equalsIgnoreCase(columnModel.getName())) {
							Object.assign(cells, { [columnModel.getName()]: null });
						}
					});
				}
			});
		}
	}

	public closeParentTable() {
		this.tableInstance.close();
	}

	public async repaintComponent(): Promise<void> {
		const component = this.component;
		component && (await component.repaint());
	}

	private get component() {
		if (Object.hasOwn(this.cellData, 'data')) {
			if (Object.hasOwn(this.cellData.data, 'component')) {
				return this.cellData.data.component;
			}
		}
		if (Object.hasOwn(this.cellData, 'component')) {
			return this.cellData.component;
		}
		return null;
	}

	private get foreignKeyInfo(): ForeignKeyInfo {
		return this.tableInstance.foreignKeyInfo;
	}
	private get cellData() {
		return this.foreignKeyInfo.cellData;
	}
	private get dataFromCellData() {
		return Object.hasOwn(this.cellData, 'data') ? this.cellData.data : null;
	}
	private get editorOptions() {
		if (Object.hasOwn(this.dataFromCellData, 'editorOptions')) {
			return this.dataFromCellData.editorOptions;
		}
		return null;
	}

	private setSelectedRow(selectedRows: never[]) {
		const selectedRowObj = selectedRows[0];
		if (selectedRowObj) {
			this.selectedRow = new Map(Object.entries(selectedRowObj));
		}
	}
}

export default ForeignButtonUpdater;
