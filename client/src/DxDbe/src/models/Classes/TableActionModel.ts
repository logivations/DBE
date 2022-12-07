/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import {SelectedRowsNeeded, SystemParameter, TableActionOutputType} from '../Enums';
import {ITableActionModel} from '../Interfaces';
import translate from '../../i18n/localization';
import communicator from '../../api/Communicator';
import {InputParameterModel} from './index';
import TFunction from '../Types/Types';
import NotificationController from "../../services/Notification/NotificationController";
import {Severity} from "../Enums/Notification";

class TableActionModel implements ITableActionModel {
	private inputParametersModels: InputParameterModel[] = [];
	public notificationController: NotificationController;

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

	public checkBeforeExecuteAction(selectedRows, executeAction: TFunction = () => {}) {
		if (this.checkSelectedRowsCount(selectedRows) && this.checkForSelectedRows(selectedRows)) {
			executeAction();
		}
	}

	public async getTableActionParameters(tableInstance): Promise<InputParameterModel[]> {
		if (this.inputParametersModels && this.inputParametersModels.length) {
			return this.inputParametersModels;
		}
		return communicator.getTableActionParameterModels(this.tableId, this.actionId).then((res) => {
			const inputParametersModels = InputParameterModel.createInputParametersModels(res, tableInstance.getMetadata());
			return Promise.all(inputParametersModels.map((paramModel) => paramModel.setForeignKeyData())).then(
				(paramsModels) => {
					this.inputParametersModels = paramsModels;
					return paramsModels;
				},
			);
		});
	}

	private checkSelectedRowsCount(selectedRows) {
		if (this.countOfSelectedRows && selectedRows.length !== this.countOfSelectedRows) {
			this.notificationController.createNotification(translate('_THERE_ARE_SHOULD_BE_$_SELECTED_ROWS', this.countOfSelectedRows), Severity.WARNING);
			return false;
		} else {
			return true;
		}
	}

	private checkForSelectedRows(selectedRows) {
		if (this.selectedRowsNeeded === SelectedRowsNeeded.SELECTED_ROWS_NEEDED) {
			if (selectedRows.length) {
				return true;
			} else {
				this.notificationController.createNotification(translate('THERE_ARE_NO_SELECTED_ROWS'), Severity.WARNING)
				return false;
			}
		} else {
			return true;
		}
	}
}

export default TableActionModel;
