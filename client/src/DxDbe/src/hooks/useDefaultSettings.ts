/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useCallback, useEffect, useMemo} from 'react';
import {SortSetting} from '../models/Classes';
import {IDxGridSettings} from '../helpers/DxGridSettingsService';
import TableInstanceManager from "../services/TableInstanceManager/TableInstanceManager";
import ButtonNames from "../services/ToolbarPanelManager/ButtonNames";

const useDefaultSettings = (tableInstance, dbeDxGridRef, tableName, tableType) => {
	const tableInstanceManager = new TableInstanceManager();
	const customizeColumns: any = useCallback(
		(columns) => {
			const defaultHiddenColumn = tableInstance.defaultHiddenColumn;
			const dxGridCommonSettings = tableInstance.tableRelatedUserParameters.dxGridCommonSettings;
			columns.forEach((column) => {
				const commonSetting = dxGridCommonSettings.getByColumnName(column.dataField);
				if (commonSetting) {
					Object.assign(column, commonSetting);
				}
				if (defaultHiddenColumn) {
					column.visible = !defaultHiddenColumn.setting.includes(column.dataField);
				}
			});
		},
		[tableInstance],
	);

	useEffect(() => {
		if (tableInstance && dbeDxGridRef && dbeDxGridRef.current) {
			const gridInstance = dbeDxGridRef.current?.instance;
			const urlFilter = tableInstance.urlFilter;
			if (urlFilter) {
				gridInstance.filter(urlFilter);
			} else {
				const defaultFilter = tableInstance.defaultFilter;
				defaultFilter && gridInstance.filter(defaultFilter);
			}

			const defaultSortOrder = tableInstance.defaultSortOrder;
			defaultSortOrder && SortSetting.applySortingSetting(defaultSortOrder, gridInstance);
		}

		if (tableType === TableInstanceManager.ORIGINAL_TABLE && tableInstance) {
			document.title = tableInstance.getTabTitle();
		}
	}, [tableInstance, dbeDxGridRef]);

	useEffect(() => {
		if (tableInstance && dbeDxGridRef && dbeDxGridRef.current) {
			let interval;
			if (tableInstance.tableRelatedUserParameters.isAutoRefresh) {
				interval = setInterval(() => {
					dbeDxGridRef.current.instance.refresh(true);
				}, tableInstance.tableRelatedUserParameters.intervalInSeconds * 1000);
			} else {
				clearInterval(interval);
			}

		}
	}, [dbeDxGridRef, dbeDxGridRef.current, tableInstance]);

	const gridCommonSettings = useMemo(() => {
		if (tableInstance) {
			return tableInstance.tableRelatedUserParameters.getDxGridCommonSettings();
		}
		return null;
	}, [tableInstance]);

	const onOptionChanged: any = useCallback(
		(data) => {
			if (data.fullName.split('.')[1] === 'visible') {
				// needed for deselecting applied filter in toolbar when column chooser is changed
				const toolbarRef = tableInstanceManager.toolbarBarRefs.get(tableInstance.getTableName());
				const hiddenColumnButton = toolbarRef.current.props.children.find(({key}) => key === ButtonNames.hiddenColumnSettingSplitMenuButton);
				hiddenColumnButton.props.options.selectedItemKey =  null;
				toolbarRef.current.instance.repaint();
			}

			if (gridCommonSettings) {
				gridCommonSettings.onSettingsChanged(data as IDxGridSettings, () => dbeDxGridRef.current.instance, tableInstance);
			}
		},
		[gridCommonSettings, tableInstance],
	);

	//TODO: fix error in DataGrid for selected rows
	// const selectedRowKeys: [] = useMemo(() => {
	// 	if (gridCommonSettings) {
	// 		const selectedKeys = gridCommonSettings.getByParamName(AllowedSettingNames.selectedRowKeys);
	// 		return selectedKeys.map(Object.values).flat() || [];
	// 	}
	// 	return [];
	// }, [gridCommonSettings]);

	return [customizeColumns, onOptionChanged];
};
export default useDefaultSettings;
