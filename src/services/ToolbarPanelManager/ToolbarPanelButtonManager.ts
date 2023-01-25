/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { ToolbarPanelConfig } from './ToolbarPanelConfig';
import ToolbarItem from './ToolbarItem';
import ToolbarItemBuilder from './ToolbarItemBuilder';
import TableInstance from '../TableInstanceManager/TableInstance';
import ToolbarPanelButtonEvents from './ToolbarPanelButtonEvents';
import TFunction from '../../models/Types/Types';
import ToolbarPanelConfigByTable from './ToolbarPanelConfigByTable';
import KeyboardProcessor from '../../helpers/KeyboardProcessor';

class ToolbarPanelButtonManager extends KeyboardProcessor {
	public static instances: { [key: string]: ToolbarPanelButtonManager } = {};

	public static instance: ToolbarPanelButtonManager;
	public dbeDxGridRef: any;
	public toolbarButtons: { [key: string]: ToolbarItem } = {};
	public actions: { [key: string]: TFunction } = {};
	public toolbarPanelButtonEvents: ToolbarPanelButtonEvents = null;

	constructor(private tableInstance: TableInstance, private tableType: string) {
		super(tableType);
		if (!ToolbarPanelButtonManager.instances[tableType]) {
			this.getDbeDxGridInstance = this.getDbeDxGridInstance.bind(this);
			ToolbarPanelButtonManager.instances[tableType] = this;
			return this;
		}
		return ToolbarPanelButtonManager.instances[tableType];
	}

	public setDbeDxGridRef(dbeDxGridRef) {
		this.dbeDxGridRef = dbeDxGridRef;
	}

	public getDbeDxGridInstance() {
		return this.dbeDxGridRef.current && this.dbeDxGridRef.current.instance;
	}

