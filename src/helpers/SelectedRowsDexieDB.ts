/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import Dexie from 'dexie';

class SelectedRowsDexieDB extends Dexie {
	static instance: SelectedRowsDexieDB = null;
	private readonly userId: number;
	private readonly warehouseId: number;
	private readonly campaignId: number;

	constructor(campaignId) {
		if (!SelectedRowsDexieDB.instance) {
			super('SelectedRows');
			this.userId = parseInt(window['USER_ID'], 10);
			this.warehouseId = parseInt(window['WAREHOUSE_ID'], 10);
			this.campaignId = campaignId;
			this.initDexie();
			SelectedRowsDexieDB.instance = this;
		}
		return SelectedRowsDexieDB.instance;
	}

	public addRecord(chartId, data) {
		this.table('uniqueKeysData').put(this.generateRecord(chartId, data));
	}

	private initDexie() {
		this.version(1).stores({
			uniqueKeysData: '[userId+warehouseId+campaignId+chartId], uniqueKeysData',
		});
	}

	private generateRecord(chartId, data) {
		return {
			userId: this.userId,
			warehouseId: this.warehouseId,
			campaignId: this.campaignId,
			chartId: chartId,
			uniqueKeysData: data,
		};
	}
}

export default SelectedRowsDexieDB;
