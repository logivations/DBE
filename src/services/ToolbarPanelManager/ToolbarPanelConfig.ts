/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class ToolbarPanelConfigBuilder {
	private isToggleSelectionButton = false;
	private isReloadButtonVisible = false;
	private isExecuteTableUpdateButtonVisible = false;
	private isGetLinkButtonVisible = false;
	private isDeleteRowsButtonVisible = false;
	private isCloneRowsButtonVisible = false;
	private isSaveRowsButtonVisible = false;
	private isSaveForeignKeyButtonVisible = false;
	private isFilterSettingButtonVisible = false;
	private isHiddenColumnSettingSplitMenuButtonVisible = false;
	private isTableSortButtonVisible = false;
	private isChildRecordsMenuButtonVisible = false;
	private isParentRecordsMenuButtonVisible = false;
	private isMassUpdateButtonVisible = false;
	private isExportButtonVisible = false;
	private isImportButtonVisible = false;
	private isSettingsButtonVisible = false;
	private isPagerPanelVisible = false;
	private isPagerTextBoxVisible = false;
	private isCompareButtonVisible = false;
	private isTableActionsMenuButtonVisible = false;
	private isViewChartMenuButtonVisible = false;
	private isLinksMenuButtonVisible = false;
	private isUserHelpLinkVisible = false;
	private isGroupingFilterVisible = false;
	private isMergeButtonVisible = false;
	private isScreenBuilderVisible = false;
	private isColumnChooserVisible = false;
	private isCloseScreenBuilderTableButtonVisible = false;
	private isLinkReferenceButton = false;
	private isRecalculateReportDataButtonVisible = false;

	public setIsReloadButtonVisible(isReloadButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isReloadButtonVisible = isReloadButtonVisible;
		return this;
	}

	public setIsToggleSelectionButton(isToggleSelectionButton: boolean): ToolbarPanelConfigBuilder {
		this.isToggleSelectionButton = isToggleSelectionButton;
		return this;
	}

	public setIsExecuteTableUpdateButtonVisible(isExecuteTableUpdateButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isExecuteTableUpdateButtonVisible = isExecuteTableUpdateButtonVisible;
		return this;
	}

	public setIsGetLinkButtonVisible(isGetLinkButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isGetLinkButtonVisible = isGetLinkButtonVisible;
		return this;
	}

	public setIsDeleteRowsButtonVisible(isDeleteRowsButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isDeleteRowsButtonVisible = isDeleteRowsButtonVisible;
		return this;
	}

	public setIsCloneRowsButtonVisible(isCloneRowsButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isCloneRowsButtonVisible = isCloneRowsButtonVisible;
		return this;
	}

	public setIsSaveForeignKeyButtonVisible(isSaveForeignKeyButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isSaveForeignKeyButtonVisible = isSaveForeignKeyButtonVisible;
		return this;
	}

	public setIsSaveRowsButtonVisible(isSaveRowsButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isSaveRowsButtonVisible = isSaveRowsButtonVisible;
		return this;
	}

	public setIsFilterSettingButtonVisible(isFilterSettingButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isFilterSettingButtonVisible = isFilterSettingButtonVisible;
		return this;
	}

	public setIsHiddenColumnSettingSplitMenuButtonVisible(
		isHiddenColumnSettingSplitMenuButtonVisible: boolean,
	): ToolbarPanelConfigBuilder {
		this.isHiddenColumnSettingSplitMenuButtonVisible = isHiddenColumnSettingSplitMenuButtonVisible;
		return this;
	}

	public setIsTableSortButtonVisible(isTableSortButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isTableSortButtonVisible = isTableSortButtonVisible;
		return this;
	}

	public setIsChildRecordsMenuButtonVisible(isChildRecordsMenuButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isChildRecordsMenuButtonVisible = isChildRecordsMenuButtonVisible;
		return this;
	}

	public setIsParentRecordsMenuButtonVisible(isParentRecordsMenuButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isParentRecordsMenuButtonVisible = isParentRecordsMenuButtonVisible;
		return this;
	}

	public setIsMassUpdateButtonVisible(isMassUpdateButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isMassUpdateButtonVisible = isMassUpdateButtonVisible;
		return this;
	}

	public setIsExportButtonVisible(isExportButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isExportButtonVisible = isExportButtonVisible;
		return this;
	}

	public setIsImportButtonVisible(isImportButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isImportButtonVisible = isImportButtonVisible;
		return this;
	}

	public setIsSettingsButtonVisible(isSettingsButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isSettingsButtonVisible = isSettingsButtonVisible;
		return this;
	}

	public setIsPagerPanelVisible(isPagerPanelVisible: boolean): ToolbarPanelConfigBuilder {
		this.isPagerPanelVisible = isPagerPanelVisible;
		return this;
	}

	public setIsPagerTextBoxVisible(isPagerTextBoxVisible: boolean): ToolbarPanelConfigBuilder {
		this.isPagerTextBoxVisible = isPagerTextBoxVisible;
		return this;
	}

	public setIsCompareButtonVisible(isCompareButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isCompareButtonVisible = isCompareButtonVisible;
		return this;
	}

	public setIsTableActionsMenuButtonVisible(isTableActionsMenuButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isTableActionsMenuButtonVisible = isTableActionsMenuButtonVisible;
		return this;
	}

	public setIsViewChartMenuButtonVisible(isViewChartMenuButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isViewChartMenuButtonVisible = isViewChartMenuButtonVisible;
		return this;
	}

	public setIsLinksMenuButtonVisible(isLinksMenuButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isLinksMenuButtonVisible = isLinksMenuButtonVisible;
		return this;
	}

	public setIsUserHelpLinkVisible(isUserHelpLinkVisible: boolean): ToolbarPanelConfigBuilder {
		this.isUserHelpLinkVisible = isUserHelpLinkVisible;
		return this;
	}

	public setGroupingFilterVisible(groupingFilterVisible: boolean): ToolbarPanelConfigBuilder {
		this.isGroupingFilterVisible = groupingFilterVisible;
		return this;
	}

	public setMergeButtonVisible(mergeButtonVisible: boolean): ToolbarPanelConfigBuilder {
		this.isMergeButtonVisible = mergeButtonVisible;
		return this;
	}

	public setScreenBuilderVisible(screenBuilderVisible) {
		this.isScreenBuilderVisible = screenBuilderVisible;
		return this;
	}

	public setColumnChooserVisible(columnChooserVisible) {
		this.isColumnChooserVisible = columnChooserVisible;
		return this;
	}

	public setCloseScreenBuilderTableButtonVisible(closeScreenBuilderTableButtonVisible) {
		this.isCloseScreenBuilderTableButtonVisible = closeScreenBuilderTableButtonVisible;
		return this;
	}

	public setIsLinkReferenceButton(isLinkReferenceButton) {
		this.isLinkReferenceButton = isLinkReferenceButton;
		return this;
	}

	public setIsRecalculateReportDataButtonVisible(isRecalculateReportDataButtonVisible) {
		this.isRecalculateReportDataButtonVisible = isRecalculateReportDataButtonVisible;
		return this;
	}

	public build(): ToolbarPanelConfig {
		return new ToolbarPanelConfig(
			this.isToggleSelectionButton,
			this.isReloadButtonVisible,
			this.isExecuteTableUpdateButtonVisible,
			this.isGetLinkButtonVisible,
			this.isDeleteRowsButtonVisible,
			this.isCloneRowsButtonVisible,
			this.isSaveRowsButtonVisible,
			this.isSaveForeignKeyButtonVisible,
			this.isFilterSettingButtonVisible,
			this.isHiddenColumnSettingSplitMenuButtonVisible,
			this.isTableSortButtonVisible,
			this.isChildRecordsMenuButtonVisible,
			this.isMassUpdateButtonVisible,
			this.isExportButtonVisible,
			this.isImportButtonVisible,
			this.isSettingsButtonVisible,
			this.isPagerPanelVisible,
			this.isPagerTextBoxVisible,
			this.isCompareButtonVisible,
			this.isTableActionsMenuButtonVisible,
			this.isViewChartMenuButtonVisible,
			this.isLinksMenuButtonVisible,
			this.isUserHelpLinkVisible,
			this.isParentRecordsMenuButtonVisible,
			this.isMergeButtonVisible,
			this.isGroupingFilterVisible,
			this.isScreenBuilderVisible,
			this.isColumnChooserVisible,
			this.isCloseScreenBuilderTableButtonVisible,
			this.isLinkReferenceButton,
			this.isRecalculateReportDataButtonVisible,
		);
	}
}

