/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DataSource from 'devextreme/data/data_source';

export const createGroupedItemsForSelectBox = (elements: any[]) => {
	return new DataSource({
		store: {
			type: 'array',
			data: elements,
			key: 'settingId',
		},
		group: 'category',
	});
};
