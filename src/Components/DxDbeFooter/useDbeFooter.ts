/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback, useEffect, useState } from 'react';
import TableInstance from '../../services/TableInstanceManager/TableInstance';
import { FilterGroup } from '../../models/Classes';
import ModalsTypes from '../../constants/ModalsTypes';
import translate from '../../i18n/localization';
import { TypeOfUserParamSettings } from '../../constants/userParamsSettingsConstants';
import ButtonNames from '../../services/ToolbarPanelManager/ButtonNames';
import useModalWindowPopupContext from '../../context/ModalPopupContext';
import DxGridSettings from '../../helpers/DxGridSettingsService';

const useDbeFooter = (tableInstance: TableInstance, dbeDxGridRef) => {
	const { openModalWithProps } = useModalWindowPopupContext();
	const [allRowsCount, setAllRowsCount] = useState<number>(0);
	const [selectedRowsCount, setSelectedRowsCount] = useState<number>(0);
	const [selectionFilter, setSelectionFilter] = useState<FilterGroup>(new FilterGroup());
	const [headerAndRowFilter, setHeaderAndRowFilter] = useState<FilterGroup>(new FilterGroup());
	const [isHeaderAndRowFilterButtonVisible, setHeaderAndRowFilterButtonVisibility] = useState(false);
	const [hiddenColumnFilter, setHiddenColumnFilter] = useState([]);

	useEffect(() => {
		if (tableInstance) {
			tableInstance.getTableDataModel().setRefreshCounter(({ totalCount }) => {
				setAllRowsCount(totalCount);
			});
		}
	}, [tableInstance]);

	useEffect(() => {
		setHeaderAndRowFilterButtonVisibility(tableInstance.checkIfColumnsFiltered());
		dbeDxGridRef.current.instance.on('selectionChanged', async ({ component }) => {
			const rows = await component.getSelectedRowsData();
			const selectionFilter = tableInstance.getTableDataModel().createFilterGroupFromUniqueKeys(rows);

			setSelectedRowsCount(rows.length);
			setSelectionFilter(selectionFilter);
		});
		dbeDxGridRef.current.instance.on('optionChanged', async (e) => {
			if (e.name !== 'columns') return;
			setTimeout(() => {
				const filter = tableInstance.getTableDataModel().getRowAndHeaderFilter();
				setHeaderAndRowFilterButtonVisibility(filter && !filter.isZeroFilter());
				setHeaderAndRowFilter(filter);
			}, 800);
		});
	}, [dbeDxGridRef]);

	const toolbarPanelDispatch = useCallback(
		(...args) => {
			return tableInstance.toolbarPanelButtonManager.dispatchForToolbar(...args);
		},
		[tableInstance, tableInstance.toolbarPanelButtonManager],
	);

	useEffect(() => {
		dbeDxGridRef.current.instance.on('optionChanged', (data) => {
			const [_, fieldName] = DxGridSettings.parseSettingFullName(data.fullName);
			if (fieldName === 'visible') {
				const columnChooserView = data.component.getView('columnChooserView');
				const columns = columnChooserView.getColumns().map((column) => column.dataField);
				columnChooserView.isColumnChooserVisible() && setHiddenColumnFilter(columns);
				toolbarPanelDispatch({
					type: 'UPDATE_SELECTED_ITEM_KEY',
					payload: { selectedItemKey: null, buttonName: ButtonNames.hiddenColumnSettingButton },
				});
			}
			if (fieldName === 'sortOrder') {
				toolbarPanelDispatch({
					type: 'UPDATE_SELECTED_ITEM_KEY',
					payload: { selectedItemKey: null, buttonName: ButtonNames.tableSortButton },
				});
			}
		});
		dbeDxGridRef.current.instance.on('contentReady', ({ component }) => {
			const columnChooserView = component.getView('columnChooserView');
			const columns = columnChooserView.getColumns().map((column) => column.dataField);
			columnChooserView.isColumnChooserVisible() && setHiddenColumnFilter(columns);
			tableInstance.setColumnChooserRef(columnChooserView);
			if (!columnChooserView._popupContainer) {
				columnChooserView._initializePopupContainer();
				columnChooserView.render();
				columnChooserView._popupContainer.on('hiding', function () {
					setHiddenColumnFilter([]);
				});
				columnChooserView._popupContainer.on('showing', function () {
					const columns = columnChooserView.getColumns().map((column) => column.dataField);
					setHiddenColumnFilter(columns);
				});
			}
		});
	}, [dbeDxGridRef]);

	const createSelectionFilter = useCallback(() => {
		openModalWithProps(ModalsTypes.SELECTION_FOR_FILTER_MODAL, {
			tableInstance,
			type: TypeOfUserParamSettings.FILTER_SETTINGS,
			modalTitle: translate('_SAVE_SELECTION_FOR_FILTER_AS'),
			setting: selectionFilter,
			dataGrid: dbeDxGridRef?.current?.instance,
		});
	}, [selectionFilter]);

	const createRowAndHeaderFilter = useCallback(() => {
		openModalWithProps(ModalsTypes.SELECTION_FOR_FILTER_MODAL, {
			tableInstance,
			type: TypeOfUserParamSettings.FILTER_SETTINGS,
			modalTitle: translate('_SAVE_QUICK_FILTER_AS'),
			setting: headerAndRowFilter,
			dataGrid: dbeDxGridRef?.current?.instance,
		});
	}, [headerAndRowFilter]);

	const createHiddenColumnFilter = useCallback(() => {
		openModalWithProps(ModalsTypes.SELECTION_FOR_FILTER_MODAL, {
			tableInstance,
			type: TypeOfUserParamSettings.HIDDEN_COLUMNS_SETTING,
			modalTitle: translate('_SAVE_HIDDEN_COLUMNS_FILTER_AS'),
			setting: hiddenColumnFilter,
			dataGrid: dbeDxGridRef?.current?.instance,
		});
	}, [hiddenColumnFilter]);

	return {
		allRowsCount,
		selectedRowsCount,
		selectionFilter,
		createSelectionFilter,
		createRowAndHeaderFilter,
		isHeaderAndRowFilterButtonVisible,
		createHiddenColumnFilter,
		hiddenColumnFilter,
	};
};

export default useDbeFooter;
