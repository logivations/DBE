/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import TableInstanceManager from "../services/TableInstanceManager/TableInstanceManager";
import {useCallback, useMemo} from "react";
import ButtonNames from "../services/ToolbarPanelManager/ButtonNames";
import sortSetting from "../models/Classes/SortSetting";

const useSettings = (dbeDxGridInstance, tableInstance) => {
    const tableInstanceManager = new TableInstanceManager();
    const tableName = useMemo(() => tableInstance.table.getTableName(), []);

    return useCallback((params) => {
        const {defaultFilter, defaultHiddenColumnFilter, defaultSortOrder} = params;
        const toolbarRef = tableInstanceManager.toolbarBarRefs.get(tableName);
        const toolbarChildren = toolbarRef.current.props.children;
        const filterButton = toolbarChildren.find(({key}) => key === ButtonNames.filterSettingSplitMenuButton);
        const sortButton = toolbarChildren.find(({key}) => key === ButtonNames.tableSortButton);
        const hiddenColumnButton = toolbarChildren.find(({key}) => key === ButtonNames.hiddenColumnSettingSplitMenuButton);

        filterButton.props.options.selectedItemKey = defaultFilter ? defaultFilter.settingId : null;
        sortButton.props.options.selectedItemKey = defaultSortOrder ? defaultSortOrder.settingId : null;
        hiddenColumnButton.props.options.selectedItemKey = defaultHiddenColumnFilter ? defaultHiddenColumnFilter.settingId : null;

        toolbarRef.current.instance.repaint();

        dbeDxGridInstance.filter(defaultFilter || null);
        sortSetting.applySortingSetting(defaultSortOrder || null, dbeDxGridInstance);
        document.title = tableInstance.getTabTitle(params['tabTitle']);

        dbeDxGridInstance.option('customizeColumns', (columns) => {
            columns.forEach((column) => {
                column.visible = defaultHiddenColumnFilter ? !defaultHiddenColumnFilter.setting.includes(column.dataField) : true;
            });
        });
        dbeDxGridInstance.refresh(true);
    }, []);
}

export default useSettings;