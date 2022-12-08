/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {EndPoints, StoreSettingKey} from '../constants/SettingsConstants';
import {FilterGroup} from '../models/Classes';
import BaseCommunicator, {QueryParam} from './BaseCommunicator';
import metadata from "../models/Classes/Metadata";

class Communicator extends BaseCommunicator {
	private static communicatorInstance: Communicator;
	private pingIsRunning = false;

	constructor() {
		super();
		if (!Communicator.communicatorInstance) {
			Communicator.communicatorInstance = this;
			this.runServerPing();
		}
		return Communicator.communicatorInstance;
	}
	public getDbeTableMetaData(tableName = null): Promise<any> {
		const queryParams = this.createQueryString({ tableName });
		const options = { method: 'POST' };
		window['URLFilter'] && Object.assign(options, { body: window['URLFilter'] });
		return this.fetchData(`${this.basePath}/getDbeTableMetaData`, queryParams, options);
	}

	public getTableCompareMetadata(targetWarehouseId, showChangedColumn, hiddenColumns): Promise<any> {
		const queryParams = this.createQueryString({
			sourceWarehouseId: this.warehouseId,
			targetWarehouseId,
			showChangedColumn
		});
		return this.fetchData(`${this.basePath}/getTableCompareMetadata`, queryParams, {
			method: 'POST',
			body: JSON.stringify(hiddenColumns),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public getUpdatableColumnModels(tableName = null): Promise<any> {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/getUpdatableColumnModels`, queryParams);
	}

	public getMassUpdateOperations(tableName = null): Promise<any> {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/getMassUpdateOperations`, queryParams);
	}

	public getRowsQuantity(tableName = null, filter: FilterGroup = new FilterGroup()): Promise<number> {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/getRowsQuantity`, queryParams, {
			method: 'POST',
			body: JSON.stringify(filter),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public getMassiveDataUpdateRanges(isSelected, allAppliedFilters, tableName): Promise<any> {
		const queryParams = this.createQueryString({ isSelected, tableName});
		return this.fetchData(`${this.basePath}/getMassiveDataUpdateRanges`, queryParams, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(allAppliedFilters),
		});
	}

	public updateDxDbeTableSettings(tableId: QueryParam, settings) {
		const queryParams = this.createQueryString({ tableId });
		return this.fetchData(`${this.basePath}/updateDxDbeTableSettings`, queryParams, {
			method: 'POST',
			body: JSON.stringify(settings),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public deleteDxDbeUserParams(tableId: QueryParam = this.tableId, settingKey: StoreSettingKey, objectId: number, tableName: string) {
		const queryParams = this.createQueryString({ settingKey, objectId, tableName });
		return this.fetchData(`${this.basePath}/deleteDxDbeUserParams`, queryParams, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public storeDxDbeUserParams(
		tableId: QueryParam = this.tableId,
		endPoint: EndPoints,
		setting,
		tableName,
		settingKey?: StoreSettingKey,
	) {
		const queryParams = this.createQueryString({
			settingKey,
			warehouseId: this.warehouseId,
			tableId,
			tableName
		});
		return this.fetchData(`${this.basePath}/${endPoint}`, queryParams, {
			method: 'POST',
			body: JSON.stringify(setting),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public shareUnshareDxDbeSetting(
		tableId: QueryParam = this.tableId,
		settingKey: StoreSettingKey,
		objectId: number,
		isShare: boolean,
		tableName: string
	) {
		const queryParams = this.createQueryString({ tableId, settingKey, objectId, isShare, tableName });
		return this.fetchData(`${this.basePath}/shareUnshareDxDbeSetting`, queryParams);
	}

	public getTableActionParameterModels(tableId: QueryParam = this.tableId, actionId: number) {
		const queryParams = this.createQueryString({ tableId, actionId });
		return this.fetchData(`${this.basePath}/getTableActionParameterModels`, queryParams);
	}

	public deleteTableRows(tableName: string, params) {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/deleteTableRows`, queryParams, {
			method: 'DELETE',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public addNewRows(tableName: string, params) {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/addNewRows`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public executeTableAction(actionId, params, tableName) {
		const queryParams = this.createQueryString({ actionId, tableName });
		return this.fetchData(`${this.basePath}/executeTableAction`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public massiveDataUpdate(params, tableName = null) {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/massiveDataUpdate`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public mergeRows(params, tableName = null) {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/mergeRows`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public executeTableRelatedAction(tableId: QueryParam = this.tableId, actionId: number) {
		const queryParams = this.createQueryString({ tableId, actionId });
		return this.fetchData(`${this.basePath}/executeTableRelatedAction`, queryParams);
	}

	public getUserLogin() {
		// return this.fetchData(`${this.baseWhappPath}/workday/getUserLogin?`);
		return Promise.resolve('Admin');
	}

	public retrieveUserSettings(metaDataItemKey, tableName) {
		const queryParams = this.createQueryString({ metaDataItemKey, tableName });
		return this.fetchData(`${this.baseWhappPath}/config/retrieveUserSettings`, queryParams);
	}

	public storeUserSettings(metaDataItemKey, optionsJson, tableName) {
		const queryParams = this.createQueryString({ metaDataItemKey, optionsJson, tableName });
		return this.fetchData(`${this.baseWhappPath}/config/storeUserSettings`, queryParams, { method: 'POST' });
	}

	public importTableData(parameters, tableName) {
		const queryParams = this.createQueryString({tableName});
		return this.fetchData(`${this.baseWhappPath}/longTerm/importDxTable`, queryParams, {
			method: 'POST',
			body: parameters,
		}).then((longTermId) => this.startLongTerm(longTermId));
	}

	public exportTableData(parameters, tableName) {
		const queryParams = this.createQueryString({tableName});
		return this.fetchBlobData(`${this.basePath}/exportTable`, queryParams, {
			method: 'POST',
			body: parameters,
		});
	}

	public getForeignKeyInfo(tableName?: string, columnName?: string) {
		const queryParams = this.createQueryString({ tableName, columnName });
		return this.fetchData(`${this.basePath}/getForeignKeyInfo`, queryParams, {
			method: 'GET',
		});
	}

	public getTableData(tableName: string, params) {
		const queryParams = this.createQueryString({ tableName });
		return this.fetchData(`${this.basePath}/getTableData?${queryParams}`, null, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public cancelLongTermAction(longTermOperationId) {
		const queryParams = this.createQueryString({ longTermOperationId });
		return this.fetchData(`${this.baseWhappPath}/longTerm/cancelLongTermAction`, queryParams, { method: 'POST' });
	}

	public getSplitScreenSettings() {
		const queryParams = this.createQueryString();
		return this.fetchData(`${this.basePath}/getSplitScreenSettings`, queryParams, {
			method: 'GET',
		});
	}

	public validateValueByCustomValidator(columnName, params, tableName) {
		const queryParams = this.createQueryString({ columnName });
		return this.fetchData(`${this.basePath}/validateValueByCustomValidator`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public compareTables(params, tableName) {
		const queryParams = this.createQueryString({tableName});
		return this.fetchData(`${this.basePath}/dxCompareTables`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public getAllCampaigns() {
		return this.fetchData(`${this.contextPath}/api/layouts/${this.warehouseId}/campaigns`, null, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public recalculateReportData(tableName, params?) {
		const queryParams = this.createQueryString({tableName});
		return this.fetchData(`${this.basePath}/recalculateReportData`, queryParams, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public inputParameterValidation(paramName, value, actionId = null, tableName) {
		const queryParams = this.createQueryString({ actionId: actionId, tableName });
		return this.fetchData(`${this.basePath}/inputParameterValidation`, queryParams, {
			method: 'POST',
			body: JSON.stringify({ inputParameterName: paramName, inputValue: value }),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	public runServerPing() {
		if (!this.pingIsRunning) {
			setInterval(async () => {
				await this.fetchData('/anonymous/ping');
			}, 45000);
			this.pingIsRunning = true;
		}
	}
}

const communicator = new Communicator();
Object.freeze(communicator);

export default communicator;
