/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { Deferred } from 'devextreme/core/utils/deferred';
import { extend } from 'devextreme/core/utils/extend';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { normalizeSortingInfo } from 'devextreme/data/utils';
import { FilterGroup, SortingData } from '../../models/Classes';
import TableDataModel from '../TableDataModel/TableDataModel';
import {
	createLoadExtra,
	getErrorMessageFromXhr,
	isAdvancedGrouping,
	processLoadResponse,
	serializeKey,
	stringifyDatesInFilter,
} from '../../utils/customStoreUtils';
import TFunction from '../../models/Types/Types';
import authJwtApi from '../../api/AuthJwtApi';

const CUSTOM_STORE_OPTIONS = [
	'onLoading',
	'onLoaded',
	'onInserting',
	'onInserted',
	'onUpdating',
	'onUpdated',
	'onRemoving',
	'onRemoved',
	'onModifying',
	'onModified',
	'onPush',
	'loadMode',
	'cacheRawData',
	'errorHandler',
];

class StoreConfig {
	public keyExpr: string[] = null;
	public loadUrl = '';
	public totalCountUrl = '';
	public loadMethod = '';
	public updateMethod = '';
	public insertMethod = '';
	public deleteMethod = '';
	public totalCountMethod = '';
	public loadParams = null;
	public isRawLoadMode = false;
	public updateUrl = '';
	public insertUrl = '';
	public deleteUrl = '';
	public onBeforeSend = null;
	public onAjaxError = null;
	public options = {};
	public tableDataModel: TableDataModel = null;
	public loadDataTransformer: TFunction;

	constructor(options) {
		this.keyExpr = options.key;
		this.loadUrl = options.loadUrl;
		this.loadMethod = options.loadMethod || 'GET';
		this.updateMethod = options.updateMethod || 'PUT';
		this.insertMethod = options.insertMethod || 'POST';
		this.deleteMethod = options.deleteMethod || 'DELETE';
		this.totalCountMethod = options.deleteMethod || 'POST';
		this.loadParams = options.loadParams;
		this.isRawLoadMode = options.loadMode === 'raw';
		this.updateUrl = options.updateUrl;
		this.insertUrl = options.insertUrl;
		this.deleteUrl = options.deleteUrl;
		this.totalCountUrl = options.totalCountUrl;
		this.onBeforeSend = options.onBeforeSend;
		this.onAjaxError = options.onAjaxError;
		this.options = options;
		this.tableDataModel = options.tableDataModel;
		this.loadDataTransformer =
			options.loadDataTransformer ||
			function (res) {
				return res;
			};
	}

	static createStoreConfig(options) {
		const storeConfig = new StoreConfig(options);
		return storeConfig.createResult();
	}

	public send(operation, requiresKey, ajaxSettings, customSuccessHandler) {
		const d = Deferred();
		let thenable;
		let beforeSendResult;

		const sendCore = () => {
			import(/* webpackChunkName: "ajaxUtility" */ 'devextreme/core/utils/ajax').then(
				({ default: ajaxUtility }) => {
					return authJwtApi.getTokens().then(() => {
						ajaxUtility.sendRequest(ajaxSettings).then(
							(res, textStatus, xhr) => {
								if (customSuccessHandler) {
									customSuccessHandler(d, res, xhr);
								} else {
									d.resolve();
								}
							},
							(xhr, textStatus) => {
								let error = getErrorMessageFromXhr(xhr);

								if (this.onAjaxError) {
									const e = { xhr, error };
									this.onAjaxError(e);
									error = e.error;
								}

								if (error) {
									d.reject(error);
								} else {
									d.reject(xhr, textStatus);
								}
							},
						);
					});
				},
			);
		};

		if (requiresKey && !this.keyExpr) {
			d.reject(new Error(`Primary key is not specified (operation: '${operation}', url: '${ajaxSettings.url}')`));
		} else {
			ajaxSettings.cache = false;
			ajaxSettings.dataType = 'json';

			if (this.onBeforeSend) {
				beforeSendResult = this.onBeforeSend(operation, ajaxSettings);
				if (beforeSendResult && typeof beforeSendResult.then === 'function') {
					thenable = beforeSendResult;
				}
			}

			if (thenable) {
				thenable.then(sendCore, (error) => {
					d.reject(error);
				});
			} else {
				sendCore();
			}
		}

		return d.promise();
	}

	public filterByKey(keyValue) {
		if (!Array.isArray(this.keyExpr)) {
			return [this.keyExpr, keyValue];
		}

		return this.keyExpr.map((i) => [i, keyValue[i]]);
	}

