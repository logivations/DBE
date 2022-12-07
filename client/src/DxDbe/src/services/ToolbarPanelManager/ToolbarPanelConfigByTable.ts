/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import TableInstance from '../TableInstanceManager/TableInstance';

class ToolbarPanelConfigByTable {
	private tableInstance: TableInstance;

	public isCloneRowsButtonVisible: boolean;
	public isDeleteRowsButtonVisible: boolean;
	public isTableActionsMenuButtonVisible: boolean;
	public isExportButtonVisible: boolean;
	public isImportButtonVisible: boolean;
	public isMassUpdateButtonVisible: boolean;
	public isCompareButtonVisible: boolean;
	public isRecalculateReportDataButtonVisible: boolean;
	public isMergeButtonVisible: boolean;
	public isUserHelpLinkVisible: boolean;
	public isViewChartMenuButtonVisible: boolean;
	public isLinkReferenceButton: boolean;

	static build(tableInstance) {
		return new ToolbarPanelConfigByTable(tableInstance)
			.setIsCloneRowsButtonVisible()
			.setIsDeleteRowsButtonVisible()
			.setIsTableActionsMenuButtonVisible()
			.setIsExportButtonVisible()
			.setIsImportButtonVisible()
			.setIsMassUpdateButtonVisible()
			.setIsCompareButtonVisible()
			.setIsRecalculateReportDataButtonVisible()
			.setIsMergeButtonVisible()
			.setIsUserHelpLinkVisible()
			.setIsViewChartMenuButtonVisible()
			.setIsLinkReferenceButton();
	}
	constructor(tableInstance) {
		this.tableInstance = tableInstance;
	}

	private setIsCloneRowsButtonVisible(): ToolbarPanelConfigByTable {
		this.isCloneRowsButtonVisible = this.tableInstance.canAddRecords();
		return this;
	}

	private setIsDeleteRowsButtonVisible(): ToolbarPanelConfigByTable {
		this.isDeleteRowsButtonVisible = this.tableInstance.canDelete();
		return this;
	}

	private setIsTableActionsMenuButtonVisible(): ToolbarPanelConfigByTable {
		this.isTableActionsMenuButtonVisible = this.tableInstance.canExecuteTableAction();
		return this;
	}

	private setIsExportButtonVisible(): ToolbarPanelConfigByTable {
		this.isExportButtonVisible = this.tableInstance.canExport();
		return this;
	}

	private setIsImportButtonVisible(): ToolbarPanelConfigByTable {
		this.isImportButtonVisible = this.tableInstance.canImport();
		return this;
	}

	private setIsMassUpdateButtonVisible(): ToolbarPanelConfigByTable {
		this.isMassUpdateButtonVisible = this.tableInstance.canMassUpdate();
		return this;
	}

	private setIsCompareButtonVisible(): ToolbarPanelConfigByTable {
		this.isCompareButtonVisible = this.tableInstance.canCompareTable();
		return this;
	}

	private setIsRecalculateReportDataButtonVisible(): ToolbarPanelConfigByTable {
		this.isRecalculateReportDataButtonVisible = this.tableInstance.canExecuteUpdateTable();
		return this;
	}

	private setIsMergeButtonVisible(): ToolbarPanelConfigByTable {
		this.isMergeButtonVisible = this.tableInstance.canMergeRows();
		return this;
	}

	private setIsUserHelpLinkVisible(): ToolbarPanelConfigByTable {
		this.isUserHelpLinkVisible = this.tableInstance.hasHelpButton();
		return this;
	}

	private setIsViewChartMenuButtonVisible(): ToolbarPanelConfigByTable {
		this.isViewChartMenuButtonVisible = this.tableInstance.isExistTableRelatedCharts;
		return this;
	}

	private setIsLinkReferenceButton(): ToolbarPanelConfigByTable {
		this.isLinkReferenceButton = this.tableInstance.isExistTableReferences;
		return this;
	}
}

export default ToolbarPanelConfigByTable;
