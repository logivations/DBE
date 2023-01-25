/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback } from 'react';
import ButtonNames from '../services/ToolbarPanelManager/ButtonNames';
import sortSetting from '../models/Classes/SortSetting';
import TableInstance from '../services/TableInstanceManager/TableInstance';
import ForeignButtonProxy from '../services/ForeignButtonManager/ForeignButtonProxy';

const useSettings = (dbeDxGridInstance, tableInstance: TableInstance) => {
	const toolbarPanelDispatch = useCallback(
		(...args) => {
			return tableInstance.toolbarPanelButtonManager.dispatchForToolbar(...args);
		},
		[tableInstance, tableInstance.toolbarPanelButtonManager],
	);

	return useCallback((params) => {
		const { defaultFilter, defaultHiddenColumnFilter, defaultSortOrder } = params;
		toolbarPanelDispatch({
			type: 'UPDATE_SELECTED_ITEM_KEY',
			payload: { selectedItemKey: defaultFilter?.settingId || null, buttonName: ButtonNames.filterSettingButton },
		});
		toolbarPanelDispatch({
			type: 'UPDATE_SELECTED_ITEM_KEY',
			payload: { selectedItemKey: defaultSortOrder?.settingId || null, buttonName: ButtonNames.tableSortButton },
		});
		toolbarPanelDispatch({
			type: 'UPDATE_SELECTED_ITEM_KEY',
			payload: {
				selectedItemKey: defaultHiddenColumnFilter?.settingId || null,
				buttonName: ButtonNames.hiddenColumnSettingButton,
			},
		});

		dbeDxGridInstance.filter(defaultFilter || null);
		sortSetting.applySortingSetting(defaultSortOrder || null, dbeDxGridInstance);
		document.title = tableInstance.getTabTitle(params['tabTitle']);

		dbeDxGridInstance.option('customizeColumns', (columns) => {
			columns.forEach((column) => {
				column.visible = defaultHiddenColumnFilter
					? !defaultHiddenColumnFilter.setting.includes(column.dataField)
					: true;
			});
		});
		if (params.isAutoRefresh) {
			tableInstance.setInterval(() => {
				new ForeignButtonProxy().clearCache();
				dbeDxGridInstance.refresh(true);
				setTimeout(() => {
					dbeDxGridInstance.repaint();
				}, 1000);
			});
		} else {
			tableInstance.clearInterval();
		}

		dbeDxGridInstance.option('pageSize', parseInt(params.pageSize, 10));
		dbeDxGridInstance.pageSize(parseInt(params.pageSize, 10));
		dbeDxGridInstance.repaint();
	}, []);
};

export default useSettings;
