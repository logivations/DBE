/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import communicator from '../../api/Communicator';
import debounce from 'lodash/debounce';
import TFunction from '../../models/Types/Types';
import { ForeignKeyInfo } from '../../models/Classes';
import { isDefined } from '../../utils/utils';

class ForeignButtonProxy {
	private static MAX_SIZE_COLLECTED_DATA = 200;
	private static instance: ForeignButtonProxy;
	public warehouseId = window['WAREHOUSE_ID'];

	private collectedData: Map<string, Set<any>> = new Map();
	private foreignKeyInfos: Map<string, ForeignKeyInfo> = new Map();

	private cachedData = new Map();

	private callbacksByColName: Map<string, Set<TFunction>> = new Map();
	private readonly debouncedRetrievingForeignData: TFunction;

	constructor() {
		if (!ForeignButtonProxy.instance) {
			ForeignButtonProxy.instance = this;
		}
		this.debouncedRetrievingForeignData = debounce(this.retrievingForeignData.bind(this), 300);
		return ForeignButtonProxy.instance;
	}

	private checkCache(columnName, data, foreignKeyInfo, callback): boolean {
		if (this.cachedData.has(columnName)) {
			const cachedDataByColumn = this.cachedData.get(columnName);
			if (cachedDataByColumn) {
				const id = Object.keys(foreignKeyInfo.joinedKeyColumnNames)
					.map((colName: string) => {
						return data[colName];
					})
					.join('-');
				if (Object.hasOwn(cachedDataByColumn, id)) {
					callback(cachedDataByColumn);
					return true;
				}
			}
		}
		return false;
	}

	public clearCache(columnName?: string) {
		if (columnName) {
			this.cachedData.delete(columnName);
		} else {
			this.cachedData.clear();
		}
	}

	public retrievingForeignData() {
		return Promise.all(
			[...this.foreignKeyInfos.entries()].map(([columnName, foreignKeyInfo]) => {
				const joinedValues: { [key: string]: any } = Object.entries(foreignKeyInfo.joinedKeyColumnNames).reduce(
					(acc, [childColName, parentColName]) => {
						const valuesByColumn = this.collectedData.get(childColName);
						if (isDefined(valuesByColumn)) {
							return { ...acc, [parentColName]: [...valuesByColumn] };
						}
						return acc;
					},
					{},
				);

				if (joinedValues.isObjectEmpty()) {
					return Promise.resolve();
				}

				return communicator
					.getForeignKeyRelatedData(
						foreignKeyInfo.serialize(),
						joinedValues,
						foreignKeyInfo.isParentTableHasWhId,
					)
					.then((result) => {
						this.cachedData.set(columnName, result);
						if (this.callbacksByColName.has(columnName)) {
							this.callbacksByColName.get(columnName).forEach((callback) => {
								callback(result);
							});
							this.callbacksByColName.delete(columnName);
						}
					})
					.finally(() => {
						this.clearCollectedData();
					});
			}),
		).finally(() => {
			this.callbacksByColName.clear();
			this.foreignKeyInfos.clear();
		});
	}

	public getNameByValue(columnName, data, foreignKeyInfo, callback): void {
		if (this.checkCache(columnName, data, foreignKeyInfo, callback)) return;
		this.addCallbackListener(columnName, callback);

		this.foreignKeyInfos.set(columnName, foreignKeyInfo);
		const joinedColumnNames = Object.keys(foreignKeyInfo.joinedKeyColumnNames);
		joinedColumnNames.forEach((colName) => {
			this.collectRequest(colName, data[colName]);
		});
		this.debouncedRetrievingForeignData();
	}

	private addCallbackListener(colName, callback) {
		if (this.callbacksByColName.has(colName)) {
			const callbacks = this.callbacksByColName.get(colName);
			callbacks.add(callback);
			this.callbacksByColName.set(colName, callbacks);
		} else {
			this.callbacksByColName.set(colName, new Set([callback]));
		}
	}

	private collectRequest(columnName, value) {
		if (isDefined(value) && value !== 0) {
			if (this.collectedData.has(columnName)) {
				const collectedData = this.collectedData.get(columnName);
				collectedData.add(value);
				this.collectedData.set(columnName, collectedData);
			} else {
				this.collectedData.set(columnName, new Set([value]));
			}
		}
	}

	private clearCollectedData(columnName?) {
		if (columnName) {
			if (
				this.collectedData.has(columnName) &&
				this.collectedData.get(columnName).size > ForeignButtonProxy.MAX_SIZE_COLLECTED_DATA
			) {
				this.collectedData.delete(columnName);
			}
		} else {
			this.collectedData.clear();
		}
	}
}

export default ForeignButtonProxy;