	public loadOptionsToActionParams(options, isCountQuery) {
		const result = {};
		Object.assign(options, { isDictinct: !!options.dataField });

		if (isCountQuery) {
			result['isCountQuery'] = isCountQuery;
		}

		if (options) {
			['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'isDictinct'].forEach((i) => {
				if (options[i] !== undefined) {
					result[i] = options[i];
				}
			});
			result['dataField'] = Object.hasOwn(options, 'dataField') ? [options['dataField']] : [];

			const normalizeSorting = normalizeSortingInfo;
			let group = options.group;
			let filter = options.filter;
			let select = options.select;
			const sort = options.sort;
			const totalSummary = options.totalSummary;

			if (sort) {
				result['sort'] = SortingData.create(normalizeSorting(options.sort));
			}

			if (group) {
				if (!isAdvancedGrouping(group)) {
					group = normalizeSorting(group);
				}
				group.forEach(({ selector }) => {
					if (!result['dataField'].includes(selector)) {
						result['dataField'].push(selector);
						result['isDictinct'] = true;
					}
				});
			}

			if (filter) {
				let filterGroup;
				if (filter.setting instanceof FilterGroup) {
					filterGroup = filter.setting;
				} else if (filter instanceof FilterGroup) {
					filterGroup = filter;
				} else {
					filter = extend(true, [], filter);
					stringifyDatesInFilter(filter);
					filterGroup = FilterGroup.createFilterGroup(filter);
					this.tableDataModel.setRowAndHeaderFilter(filterGroup);
				}
				this.tableDataModel.setAllAppliedFilters(filterGroup);
				result['filter'] = filterGroup;
			} else {
				this.tableDataModel.setAllAppliedFilters(null);
				this.tableDataModel.setRowAndHeaderFilter(null);
			}

			if (totalSummary) {
				//TODO: temporary fix: discuss with Vova
				result['totalSummary'] = totalSummary.filter(({ summaryType }) => summaryType !== 'NULL');
				result['selectionFilter'] = this.tableDataModel.getSelectionFilter();
			}

			if (options.groupSummary) {
				result['groupSummary'] = options.groupSummary;
			}

			if (select) {
				if (!Array.isArray(select)) {
					select = [select];
				}
				result['select'] = select;
			}
		}

		extend(result, this.loadParams);

		return JSON.stringify(result);
	}

	public handleInsertUpdateSuccess = (d, res, xhr) => {
		const mime = xhr.getResponseHeader('Content-Type');
		const isJSON = mime && mime.includes('application/json');
		d.resolve(isJSON ? JSON.parse(res) : res);
	};

	public createResult() {
		const result = {
			key: this.keyExpr,
			useDefaultSearch: true,
			load: (loadOptions) => {
				return this.send(
					'load',
					false,
					{
						url: this.loadUrl,
						method: this.loadMethod,
						data: this.loadOptionsToActionParams(loadOptions, false),
						headers: {
							'Content-Type': 'application/json',
						},
					},
					(d, res) => {
						processLoadResponse(d, res, (res) => {
							if (loadOptions.dataField || loadOptions.group?.length) {
								try {
									const result = res.data.data.reduce((acc, re) => {
										return [
											...acc,
											...Object.values(re).map((key) => ({
												key,
												items: null,
												count: res.length,
											})),
										];
									}, []);
									return [result, createLoadExtra(res)];
								} catch (e) {
									console.error('ProcessLoadResponse Error: ', e);
								}
							}
							return [this.loadDataTransformer(res.data), createLoadExtra(res)];
						});
					},
				);
			},

			totalCount: (loadOptions) => {
				!this.isRawLoadMode &&
					this.send(
						'send',
						false,
						{
							url: this.totalCountUrl,
							method: this.totalCountMethod,
							data: this.loadOptionsToActionParams(loadOptions, true),
							headers: {
								'Content-Type': 'application/json',
							},
						},
						(d, res) => {
							processLoadResponse(d, res, ({ totalCount }) => {
								return [totalCount];
							});
						},
					);
			},

			byKey: (key) => {
				!this.isRawLoadMode &&
					this.send(
						'load',
						true,
						{
							url: this.loadUrl,
							method: this.loadMethod,
							data: this.loadOptionsToActionParams({ filter: this.filterByKey(key) }, false),
						},
						(d, res) => {
							processLoadResponse(d, res, ({ data }) => [data[0]]);
						},
					);
			},

			update: (key, values) => {
				return this.send(
					'update',
					true,
					{
						url: this.updateUrl,
						method: this.updateMethod,
						headers: {
							'Content-Type': 'application/json',
						},
						data: JSON.stringify(this.tableDataModel.updateOptionsToActionParams(key, values)),
					},
					(d, res, xhr) => {
						const mime = xhr.getResponseHeader('Content-Type');
						const isJSON = mime && mime.includes('application/json');
						//res.updatedRow = {on_empty_remove_assignment: true, keep_size: false, enable_background_image: false};
						d.resolve(isJSON ? res.updatedRow : res);
					},
				);
			},

			insert: (values) => {
				this.insertUrl &&
					this.send(
						'insert',
						true,
						{
							url: this.insertUrl,
							method: this.insertMethod,
							data: { values: JSON.stringify(values) },
						},
						this.handleInsertUpdateSuccess,
					);
			},

			remove: (key) => {
				this.deleteUrl &&
					this.send(
						'delete',
						true,
						{
							url: this.deleteUrl,
							method: this.deleteMethod,
							data: { key: serializeKey(key) },
						},
						() => {},
					);
			},
		};
		CUSTOM_STORE_OPTIONS.forEach((name) => {
			const value = this.options[name];
			if (value !== undefined) {
				result[name] = value;
			}
		});

		return result;
	}
}

export default function createStore(options) {
	const config = StoreConfig.createStoreConfig(options);
	return import(/* webpackChunkName: "CustomStore" */ 'devextreme/data/custom_store').then(
		({ default: CustomStore }) => {
			// @ts-ignore
			return new CustomStore(config);
		},
	);
}
