/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ToolbarPanelConfigBuilder, { ToolbarPanelConfig } from './ToolbarPanelConfig';
import TableInstanceManager from '../TableInstanceManager/TableInstanceManager';

class ToolbarPanelView {
	public static getToolbarPanelButtonsConfig(tableName: string, saveButtonVisibility: boolean) {
		switch (tableName) {
			case TableInstanceManager.ORIGINAL_TABLE:
				return ToolbarPanelView.getMainViewToolbarPanelConfig();
			case TableInstanceManager.CLONE_ROW_IN_ORIGINAL_TABLE:
				return ToolbarPanelView.getCloneRowViewToolbarPanelConfig();
			case TableInstanceManager.SCREEN_BUILDER_TABLE:
				return ToolbarPanelView.getScreenBuilderTablesPanelConfig();
			case TableInstanceManager.FOREIGN_KEY_TABLE:
				return ToolbarPanelView.getForeignKeyToolbarPanelConfig(saveButtonVisibility);
			case TableInstanceManager.COMPARE_TABLE_RESULT:
				return this.getCompareTableResultConfig();
			default:
				return ToolbarPanelView.getMainViewToolbarPanelConfig();
		}
	}

	private static getMainViewToolbarPanelConfig(): ToolbarPanelConfig {
		return new ToolbarPanelConfigBuilder()
			.setIsToggleSelectionButton(true)
			.setIsReloadButtonVisible(true)
			.setIsGetLinkButtonVisible(true)
			.setIsDeleteRowsButtonVisible(true)
			.setIsCloneRowsButtonVisible(true)
			.setIsTableActionsMenuButtonVisible(true)
			.setIsFilterSettingButtonVisible(true)
			.setIsHiddenColumnSettingSplitMenuButtonVisible(true)
			.setIsTableSortButtonVisible(true)
			.setIsChildRecordsMenuButtonVisible(true)
			.setIsParentRecordsMenuButtonVisible(true)
			.setIsMassUpdateButtonVisible(true)
			.setIsViewChartMenuButtonVisible(true)
			.setIsExportButtonVisible(true)
			.setIsCompareButtonVisible(true)
			.setIsImportButtonVisible(true)
			.setIsSettingsButtonVisible(true)
			.setScreenBuilderVisible(true)
			.setColumnChooserVisible(true)
			.setIsLinkReferenceButton(true)
			.setIsRecalculateReportDataButtonVisible(true)
			.setMergeButtonVisible(true)
			.setIsUserHelpLinkVisible(true)
			.build();
	}

	private static getForeignKeyToolbarPanelConfig(saveButtonVisibility): ToolbarPanelConfig {
		return new ToolbarPanelConfigBuilder()
			.setIsReloadButtonVisible(true)
			.setIsGetLinkButtonVisible(true)
			.setIsSaveForeignKeyButtonVisible(saveButtonVisibility)
			.setIsDeleteRowsButtonVisible(true)
			.setIsCloneRowsButtonVisible(true)
			.setIsFilterSettingButtonVisible(true)
			.setIsHiddenColumnSettingSplitMenuButtonVisible(true)
			.setIsTableSortButtonVisible(true)
			.setIsChildRecordsMenuButtonVisible(true)
			.setIsParentRecordsMenuButtonVisible(true)
			.setIsExportButtonVisible(true)
			.setIsImportButtonVisible(true)
			.setIsSettingsButtonVisible(true)
			.setColumnChooserVisible(true)
			.setIsLinkReferenceButton(true)
			.build();
	}

	private static getCloneRowViewToolbarPanelConfig(): ToolbarPanelConfig {
		return new ToolbarPanelConfigBuilder()
			.setIsSaveRowsButtonVisible(true)
			.setIsDeleteRowsButtonVisible(true)
			.setIsMassUpdateButtonVisible(true)
			.setIsToggleSelectionButton(true)
			.build();
	}

	private static getScreenBuilderTablesPanelConfig(): ToolbarPanelConfig {
		return new ToolbarPanelConfigBuilder()
			.setIsToggleSelectionButton(true)
			.setIsReloadButtonVisible(true)
			.setIsGetLinkButtonVisible(true)
			.setIsDeleteRowsButtonVisible(true)
			.setIsCloneRowsButtonVisible(true)
			.setIsTableActionsMenuButtonVisible(true)
			.setIsFilterSettingButtonVisible(true)
			.setIsHiddenColumnSettingSplitMenuButtonVisible(true)
			.setIsTableSortButtonVisible(true)
			.setIsChildRecordsMenuButtonVisible(true)
			.setIsParentRecordsMenuButtonVisible(true)
			.setIsMassUpdateButtonVisible(true)
			.setIsExportButtonVisible(true)
			.setIsImportButtonVisible(true)
			.setIsSettingsButtonVisible(true)
			.setIsCompareButtonVisible(true)
			.setColumnChooserVisible(true)
			.setCloseScreenBuilderTableButtonVisible(true)
			.setIsLinkReferenceButton(true)
			.build();
	}

	private static getCompareTableResultConfig(): ToolbarPanelConfig {
		return new ToolbarPanelConfigBuilder()
			.setIsHiddenColumnSettingSplitMenuButtonVisible(true)
			.setIsTableSortButtonVisible(true)
			.setIsPagerPanelVisible(true)
			.setIsPagerTextBoxVisible(true)
			.build();
	}
}

export default ToolbarPanelView;
