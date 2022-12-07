/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import communicator from '../../api/Communicator';
import TableDataModel from '../TableDataModel/TableDataModel';
import CustomStore from 'devextreme/data/custom_store';

const getCustomStore = (
	tableDataModel: TableDataModel,
	tableName: string | null,
	getLoadUrl,
	loadDataTransformer,
	combinedPrimaryKey,
	loadParams = {},
): Promise<CustomStore> => {
	return new Promise(async (resolve) => {
		await tableDataModel.setForeignKeyData(tableName);
		import(/* webpackChunkName: "createStore" */ './dataRetrieverNojquery').then(({ default: createStore }) => {
			const store = createStore({
				key: combinedPrimaryKey,
				loadUrl: getLoadUrl(tableName),
				updateUrl: communicator.getUpdateUrl(tableName),
				totalCountUrl: communicator.getTotalCountUrl(tableName),
				loadMode: 'processed',
				loadMethod: 'POST',
				loadDataTransformer: loadDataTransformer,
				loadParams,
				tableDataModel,
			});
			resolve(store);
		});
	});
};

export default getCustomStore;
