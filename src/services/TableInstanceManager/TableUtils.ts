/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {
	ChartDescription,
	DbeTable,
	FilterGroup,
	FilterSetting,
	HiddenColumnSetting,
	InputParameterModel,
	MasterDetailsInfo,
	Metadata,
	SortSetting,
	TableInfo,
	TableReference,
} from '../../models/Classes';
import translate from '../../i18n/localization';
import TableRelatedUserParameters from '../../models/Classes/TableRelatedUserParameters';
import { TabTitle } from '../../models/Enums';
import RightsHelper from '../../helpers/RightsHelper';
import { WarehouseUiType } from '../../models/Enums/Table';
import DxGridSettings from '../../helpers/DxGridSettingsService';

class TableUtils extends RightsHelper {
	constructor(metadata: Metadata) {
		super(metadata);
	}

	public get table(): DbeTable {
		return this.metadata.getTable();
	}

	public get warehouseUiType(): WarehouseUiType {
		return this.metadata.warehouseUiType;
	}

	public get campaignId(): number {
		return this.metadata.campaignId;
	}

	public get childParentTables(): MasterDetailsInfo[] {
		return this.metadata.tableRelatedUserParameters.childParentTables || [];
	}

	public get filters(): FilterSetting[] {
		return this.metadata.tableRelatedUserParameters.filters || null;
	}

	public get hiddenColumnSettings(): HiddenColumnSetting[] {
		return this.metadata.tableRelatedUserParameters.hiddenColumnSettings || null;
	}

	public get sortOrderSettings(): SortSetting[] {
		return this.metadata.tableRelatedUserParameters.sortOrderSettings || null;
	}

	public get tabTitle(): TabTitle {
		return this.metadata.tableRelatedUserParameters.tabTitle || null;
	}

	public get selectedFilter(): FilterSetting {
		return this.metadata.tableRelatedUserParameters.selectedFilter || null;
	}

	public get selectedSortOrder(): SortSetting {
		return this.metadata.tableRelatedUserParameters.selectedSortOrder || null;
	}

	public get selectedHiddenColumnFilter(): HiddenColumnSetting {
		return this.metadata.tableRelatedUserParameters.selectedHiddenColumnFilter || null;
	}

	public get warehouseId() {
		return this.metadata.getWarehouseIdHolder().warehouseId;
	}

	public get defaultFilter(): FilterSetting {
		return this.tableRelatedUserParameters.defaultFilter || null;
	}

	public get defaultSortOrder(): SortSetting {
		return this.tableRelatedUserParameters.defaultSortOrder || null;
	}

	public get defaultHiddenColumn(): HiddenColumnSetting {
		return this.tableRelatedUserParameters.defaultHiddenColumnFilter || null;
	}

	public get urlFilter(): FilterGroup {
		return this.metadata.urlFilter ? FilterGroup.create(this.metadata.urlFilter) : null;
	}

	public get pageSize(): number {
		return this.metadata.tableRelatedUserParameters.pageSize || 0;
	}

	public get isAutoRefresh(): boolean {
		return this.metadata.tableRelatedUserParameters.isAutoRefresh || false;
	}

	public get lastSelectionMode(): boolean {
		return this.metadata.tableRelatedUserParameters.lastSelectionMode || false;
	}

	public get intervalInSeconds(): number {
		return this.metadata.tableRelatedUserParameters.intervalInSeconds || 0;
	}

	public get tableRelatedUserParameters(): TableRelatedUserParameters {
		return this.metadata.tableRelatedUserParameters;
	}

	public get isTableEditable(): boolean {
		return this.table.editable;
	}

	public get isExistTableReferences(): boolean {
		return this.tableRelatedUserParameters.tableReference.notEmpty();
	}

	public get tableReferences(): TableReference[] {
		return this.tableRelatedUserParameters.tableReference;
	}

	public get tableRelatedCharts(): ChartDescription[] {
		return this.tableRelatedUserParameters.charts;
	}

	public get isExistTableRelatedCharts(): boolean {
		return this.tableRelatedUserParameters.charts.notEmpty();
	}

	public getReportInputParameters(): InputParameterModel[] {
		return this.metadata.reportInputParameters;
	}

	public getName(): string {
		return this.table.getName();
	}

	public getTableName(): string {
		return this.table.getTableName();
	}

	public getSourceWarehouseName(): string {
		return this.metadata.sourceWarehouseName;
	}

	public getTableNameForTitle() {
		return this.table.isNamePinned() ? this.table.getName() : translate(this.table.getName());
	}

	public getTabTitle(titleTemplate = this.tabTitle): string {
		const tableName = this.getTableNameForTitle();
		const layoutName = this.getSourceWarehouseName();
		if (!layoutName) {
			return `${tableName} - DBE - Web to Modeling & Optimization`;
		}
		if (titleTemplate === TabTitle.TABLE_NAME_LAYOUT_NAME) {
			return `${tableName} - ${layoutName} - DBE - Web to Modeling & Optimization`;
		} else {
			return `${layoutName} - ${tableName} - DBE - Web to Modeling & Optimization`;
		}
	}

	public getTableTitle(): string {
		const tableName = this.getTableNameForTitle();
		if (this.getSourceWarehouseName() == null) {
			return `'${tableName}'`;
		} else {
			return translate('$_FOR_LAYOUT_$', `'${tableName}'`, `'${this.getSourceWarehouseName()}'`);
		}
	}

	public getTables(parentOrChildTable: boolean): MasterDetailsInfo[] {
		return this.childParentTables.filter(({ isChild }) => isChild === parentOrChildTable);
	}

	public getAllVisibleTables(): TableInfo[] {
		return this.tableRelatedUserParameters.allVisibleTables;
	}

	public getFilters(): FilterSetting[] {
		return this.filters.filter((filter) => !filter.isOtherFilter) || [];
	}

	public getOtherFilters(): FilterSetting[] {
		return this.filters.filter((filter) => filter.isOtherFilter) || [];
	}

	public getHiddenColumns(): HiddenColumnSetting[] {
		return this.hiddenColumnSettings.filter((filter) => !filter.isOtherFilter) || [];
	}

	public getOtherHiddenColumn(): HiddenColumnSetting[] {
		return this.hiddenColumnSettings.filter((filter) => filter.isOtherFilter) || [];
	}

	public getSortOrderSettings(): SortSetting[] {
		return this.sortOrderSettings.filter((filter) => !filter.isOtherFilter) || [];
	}

	public getOtherSortOrderSettings(): SortSetting[] {
		return this.sortOrderSettings.filter((filter) => filter.isOtherFilter) || [];
	}

	public isFilterNameExistsFilters(filterName: string): boolean {
		return this.filters.map(({ settingName }) => settingName).includes(filterName);
	}

	public isFilterNameExistsHiddenColumn(filterName: string): boolean {
		return this.hiddenColumnSettings.map(({ settingName }) => settingName).includes(filterName);
	}

	public isFilterNameExistsSortOrderSettings(filterName: string) {
		return this.sortOrderSettings.map(({ settingName }) => settingName).includes(filterName);
	}

	public getExportedDataSuggestedName() {
		const warehouseId = this.warehouseId;
		const tableName = this.table.getName().toLowerCase();
		return warehouseId ? `${tableName}-${warehouseId}.csv` : `${tableName}.csv`;
	}

	public checkIfColumnsFiltered(): boolean {
		return this.getDxGridCommonSettings().checkIfColumnsFiltered();
	}
	public getDxGridCommonSettings(): DxGridSettings {
		return this.metadata.tableRelatedUserParameters.getDxGridCommonSettings();
	}
}

export default TableUtils;
