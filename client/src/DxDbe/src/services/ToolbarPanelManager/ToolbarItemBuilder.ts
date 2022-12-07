/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ToolbarItem from './ToolbarItem';
import ButtonNames from './ButtonNames';
import translate from '../../i18n/localization';
import {ChartDescription, FilterSetting, HiddenColumnSetting, SortSetting, TableActionModel, TableReference,} from '../../models/Classes';
import {FilterActions, HiddenColumnActions, SortingActions} from '../../constants/FiltersConstants';
import ToolbarPanelButtonEvents from './ToolbarPanelButtonEvents';
import TableInstance from "../TableInstanceManager/TableInstance";

class ToolbarItemBuilder {
    static buildCloseScreenBuilderTable(tableInstance, toolbarPanelButtonEvents) {
        const tableKey = tableInstance.getTableKey();
        const tableName = tableInstance.getTableName();
        const closeScreenBuilderTableButton: ToolbarItem = new ToolbarItem(ButtonNames.closeScreenBuilderTable);
        closeScreenBuilderTableButton.setTitle(translate('CLOSE'));
        closeScreenBuilderTableButton.setIcon('PowerIcon');
        closeScreenBuilderTableButton.setClickHandler(
			toolbarPanelButtonEvents.closeScreenBuilderTableButtonClickHandler(tableKey, tableName),
		);
		return closeScreenBuilderTableButton;
	}

	static buildTableActionsMenuButton(tableInstance, toolbarPanelButtonEvents) {
		const tableActions: TableActionModel[] = tableInstance.metadata.tableRelatedUserParameters.getActions();
		const tableActionsMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.tableActionsMenuButton);
		tableActionsMenuButton.setTitle(translate('TABLE_ACTIONS'));
		tableActionsMenuButton.setIcon('chevrondoubleright');
		tableActionsMenuButton.setWidget('dxDropDownButton');
		tableActionsMenuButton.mergeOptions({
			items: tableActions,
			displayExpr: 'header',
			dropDownOptions: { minWidth: 350 },
			onItemClick: toolbarPanelButtonEvents.tableActionsClickHandler(),
			itemTemplate: (data) => data.header,
		});

