/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback, useEffect, useMemo } from 'react';
import { SortSetting } from '../models/Classes';
import { IDxGridSettings } from '../helpers/DxGridSettingsService';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import TableInstance from '../services/TableInstanceManager/TableInstance';
import ForeignButtonProxy from '../services/ForeignButtonManager/ForeignButtonProxy';

const useDefaultSettings = (
	tableInstance: TableInstance,
	dbeDxGridRef,
	tableName,
	tableType,
	initialFilter,
	tableInstanceManager,
) => {
	const applyFiltersOnInit = useCallback(
		(dxDbeGrid) => {
			if (initialFilter) {
				dxDbeGrid.filter(initialFilter);
			} else if (tableInstance?.urlFilter) {
				dxDbeGrid.filter(tableInstance.urlFilter);
			} else if (tableInstance?.defaultFilter) {
				dxDbeGrid.filter(tableInstance.defaultFilter);
			}
		},
		[tableInstance, initialFilter],
	);

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

	const onInitialized = useCallback(
		({ component }) => {
			applyFiltersOnInit(component);
			if (tableType === TableInstanceManager.ORIGINAL_TABLE) {
				tableInstanceManager.initializeEventForOriginalTable(component);
			}
		},
		[applyFiltersOnInit, tableInstanceManager, tableType],
	);

	useEffect(() => {
		if (tableInstance && dbeDxGridRef?.current) {
			const gridInstance = dbeDxGridRef.current.instance;
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
		if (tableInstance && dbeDxGridRef?.current) {
			if (tableInstance.tableRelatedUserParameters.isAutoRefresh) {
				tableInstance.setInterval(() => {
					new ForeignButtonProxy().clearCache();
					dbeDxGridRef.current.instance.refresh(true);
					setTimeout(() => {
						dbeDxGridRef.current.instance.repaint();
					}, 1000);
				});
			} else {
				tableInstance.clearInterval();
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
			if (gridCommonSettings) {
				gridCommonSettings.onSettingsChanged(
					data as IDxGridSettings,
					() => dbeDxGridRef.current.instance,
					tableInstance,
				);
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

	return [customizeColumns, onOptionChanged, onInitialized];
};
export default useDefaultSettings;