	public buildToolbarButtons() {
		this.toolbarButtons.closeScreenBuilderTableButton = ToolbarItemBuilder.buildCloseScreenBuilderTable(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.toggleSelectionButton = ToolbarItemBuilder.buildToggleSelectionButton(
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.reloadButton = ToolbarItemBuilder.buildReloadButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.tableActionsMenuButton = ToolbarItemBuilder.buildTableActionsMenuButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.executeTableUpdateButton = ToolbarItemBuilder.buildExecuteTableUpdateButton();
		this.toolbarButtons.getLinkButton = ToolbarItemBuilder.buildGetLinkButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.deleteRowsButton = ToolbarItemBuilder.buildDeleteRowsButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.addRowButton = ToolbarItemBuilder.buildAddRowButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.cloneRowsButton = ToolbarItemBuilder.buildCloneRowsButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.saveRowsButton = ToolbarItemBuilder.buildSaveRowsButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.saveForeignKeyButton = ToolbarItemBuilder.buildSaveForeignKeyButton(
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.massUpdateButton = ToolbarItemBuilder.buildMassUpdateButton(
			this.toolbarPanelButtonEvents,
			this.tableType,
		);
		this.toolbarButtons.exportButton = ToolbarItemBuilder.buildExportButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.importButton = ToolbarItemBuilder.buildImportButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.settingsButton = ToolbarItemBuilder.buildSettingsButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.pagerPanel = ToolbarItemBuilder.buildPagerPanel();
		this.toolbarButtons.compareButton = ToolbarItemBuilder.buildCompareButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.masterButton = ToolbarItemBuilder.buildMasterButton();
		this.toolbarButtons.helpButton = ToolbarItemBuilder.buildHelpButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.linksMenuButton = ToolbarItemBuilder.buildLinksMenuButton();
		this.toolbarButtons.filterSettingButton = ToolbarItemBuilder.buildFilterSettingButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
			this.setComponentInstance,
		);
		this.toolbarButtons.hiddenColumnSettingSplitMenuButton =
			ToolbarItemBuilder.buildHiddenColumnSettingSplitMenuButton(
				this.tableInstance,
				this.toolbarPanelButtonEvents,
			);
		this.toolbarButtons.groupingSettingSplitMenuButton = ToolbarItemBuilder.buildGroupingSettingSplitMenuButton();
		this.toolbarButtons.tableSortButton = ToolbarItemBuilder.buildTableSortButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.viewChartMenuButton = ToolbarItemBuilder.buildViewChartMenuButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.childRecordsMenuButton = ToolbarItemBuilder.buildChildRecordsMenuButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.parentRecordsMenuButton = ToolbarItemBuilder.buildParentRecordsMenuButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.synchronizeChildButton = ToolbarItemBuilder.buildSynchronizeChildButton();
		this.toolbarButtons.mergeButton = ToolbarItemBuilder.buildMergeButton(this.toolbarPanelButtonEvents);
		this.toolbarButtons.screenBuilderButton = ToolbarItemBuilder.buildScreenBuilderButton(
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.columnChooserButton = ToolbarItemBuilder.buildColumnChooserButton(
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.linkReferenceButton = ToolbarItemBuilder.buildLinkReferenceButton(
			this.tableInstance,
			this.toolbarPanelButtonEvents,
		);

		this.toolbarButtons.recalculateReportDataButton = ToolbarItemBuilder.buildRecalculateReportDataButton(
			this.toolbarPanelButtonEvents,
		);
		this.toolbarButtons.goToOldDBEButton = ToolbarItemBuilder.buildGoToOldDBEButton(this.toolbarPanelButtonEvents);

		return this;
	}

	public configureButtonsVisibility(
		toolbarPanelConfig: ToolbarPanelConfig,
		toolbarPanelConfigByTable: ToolbarPanelConfigByTable,
	) {
		this.toolbarButtons.closeScreenBuilderTableButton.setVisible(
			toolbarPanelConfig.isCloseScreenBuilderTableButtonVisible,
		);
		this.toolbarButtons.toggleSelectionButton.setVisible(toolbarPanelConfig.isToggleSelectionButton);
		this.toolbarButtons.reloadButton.setVisible(toolbarPanelConfig.isReloadButtonVisible);
		this.toolbarButtons.executeTableUpdateButton.setVisible(toolbarPanelConfig.isExecuteTableUpdateButtonVisible);
		this.toolbarButtons.getLinkButton.setVisible(toolbarPanelConfig.isGetLinkButtonVisible);
		this.toolbarButtons.deleteRowsButton.setVisible(
			toolbarPanelConfig.isDeleteRowsButtonVisible && toolbarPanelConfigByTable.isDeleteRowsButtonVisible,
		);
		this.toolbarButtons.addRowButton.setVisible(
			toolbarPanelConfig.isCloneRowsButtonVisible && toolbarPanelConfigByTable.isCloneRowsButtonVisible,
		);
		this.toolbarButtons.cloneRowsButton.setVisible(
			toolbarPanelConfig.isCloneRowsButtonVisible && toolbarPanelConfigByTable.isCloneRowsButtonVisible,
		);
		this.toolbarButtons.saveRowsButton.setVisible(toolbarPanelConfig.isSaveRowsButtonVisible);
		this.toolbarButtons.saveForeignKeyButton.setVisible(toolbarPanelConfig.isSaveForeignKeyButtonVisible);
		this.toolbarButtons.massUpdateButton.setVisible(
			toolbarPanelConfig.isMassUpdateButtonVisible && toolbarPanelConfigByTable.isMassUpdateButtonVisible,
		);
		this.toolbarButtons.exportButton.setVisible(
			toolbarPanelConfig.isExportButtonVisible && toolbarPanelConfigByTable.isExportButtonVisible,
		);
		this.toolbarButtons.importButton.setVisible(
			toolbarPanelConfig.isImportButtonVisible && toolbarPanelConfigByTable.isImportButtonVisible,
		);
		this.toolbarButtons.settingsButton.setVisible(toolbarPanelConfig.isSettingsButtonVisible);
		this.toolbarButtons.pagerPanel.setVisible(toolbarPanelConfig.isPagerPanelVisible);
		this.toolbarButtons.compareButton.setVisible(
			toolbarPanelConfig.isCompareButtonVisible && toolbarPanelConfigByTable.isCompareButtonVisible,
		);
		this.toolbarButtons.helpButton.setVisible(
			toolbarPanelConfig.isUserHelpLinkVisible && toolbarPanelConfigByTable.isUserHelpLinkVisible,
		);
		this.toolbarButtons.linksMenuButton.setVisible(toolbarPanelConfig.isLinksMenuButtonVisible);
		this.toolbarButtons.tableActionsMenuButton.setVisible(
			toolbarPanelConfig.isTableActionsMenuButtonVisible &&
				toolbarPanelConfigByTable.isTableActionsMenuButtonVisible,
		);
		this.toolbarButtons.filterSettingButton.setVisible(toolbarPanelConfig.isFilterSettingButtonVisible);
		this.toolbarButtons.hiddenColumnSettingSplitMenuButton.setVisible(
			toolbarPanelConfig.isHiddenColumnSettingSplitMenuButtonVisible,
		);
		this.toolbarButtons.groupingSettingSplitMenuButton.setVisible(toolbarPanelConfig.isGroupingFilterVisible);
		this.toolbarButtons.tableSortButton.setVisible(toolbarPanelConfig.isTableSortButtonVisible);
		this.toolbarButtons.childRecordsMenuButton.setVisible(toolbarPanelConfig.isChildRecordsMenuButtonVisible);
		this.toolbarButtons.parentRecordsMenuButton.setVisible(toolbarPanelConfig.isParentRecordsMenuButtonVisible);
		this.toolbarButtons.viewChartMenuButton.setVisible(
			toolbarPanelConfig.isViewChartMenuButtonVisible && toolbarPanelConfigByTable.isViewChartMenuButtonVisible,
		);
		this.toolbarButtons.mergeButton.setVisible(
			toolbarPanelConfig.isMergeButtonVisible && toolbarPanelConfigByTable.isMergeButtonVisible,
		);
		this.toolbarButtons.screenBuilderButton.setVisible(toolbarPanelConfig.isScreenBuilderVisible);
		this.toolbarButtons.columnChooserButton.setVisible(toolbarPanelConfig.isColumnChooserVisible);
		this.toolbarButtons.linkReferenceButton.setVisible(
			toolbarPanelConfig.isLinkReferenceButton && toolbarPanelConfigByTable.isLinkReferenceButton,
		);
		this.toolbarButtons.recalculateReportDataButton.setVisible(
			toolbarPanelConfig.isRecalculateReportDataButtonVisible &&
				toolbarPanelConfigByTable.isRecalculateReportDataButtonVisible,
		);
		this.toolbarButtons.goToOldDBEButton.setVisible(true);

		return this;
	}

	public registerShortcuts() {
		this.getButtonsAsArray().forEach((button: ToolbarItem) => {
			button.getShortcuts().forEach((shortcut) => {
				this.registerShortcut(shortcut, button.getShortcutHandler(), button.buttonName);
			});
		});

		return this;
	}

	public setActions(actionName, action): ToolbarPanelButtonManager {
		this.actions[actionName] = action;
		return this;
	}

	public getButtonsAsArray(): ToolbarItem[] {
		return [
			this.toolbarButtons.closeScreenBuilderTableButton,
			this.toolbarButtons.toggleSelectionButton,
			this.toolbarButtons.reloadButton,
			this.toolbarButtons.executeTableUpdateButton,
			this.toolbarButtons.getLinkButton,
			this.toolbarButtons.deleteRowsButton,
			this.toolbarButtons.addRowButton,
			this.toolbarButtons.cloneRowsButton,
			this.toolbarButtons.saveRowsButton,
			this.toolbarButtons.saveForeignKeyButton,
			this.toolbarButtons.massUpdateButton,
			this.toolbarButtons.exportButton,
			this.toolbarButtons.importButton,
			this.toolbarButtons.settingsButton,
			this.toolbarButtons.pagerPanel,
			this.toolbarButtons.compareButton,
			this.toolbarButtons.masterButton,
			this.toolbarButtons.helpButton,
			this.toolbarButtons.linksMenuButton,
			this.toolbarButtons.tableActionsMenuButton,
			this.toolbarButtons.filterSettingButton,
			this.toolbarButtons.hiddenColumnSettingSplitMenuButton,
			this.toolbarButtons.groupingSettingSplitMenuButton,
			this.toolbarButtons.tableSortButton,
			this.toolbarButtons.viewChartMenuButton,
			this.toolbarButtons.childRecordsMenuButton,
			this.toolbarButtons.parentRecordsMenuButton,
			this.toolbarButtons.synchronizeChildButton,
			this.toolbarButtons.mergeButton,
			this.toolbarButtons.screenBuilderButton,
			this.toolbarButtons.columnChooserButton,
			this.toolbarButtons.linkReferenceButton,
			this.toolbarButtons.recalculateReportDataButton,
			this.toolbarButtons.goToOldDBEButton,
		];
	}

	public getVisibleButtons(): ToolbarItem[] {
		return this.getButtonsAsArray().filter((button) => button.isVisible());
	}

	public get dispatchForToolbar() {
		return this.actions['toolbarPanelDispatch'];
	}

	public createToolbarBarEvents(): ToolbarPanelButtonManager {
		this.toolbarPanelButtonEvents = new ToolbarPanelButtonEvents(
			this.dbeDxGridRef,
			this.actions,
			this.tableInstance,
		);
		return this;
	}
}

export default ToolbarPanelButtonManager;
