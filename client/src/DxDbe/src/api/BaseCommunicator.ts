/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2019
 ******************************************************************************/

import queryString from 'query-string';
import LongTermCommunicator from './LongTermCommunicator';
import authJwtApi from './AuthJwtApi';
import {generateQueryParams} from '../utils/urlUtils';
import NotificationController from "../services/Notification/NotificationController";
import {Severity} from "../models/Enums/Notification";

export type QueryParam = string[] | string | number | null | undefined;

const location = window['location'];
const contextPath = window['CONTEXT_PATH'];

class BaseCommunicator extends LongTermCommunicator {
	static instance: BaseCommunicator;
	protected readonly warehouseId: QueryParam;
	protected readonly campaignId: QueryParam;
	protected readonly tableId: QueryParam;
	protected readonly filter: QueryParam;
	protected readonly notificationController: NotificationController;


	constructor() {
		super(contextPath);
		if (!BaseCommunicator.instance) {
			const queryParams = queryString.parse(location.search);

			this.warehouseId = queryParams.warehouseId;
			this.campaignId = queryParams.campaignId;
			this.tableId = queryParams.tableId;
			this.filter = queryParams.filter;
			this.notificationController = new NotificationController();

			BaseCommunicator.instance = this;
		}
		return BaseCommunicator.instance;
	}

	public get baseWhappPath(): string {
		return `${this.contextPath}`;
	}

	protected get basePath(): string {
		return `${this.contextPath}/dxDbe`;
	}

	public static async safeParseJson(res) {
		try {
			return await res.json();
		} catch (e) {}
	}

	protected static async responseHandler(response: any) {
		if (response.ok) {
			return await BaseCommunicator.safeParseJson(response);
		} else {
			throw await BaseCommunicator.safeParseJson(response);
		}
	}

	public getLoadUrl(tableName = null) {
		const queryParams = this.createQueryString({ tableName });
		return `${this.basePath}/getTableData?${queryParams}`;
	}

	public getLoadUrlForCompareTable(memoryTableName) {
		const queryParams = this.createQueryString({ memoryTableName });
		return `${this.basePath}/getCompareResultTableData?${queryParams}`;
	}

	public getUpdateUrl(tableName = null) {
		const queryParams = this.createQueryString({ tableName });
		return `${this.basePath}/updateTableData?${queryParams}`;
	}

	public getTotalCountUrl(tableName = null) {
		const queryParams = this.createQueryString({ tableName });
		return `${this.basePath}/getRowsQuantity?${queryParams}`;
	}

	public fetchData(path, queryParams: any = null, options: any = { method: 'GET' }) {
		const fetchPath = queryParams ? `${path}?${queryParams}` : path;
		return authJwtApi.getTokens().then(() => {
			return fetch(fetchPath, options)
				.then(BaseCommunicator.responseHandler)
				.catch((error) => {
					this.notificationController.createNotification(error.errorMessage, Severity.ERROR)
			});
		});
	}

	public fetchBlobData(path, queryParams: any = null, options: any = { method: 'GET' }) {
		const fetchPath = queryParams ? `${path}?${queryParams}` : path;
		return authJwtApi.getTokens()
			.then(() => fetch(fetchPath, options).catch((error) => this.notificationController.createNotification(error.errorMessage, Severity.ERROR)))

	}

	createQueryString(extraParams = {}) {
		const params = {
			warehouseId: this.warehouseId,
			campaignId: this.campaignId,
			tableId: this.tableId,
			filter: this.filter,
			...extraParams,
		};

		return generateQueryParams(params);
	}
}

export default BaseCommunicator;
