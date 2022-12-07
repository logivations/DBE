/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useCallback, useEffect, useState} from "react";
import TableInstance from "../../services/TableInstanceManager/TableInstance";
import {FilterGroup} from "../../models/Classes";
import ModalsTypes from "../../constants/ModalsTypes";
import translate from "../../i18n/localization";
import useModalContext from "../../context/ModalsContext";
import {TypeOfUserParamSettings} from "../../constants/userParamsSettingsConstants";

const useDbeFooter = (tableInstance: TableInstance, dbeDxGridRef) => {
    const {openModal} = useModalContext();

    const [allRowsCount, setAllRowsCount] = useState<number>(0);
    const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);
    const [selectionFilter, setSelectionFilter] = useState<FilterGroup>(new FilterGroup());
    const [headerAndRowFilter, setHeaderAndRowFilter] = useState<FilterGroup>(new FilterGroup());
    const [isHeaderAndRowFilterButtonVisible, setHeaderAndRowFilterButtonVisibility] = useState(false);
    const [hiddenColumnFilter, setHiddenColumnFilter] = useState([]);

    useEffect(() => {
        if (tableInstance) {
            tableInstance.getTableDataModel().setRefreshCounter(({totalCount}) => {
                setAllRowsCount(totalCount);
            });
        }
    }, [tableInstance]);

    useEffect(() => {
        setHeaderAndRowFilterButtonVisibility(tableInstance.checkIfColumnsFiltered());
        dbeDxGridRef.current.instance.on('selectionChanged', async ({component}) => {
            const rows = await component.getSelectedRowsData();
            const selectionFilter = tableInstance.getTableDataModel().createFilterGroupFromUniqueKeys(rows);

            setSelectedRowsCount(rows.length);
            setSelectionFilter(selectionFilter);
        });
        dbeDxGridRef.current.instance.on('optionChanged', async () => {
            setTimeout(() => {
                const filter = tableInstance.getTableDataModel().getRowAndHeaderFilter();

                setHiddenColumnFilter(tableInstance.tableRelatedUserParameters.dxGridCommonSettings.getHiddenColumns());
                setHeaderAndRowFilterButtonVisibility(filter && !filter?.isZeroFilter());
                setHeaderAndRowFilter(filter);
            }, 800);
        });
    }, [dbeDxGridRef]);

    const createSelectionFilter = useCallback(() => {
        openModal(
            ModalsTypes.SELECTION_FOR_FILTER_MODAL,
            {
                tableInstance,
                type: TypeOfUserParamSettings.FILTER_SETTINGS,
                modalTitle: translate('_SAVE_SELECTION_FOR_FILTER_AS'),
                setting: selectionFilter,
                dataGrid: dbeDxGridRef?.current?.instance,
            }
        );
    }, [selectionFilter]);

    const createRowAndHeaderFilter = useCallback(() => {
        openModal(
            ModalsTypes.SELECTION_FOR_FILTER_MODAL,
            {
                tableInstance,
                type: TypeOfUserParamSettings.FILTER_SETTINGS,
                modalTitle: translate('_SAVE_QUICK_FILTER_AS'),
                setting: headerAndRowFilter,
                dataGrid: dbeDxGridRef?.current?.instance,
            }
        );
    }, [headerAndRowFilter]);

    const createHiddenColumnFilter = useCallback(() => {
        openModal(
            ModalsTypes.SELECTION_FOR_FILTER_MODAL,
            {
                tableInstance,
                type: TypeOfUserParamSettings.HIDDEN_COLUMNS_SETTING,
                modalTitle: translate('_SAVE_HIDDEN_COLUMNS_FILTER_AS'),
                setting: hiddenColumnFilter,
                dataGrid: dbeDxGridRef?.current?.instance,
            }
        );
    }, [headerAndRowFilter]);

    return {
        allRowsCount,
        selectedRowsCount,
        selectionFilter,
        createSelectionFilter,
        createRowAndHeaderFilter,
        isHeaderAndRowFilterButtonVisible,
        createHiddenColumnFilter,
        hiddenColumnFilter
    };
};

export default useDbeFooter;