export class ToolbarPanelConfig {
	constructor(
		public isToggleSelectionButton: boolean,
		public isReloadButtonVisible: boolean,
		public isExecuteTableUpdateButtonVisible: boolean,
		public isGetLinkButtonVisible: boolean,
		public isDeleteRowsButtonVisible: boolean,
		public isCloneRowsButtonVisible: boolean,
		public isSaveRowsButtonVisible: boolean,
		public isSaveForeignKeyButtonVisible: boolean,
		public isFilterSettingButtonVisible: boolean,
		public isHiddenColumnSettingSplitMenuButtonVisible: boolean,
		public isTableSortButtonVisible: boolean,
		public isChildRecordsMenuButtonVisible: boolean,
		public isMassUpdateButtonVisible: boolean,
		public isExportButtonVisible: boolean,
		public isImportButtonVisible: boolean,
		public isSettingsButtonVisible: boolean,
		public isPagerPanelVisible: boolean,
		public isPagerTextBoxVisible: boolean,
		public isCompareButtonVisible: boolean,
		public isTableActionsMenuButtonVisible: boolean,
		public isViewChartMenuButtonVisible: boolean,
		public isLinksMenuButtonVisible: boolean,
		public isUserHelpLinkVisible: boolean,
		public isParentRecordsMenuButtonVisible: boolean,
		public isMergeButtonVisible: boolean,
		public isGroupingFilterVisible: boolean,
		public isScreenBuilderVisible: boolean,
		public isColumnChooserVisible: boolean,
		public isCloseScreenBuilderTableButtonVisible: boolean,
		public isLinkReferenceButton: boolean,
		public isRecalculateReportDataButtonVisible: boolean,
	) {}
}

export default ToolbarPanelConfigBuilder;
