/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { SelectedRowsNeeded, SystemParameter, TableActionOutputType } from '../Enums';
import { ITableActionModel } from '../Interfaces';
import translate from '../../i18n/localization';
import communicator from '../../api/Communicator';
import { InputParameterModel } from './index';
import TFunction from '../Types/Types';
import NotificationController from '../../services/Notification/NotificationController';
import { Severity } from '../Enums/Notification';
import downloadFile from '../../utils/fileDownload';
import { isDefined } from '../../utils/utils';

class TableActionModel implements ITableActionModel {
	public notificationController: NotificationController;
	private inputParametersModels: InputParameterModel[] = [];

	constructor(
		public skipUpToDateCheck: boolean,
		public actionId: number,
		public sourceTableName: string,
		public procedureName: string,
		public selectedRowsNeeded: SelectedRowsNeeded,
		public countOfSelectedRows: number,
		public preScript: string,
		public postScript: string,
		public confirmationRequired: boolean,
		public headerPinned: boolean,
		public relatedActionModel: ITableActionModel,
		public relatedActionModelId: number,
		public systemParameters: SystemParameter[],
		public tableId: number,
		public tableName: string,
		public header: string,
		public link: string,
		public outputType: TableActionOutputType,
	) {
		this.notificationController = new NotificationController();
	}

	public static create(model) {
		return new TableActionModel(
			model.skipUpToDateCheck,
			model.actionId,
			model.sourceTableName,
			model.procedureName,
			model.selectedRowsNeeded,
			model.countOfSelectedRows,
			model.preScript,
			model.postScript,
			model.confirmationRequired,
			model.headerPinned,
			model.relatedActionModel,
			model.relatedActionModelId,
			model.systemParameters,
			model.tableId,
			model.tableName,
			model.header,
			model.link,
			model.outputType,
		);
	}

	public hasPreScript() {
		return !!this.preScript;
	}

	public checkBeforeExecuteAction(selectedRows, tableName: string, executeAction: TFunction) {
		this.checkForSelectedRows(selectedRows, tableName).then((res) => {
			res && executeAction();
		});
	}

	public runTableActionByOutputType(params, tableName): Promise<any> {
		switch (this.outputType) {
			case TableActionOutputType.NO_OUTPUT_EXPECTED: {
				return communicator.executeTableAction(this.actionId, params, tableName);
			}
			case TableActionOutputType.BINARY_CONTENT: {
				return communicator
					.executeTableRelatedAction(this.actionId, params, tableName)
					.then((response) => response && response.blob())
					.then((blob) => {
						downloadFile(blob);
					});
			}
			case TableActionOutputType.MIXED_CONTENT: {
				return Promise.reject(
					new Error('If you found this error, please report a BUG with steps to reproduce. Thanks!'),
				);
			}
		}
	}

	public async getTableActionParameters(tableInstance): Promise<InputParameterModel[]> {
		if (this.inputParametersModels && this.inputParametersModels.length) {
			return this.inputParametersModels;
		}
		return communicator.getTableActionParameterModels(this.tableId, this.actionId).then((res) => {
			const inputParametersModels = InputParameterModel.createInputParametersModels(res, () =>
				tableInstance.getMetadata(),
			);
			this.inputParametersModels = inputParametersModels;
			return Promise.resolve(inputParametersModels);
		});
	}

	private checkSelectedRowsCount(rowsCount) {
		if (isDefined(this.countOfSelectedRows) && rowsCount !== this.countOfSelectedRows) {
			this.notificationController.createNotification({
				message: translate('_THERE_ARE_SHOULD_BE_$_SELECTED_ROWS', this.countOfSelectedRows),
				type: Severity.WARNING,
			});
			return false;
		} else {
			return true;
		}
	}

	private checkForSelectedRows(selectedRows, tableName) {
		if (this.selectedRowsNeeded === SelectedRowsNeeded.SELECTED_ROWS_NEEDED) {
			if (selectedRows.length) {
				return Promise.resolve(true);
			} else {
				this.notificationController.createNotification({
					message: translate('THERE_ARE_NO_SELECTED_ROWS'),
					type: Severity.WARNING,
				});
				return Promise.resolve(false);
			}
		} else if (this.selectedRowsNeeded === SelectedRowsNeeded.SELECTED_ACTION_COLUMN_NEEDED) {
			return communicator.countSelectedRowsForTableAction(tableName).then((count) => {
				if (count === 0) {
					this.notificationController.createNotification({
						message: translate('THERE_ARE_NO_SELECTED_ROWS'),
						type: Severity.WARNING,
					});
					return false;
				}
				return this.checkSelectedRowsCount(count);
			});
		} else {
			return Promise.resolve(true);
		}
	}
}

export default TableActionModel;