		return tableActionsMenuButton;
	}

	static buildReloadButton(toolbarPanelButtonEvents) {
		const reloadButton: ToolbarItem = new ToolbarItem(ButtonNames.reloadButton);
		reloadButton.setTitle(translate('_RELOAD_BUTTON') + ' (Ctrl+Shift+5)');
		reloadButton.setIcon('ReloadIcon');
		reloadButton.setWidget('dxButton');
		reloadButton.setClickHandler(toolbarPanelButtonEvents.reloadButtonClickHandler());

		reloadButton.setShortcut('Digit5', true, true);
		reloadButton.setShortcut('KeyR', false, true);
		return reloadButton;
	}

	static buildExecuteTableUpdateButton() {
		const executeTableUpdateButton: ToolbarItem = new ToolbarItem(ButtonNames.executeTableUpdateButton);
		executeTableUpdateButton.setTitle(translate('_UPDATE_BUTTON'));
		executeTableUpdateButton.setIcon('UpdateIcon');
		executeTableUpdateButton.setWidget('dxButton');

		return executeTableUpdateButton;
	}

	static buildGetLinkButton(toolbarPanelButtonEvents) {
		const getLinkButton: ToolbarItem = new ToolbarItem(ButtonNames.getLinkButton);
		getLinkButton.setTitle(translate('_GET_LINK_BUTTON'));
		getLinkButton.setIcon('LinkIcon');
		getLinkButton.setWidget('dxButton');

		getLinkButton.setClickHandler(toolbarPanelButtonEvents.getLinkButtonClickHandler());

		return getLinkButton;
	}

	static buildToggleSelectionButton(toolbarPanelButtonEvents) {
		const toggleSelectionButton: ToolbarItem = new ToolbarItem(ButtonNames.toggleSelectionButton);
		toggleSelectionButton.setClickHandler(
			toolbarPanelButtonEvents.toggleSelectionButtonClickHandler(toggleSelectionButton),
		);

		toggleSelectionButton.setTitle(translate('SELECT_ALL_ROWS'));
		toggleSelectionButton.setCssClass('toolbar-bg-icon select-all-icon');

		toggleSelectionButton.setWidget('dxButton');

		return toggleSelectionButton;
	}

	static buildDeleteRowsButton(toolbarPanelButtonEvents) {
		const deleteRowsButton: ToolbarItem = new ToolbarItem(ButtonNames.deleteRowsButton);
		deleteRowsButton.setTitle(translate('_DELETE_BUTTON') + ' (Ctrl+Shift+6)');
		deleteRowsButton.setIcon('RemoveIcon');
		deleteRowsButton.setWidget('dxButton');
		deleteRowsButton.setClickHandler(toolbarPanelButtonEvents.deleteRowsButtonClickHandler());
		deleteRowsButton.setShortcut('Digit6', true, true);

		return deleteRowsButton;
	}

	static buildAddRowButton(toolbarPanelButtonEvents) {
		const addRowButton: ToolbarItem = new ToolbarItem(ButtonNames.addRowButton);
		addRowButton.setTitle(translate('_ADD_BUTTON') + ' (Ctrl+Shift+3)');
		addRowButton.setIcon('AddIcon');
		addRowButton.setWidget('dxButton');
		addRowButton.setClickHandler(toolbarPanelButtonEvents.addRowButtonClickHandler());
		addRowButton.setShortcut('Digit3', true, true);
		addRowButton.setShortcut('Digit4', true, true);

		return addRowButton;
	}

	static buildCloneRowsButton(toolbarPanelButtonEvents) {
		const cloneRowsButton: ToolbarItem = new ToolbarItem(ButtonNames.cloneRowsButton);
		cloneRowsButton.setTitle(translate('_CLONE_BUTTON') + ' (Ctrl+Shift+4)');
		cloneRowsButton.setIcon('AddCloneIcon');
		cloneRowsButton.setWidget('dxButton');
		cloneRowsButton.setClickHandler(toolbarPanelButtonEvents.cloneRowButtonClickHandler());

		return cloneRowsButton;
	}

	static buildSaveRowsButton(tableInstance, toolbarPanelButtonEvents): ToolbarItem {
		const saveRowsButton: ToolbarItem = new ToolbarItem(ButtonNames.saveRowsButton);
		saveRowsButton.setTitle(translate('_SAVE_BUTTON'));
		saveRowsButton.setIcon('save');
		saveRowsButton.setWidget('dxButton');
		saveRowsButton.setClickHandler(toolbarPanelButtonEvents.saveRowsButtonClickHandler());

		return saveRowsButton;
	}

	static buildSaveForeignKeyButton(toolbarPanelButtonEvents) {
		const saveForeignKeyButton: ToolbarItem = new ToolbarItem(ButtonNames.saveForeignKeyButton);
		saveForeignKeyButton.setTitle(translate('_SAVE_FOREIGN_KEY_BUTTON'));
		saveForeignKeyButton.setIcon('SaveForeignKeyIcon');
		saveForeignKeyButton.setWidget('dxButton');
		saveForeignKeyButton.setClickHandler(toolbarPanelButtonEvents.saveForeignKeyButtonClickHandler());
		return saveForeignKeyButton;
	}

	static buildMassUpdateButton(toolbarPanelButtonEvents, tableType) {
		const massUpdateButton: ToolbarItem = new ToolbarItem(ButtonNames.massUpdateButton);
		massUpdateButton.setTitle(translate('_MASS_UPDATE_BUTTON'));
		massUpdateButton.setIcon('MassiveUpdateIcon');
		massUpdateButton.setWidget('dxButton');
		massUpdateButton.setClickHandler(toolbarPanelButtonEvents.massUpdateButtonClickHandler(tableType));
		return massUpdateButton;
	}

	static buildExportButton(toolbarPanelButtonEvents) {
		const exportButton: ToolbarItem = new ToolbarItem(ButtonNames.exportButton);
		exportButton.setTitle(translate('_EXPORT_BUTTON'));
		exportButton.setIcon('ExportIcon');
		exportButton.setWidget('dxButton');
		exportButton.setClickHandler(toolbarPanelButtonEvents.exportButtonClickHandler());

		return exportButton;
	}

	static buildImportButton(toolbarPanelButtonEvents) {
		const importButton: ToolbarItem = new ToolbarItem(ButtonNames.importButton);
		importButton.setTitle(translate('_IMPORT_BUTTON'));
		importButton.setIcon('ImportIcon');
		importButton.setWidget('dxButton');
		importButton.setClickHandler(toolbarPanelButtonEvents.importButtonClickHandler());

		return importButton;
	}

	static buildSettingsButton(toolbarPanelButtonEvents) {
		const settingsButton: ToolbarItem = new ToolbarItem(ButtonNames.settingsButton);
		settingsButton.setTitle(translate('_SETTINGS_BUTTON'));
		settingsButton.setIcon('SettingsIcon');
		settingsButton.setWidget('dxButton');

		settingsButton.setClickHandler(toolbarPanelButtonEvents.settingsButtonClickHandler());

		return settingsButton;
	}

	static buildPagerPanel() {
		const pagerPanel: ToolbarItem = new ToolbarItem(ButtonNames.pagerPanel);

		return pagerPanel;
	}

	static buildCompareButton(toolbarPanelButtonEvents) {
		const compareButton: ToolbarItem = new ToolbarItem(ButtonNames.compareButton);
		compareButton.setTitle(translate('_COMPARE_BUTTON'));
		compareButton.setIcon('CompareIcon');
		compareButton.setWidget('dxButton');
		compareButton.setClickHandler(toolbarPanelButtonEvents.compareButtonClickHandler());

		return compareButton;
	}

	static buildMasterButton() {
		const masterButton: ToolbarItem = new ToolbarItem(ButtonNames.masterButton);
		masterButton.setTitle(translate('_MASTER_BUTTON_SELECT'));
		masterButton.setIcon('MasterIcon');
		masterButton.setWidget('dxButton');

		return masterButton;
	}

	static buildHelpButton(toolbarPanelButtonEvents: ToolbarPanelButtonEvents) {
		const helpButton: ToolbarItem = new ToolbarItem(ButtonNames.helpButton);
		helpButton.setTitle(translate('HELP'));
		helpButton.setIcon('HelpIcon');
		helpButton.setWidget('dxButton');
		helpButton.setClickHandler(toolbarPanelButtonEvents.helpButtonClickHandler());

		return helpButton;
	}

	static buildLinksMenuButton() {
		const linksMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.linksMenuButton);
		linksMenuButton.setTitle(translate('LINKS'));
		linksMenuButton.setIcon('link');
		linksMenuButton.setWidget('dxButton');

		return linksMenuButton;
	}

	static buildFilterSettingButton(tableInstance: TableInstance, toolbarPanelButtonEvents, setComponentInstance) {
		const filtersActions: FilterSetting[] = [
			FilterSetting.create({ settingName: translate('ADD_EDIT_FILTER'), key: FilterActions.ADD_EDIT_FILTER }),
			FilterSetting.create({ settingName: translate('_UNFILTER_BUTTON') + ' (Ctrl+Shift+7)', key: FilterActions.UNFILTER }),
		];
		const filters: FilterSetting[] = tableInstance.filters;
		const defaultFilterId: string = tableInstance.defaultFilter?.settingId;
		const filterSettingSplitMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.filterSettingSplitMenuButton);

		filterSettingSplitMenuButton.setTitle(translate('_FILTER_BUTTON') + ' (Ctrl+Shift+2)');
		filterSettingSplitMenuButton.setIcon('FilterIcon');
		filterSettingSplitMenuButton.setWidget('dxDropDownButton');
		filterSettingSplitMenuButton.setShortcutHandler(
			toolbarPanelButtonEvents.filterSettingButtonItemClick(filtersActions)
		);
		filterSettingSplitMenuButton.mergeOptions({
			location: 'before',
			items: [...filtersActions, ...filters].map((filter) => ({ ...filter })),
			dropDownOptions: { minWidth: 150 },
			selectedItemKey: defaultFilterId,
			displayExpr: 'settingName',
			useSelectMode: true,
			keyExpr: 'settingId',
			onItemClick: toolbarPanelButtonEvents.filterSettingButtonItemClick(filtersActions),
			onInitialized: ({component}) => {
				setComponentInstance(filterSettingSplitMenuButton.buttonName, component);
			}
		});

		filterSettingSplitMenuButton.setShortcut('Digit2', true, true, {key: FilterActions.ADD_EDIT_FILTER});
		filterSettingSplitMenuButton.setShortcut('Digit7', true, true, {key: FilterActions.UNFILTER});
		return filterSettingSplitMenuButton;
	}

	static buildHiddenColumnSettingSplitMenuButton(tableInstance: TableInstance, toolbarPanelButtonEvents) {
		const hiddenColumnSettingSplitMenuButton: ToolbarItem = new ToolbarItem(
			ButtonNames.hiddenColumnSettingSplitMenuButton,
		);
		const hiddenColumnSettingActions: HiddenColumnSetting[] = [
			HiddenColumnSetting.create({ settingName: translate('ADD_EDIT_FILTER'), key: HiddenColumnActions.ADD_EDIT_FILTER }),
			HiddenColumnSetting.create({ settingName: translate('_SHOW_HIDDEN_COLUMNS_BUTTON'), key: HiddenColumnActions.SHOW_HIDDEN_COLUMNS }),
		];
		const hiddenColumnSettings: HiddenColumnSetting[] = tableInstance.hiddenColumnSettings;
		const defaultFilterId: string = tableInstance.defaultHiddenColumn?.getSettingId();

		hiddenColumnSettingSplitMenuButton.setTitle(translate('HIDDEN_COLUMNS_FILTER'));
		hiddenColumnSettingSplitMenuButton.setIcon('HiddenColumnsIcon');
		hiddenColumnSettingSplitMenuButton.setWidget('dxDropDownButton');

		hiddenColumnSettingSplitMenuButton.mergeOptions({
			location: 'before',
			items: [...hiddenColumnSettingActions, ...hiddenColumnSettings].map((filter) => ({ ...filter })),
			dropDownOptions: { minWidth: 150 },
			selectedItemKey: defaultFilterId,
			displayExpr: 'settingName',
			useSelectMode: true,
			keyExpr: 'settingId',
			onItemClick:
				toolbarPanelButtonEvents.hiddenColumnSettingSplitMenuButtonItemClick(hiddenColumnSettingActions),
		});
		return hiddenColumnSettingSplitMenuButton;
	}

	static buildGroupingSettingSplitMenuButton() {
		const groupingSettingSplitMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.groupingSettingSplitMenuButton);
		groupingSettingSplitMenuButton.setTitle(translate('GROUPING_FILTER'));
		groupingSettingSplitMenuButton.setIcon('indeterminatestate');
		groupingSettingSplitMenuButton.setWidget('dxButton');

		return groupingSettingSplitMenuButton;
	}

	static buildTableSortButton(tableInstance: TableInstance, toolbarPanelButtonEvents): ToolbarItem {
		const tableSortButton: ToolbarItem = new ToolbarItem(ButtonNames.tableSortButton);
		const sortSettings: SortSetting[] = tableInstance.sortOrderSettings;
		const defaultSortOrderId: string = tableInstance.defaultSortOrder?.getSettingId();

		const sortSettingsActions: SortSetting[] = [
			SortSetting.create({
				settingName: translate('ADD_EDIT_FILTER'),
				key: SortingActions.ADD_EDIT_FILTER,
			}),
			SortSetting.create({
				settingName: translate('REMOVE_SORTING'),
				key: SortingActions.REMOVE_SORTING,
			}),
		];

		tableSortButton.setTitle(translate('_TABLE_SORT_BUTTON'));
		tableSortButton.setIcon('SortIcon');
		tableSortButton.setWidget('dxDropDownButton');

		tableSortButton.mergeOptions({
			location: 'before',
			items: [...sortSettingsActions, ...sortSettings].map((sortSetting) => ({ ...sortSetting })),
			dropDownOptions: { minWidth: 150 },
			selectedItemKey: defaultSortOrderId,
			displayExpr: 'settingName',
			useSelectMode: true,
			keyExpr: 'settingId',
			onItemClick: toolbarPanelButtonEvents.tableSortButtonItemClick(sortSettingsActions),
		});

		return tableSortButton;
	}

	static buildViewChartMenuButton(tableInstance, toolbarPanelButtonEvents) {
		const viewChartMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.viewChartMenuButton);
		const tableRelatedCharts: ChartDescription[] = tableInstance.tableRelatedCharts;

		viewChartMenuButton.setTitle(translate('DBE_CHARTS'));
		viewChartMenuButton.setIcon('ChartsIcon');
		viewChartMenuButton.setWidget('dxDropDownButton');
		viewChartMenuButton.mergeOptions({
			items: tableRelatedCharts,
			dropDownOptions: { minWidth: 350 },
			onItemClick: toolbarPanelButtonEvents.tableRelatedChartsButtonClickHandler(),
			itemTemplate: (data) => translate(data.text),
		});
		return viewChartMenuButton;
	}

	static buildChildRecordsMenuButton(tableInstance, toolbarPanelButtonEvents) {
		const childRecordsMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.childRecordsMenuButton);
		childRecordsMenuButton.setTitle(translate('_CHILD_RECORDS_BUTTON'));
		childRecordsMenuButton.setIcon('ShowChildIcon');
		childRecordsMenuButton.setWidget('dxButton');
		childRecordsMenuButton.setClickHandler(
			toolbarPanelButtonEvents.openChildParentTable(translate('_CHILD_RECORDS_BUTTON'), true),
		);

		return childRecordsMenuButton;
	}

	static buildParentRecordsMenuButton(tableInstance, toolbarPanelButtonEvents) {
		const parentRecordsMenuButton: ToolbarItem = new ToolbarItem(ButtonNames.parentRecordsMenuButton);
		parentRecordsMenuButton.setTitle(translate('_PARENT_RECORDS_BUTTON'));
		parentRecordsMenuButton.setIcon('ShowParentIcon');
		parentRecordsMenuButton.setWidget('dxButton');
		parentRecordsMenuButton.setClickHandler(
			toolbarPanelButtonEvents.openChildParentTable(translate('_PARENT_RECORDS_BUTTON'), false),
		);

		return parentRecordsMenuButton;
	}

	static buildSynchronizeChildButton() {
		const synchronizeChildButton: ToolbarItem = new ToolbarItem(ButtonNames.synchronizeChildButton);
		synchronizeChildButton.setTitle(translate('_PARENT_BUTTON_SELECT'));
		synchronizeChildButton.setIcon('columnproperties');
		synchronizeChildButton.setWidget('dxButton');

		return synchronizeChildButton;
	}

	static buildMergeButton(toolbarPanelButtonEvents) {
		const mergeButton: ToolbarItem = new ToolbarItem(ButtonNames.mergeButton);
		mergeButton.setTitle(translate('MERGE_ROWS'));
		mergeButton.setIcon('MergeRowsIcon');
		mergeButton.setWidget('dxButton');
		mergeButton.setClickHandler(toolbarPanelButtonEvents.mergeRowsButtonClickHandler());

		return mergeButton;
	}

	static buildScreenBuilderButton(toolbarPanelButtonEvents) {
		const screenBuilderButton: ToolbarItem = new ToolbarItem(ButtonNames.screenBuilderButton);
		screenBuilderButton.setTitle(translate('SCREEN_BUILDER'));
		screenBuilderButton.setIcon('ScreenBuilder');
		screenBuilderButton.setWidget('dxButton');

		screenBuilderButton.setClickHandler(toolbarPanelButtonEvents.screenBuilderButtonClickHandler());

		return screenBuilderButton;
	}

	static buildColumnChooserButton(toolbarPanelButtonEvents) {
		const columnChooserButton: ToolbarItem = new ToolbarItem(ButtonNames.columnChooserButton);
		columnChooserButton.setTitle(translate('COLUMN_CHOOSER'));
		columnChooserButton.setIcon('ColumnChooserIcon');
		columnChooserButton.setWidget('dxButton');

		columnChooserButton.setClickHandler(toolbarPanelButtonEvents.columnChooserButtonClickHandler());

		return columnChooserButton;
	}

	static buildLinkReferenceButton(tableInstance, toolbarPanelButtonEvents) {
		const tableReferences: TableReference[] = tableInstance.tableReferences;
		const linkReferenceButton: ToolbarItem = new ToolbarItem(ButtonNames.linkReferenceButton);
		linkReferenceButton.setTitle(translate('LINKS'));
		linkReferenceButton.setIcon('link');
		linkReferenceButton.setWidget('dxDropDownButton');
		linkReferenceButton.mergeOptions({
			items: tableReferences,
			dropDownOptions: { minWidth: 350 },
			onItemClick: toolbarPanelButtonEvents.linkReferenceTableButtonClickHandler(),
			itemTemplate: (data) => translate(data.name),
		});

		return linkReferenceButton;
	}

	static buildRecalculateReportDataButton(toolbarPanelButtonEvents) {
		const recalculateReportDataButton: ToolbarItem = new ToolbarItem(ButtonNames.executeTableUpdateButton);
		recalculateReportDataButton.setTitle(translate('UPDATE'));
		recalculateReportDataButton.setIcon('UpdateIcon');
		recalculateReportDataButton.setWidget('dxButton');

		recalculateReportDataButton.setClickHandler(toolbarPanelButtonEvents.recalculateReportDataClickHandler());

		return recalculateReportDataButton;
	}
	static buildGoToOldDBEButton(toolbarPanelButtonEvents) {
		const recalculateReportDataButton: ToolbarItem = new ToolbarItem(ButtonNames.goToOldDBE);
		recalculateReportDataButton.setTitle(translate('BACK_TO_OLD_DBE'));
		recalculateReportDataButton.setIcon('return');
		recalculateReportDataButton.setWidget('dxButton');

		recalculateReportDataButton.setClickHandler(toolbarPanelButtonEvents.goToOldDBEClickHandler());

		return recalculateReportDataButton;
	}
}

export default ToolbarItemBuilder;
