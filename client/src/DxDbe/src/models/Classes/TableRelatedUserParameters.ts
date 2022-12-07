/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {
	ChartDescription,
	FilterGroup,
	FilterSetting,
	GroupingParameters,
	HiddenColumnSetting,
	MasterDetailsInfo,
	SortSetting,
	TableActionModel,
	TableInfo,
	TableReference,
} from './index';
import {TabTitle} from '../Enums';
import {DeleteSetting, ShareUnshareSetting, StoreSetting, UpdateSetting} from '../../decorators/SettingsDecorators';
import {EndPoints, StoreSettingKey} from '../../constants/SettingsConstants';
import DxGridSettings from '../../helpers/DxGridSettingsService';

class GroupingSetting {
    setting?: GroupingParameters[];
}

class TableRelatedUserParameters {
    public sortOrderSettings: SortSetting[] = [];
    public hiddenColumnSettings: HiddenColumnSetting[] = [];
    public filters: FilterSetting[] = [];
	public childParentTables: MasterDetailsInfo[] = [];
	public actions?: TableActionModel[];
	public charts: ChartDescription[];
	public allVisibleTables?: TableInfo[];
	public tableReference?: TableReference[];
	public dxGridCommonSettings: DxGridSettings;
	public defaultFilter?: FilterSetting;
	public defaultSortOrder?: SortSetting;
	public defaultHiddenColumnFilter?: HiddenColumnSetting;

	constructor(
		public groupingSettings?: GroupingSetting[],
		public tabTitle?: TabTitle,
		public pageSize?: number,
		public advancedFilterPageSize?: number,
		public intervalInSeconds?: number,
		public lastSelectionMode?: boolean,
		public selectedFilter?: FilterSetting,
		public mandatoryFilter?: FilterSetting,
		public quickFilter?: FilterSetting,
		public selectedHiddenColumnFilter?: HiddenColumnSetting,
		public selectedGroupingFilter?: GroupingSetting,
		public selectedSortOrder?: SortSetting,
		public dateFormatPattern?: string,
		public interactiveFilter?: FilterSetting,
		public isAutoRefresh?: boolean,
		public flexibleToolbarPanel?: boolean,
		public selectedFilterGroupSafe?: FilterGroup,
		public mandatoryFilterGroupSafe?: FilterGroup,
		public quickFilterGroupSafe?: FilterGroup,
		public tableName?: string
	) {}

	static create(tableRelatedUserParameters, tableName) {
		const userParameters = new TableRelatedUserParameters(
			tableRelatedUserParameters.groupingSettings,
			tableRelatedUserParameters.tabTitle,
			tableRelatedUserParameters.pageSize,
			tableRelatedUserParameters.advancedFilterPageSize,
			tableRelatedUserParameters.intervalInSeconds,
			tableRelatedUserParameters.lastSelectionMode,
			tableRelatedUserParameters.selectedFilter,
			tableRelatedUserParameters.mandatoryFilter,
			tableRelatedUserParameters.quickFilter,
			tableRelatedUserParameters.selectedHiddenColumnFilter,
			tableRelatedUserParameters.selectedGroupingFilter,
			tableRelatedUserParameters.selectedSortOrder,
			tableRelatedUserParameters.dateFormatPattern,
			tableRelatedUserParameters.interactiveFilter,
			tableRelatedUserParameters.isAutoRefresh,
			tableRelatedUserParameters.flexibleToolbarPanel,
			tableRelatedUserParameters.selectedFilterGroupSafe,
			tableRelatedUserParameters.mandatoryFilterGroupSafe,
			tableRelatedUserParameters.quickFilterGroupSafe,
			tableName
		);

		return userParameters
			.createActions(tableRelatedUserParameters.actions)
			.createCharts(tableRelatedUserParameters.charts)
			.createFilters(tableRelatedUserParameters.filters)
			.createTableReference(tableRelatedUserParameters.tableReference)
			.createSortOrderSettings(tableRelatedUserParameters.sortOrderSettings)
			.createHiddenColumnSettings(tableRelatedUserParameters.hiddenColumnSettings)
			.createChildParentTables(tableRelatedUserParameters.childParentTables)
			.createAllVisibleTables(tableRelatedUserParameters.allVisibleTables)
			.setDefaultFilter(tableRelatedUserParameters.defaultFilter)
			.setDefaultSortOrder(tableRelatedUserParameters.defaultSortOrder)
			.setDefaultHiddenColumnSetting(tableRelatedUserParameters.defaultHiddenColumnFilter)
			.createDxGridCommonSettings(tableRelatedUserParameters.dxGridCommonSettings);
	}

	public createFilters(filters) {
		this.filters = filters.map(FilterSetting.create);
		return this;
	}

	public createActions(actions) {
		this.actions = actions.map(TableActionModel.create);
		return this;
	}

	public createCharts(charts) {
		this.charts = charts.map(ChartDescription.create);
		return this;
	}

	public createTableReference(references) {
		this.tableReference = references.map(TableReference.create);
		return this;
	}

	public createHiddenColumnSettings(hiddenColumnSettings): TableRelatedUserParameters {
		this.hiddenColumnSettings = hiddenColumnSettings.map(HiddenColumnSetting.create);
		return this;
	}

	public createSortOrderSettings(sortOrderSettings: SortSetting[]): TableRelatedUserParameters {
		this.sortOrderSettings = sortOrderSettings.map(SortSetting.create);
		return this;
	}

	public createChildParentTables(childParentTables): TableRelatedUserParameters {
		this.childParentTables = childParentTables.map(MasterDetailsInfo.create);
		return this;
	}

	public createAllVisibleTables(allVisibleTables): TableRelatedUserParameters {
		this.allVisibleTables = allVisibleTables.map(TableInfo.create);
		return this;
	}

	public createDxGridCommonSettings(dxGridCommonSettings): TableRelatedUserParameters {
		this.dxGridCommonSettings = DxGridSettings.create(dxGridCommonSettings);
		return this;
	}

	public setSelectedFilter(selectedFilter: FilterSetting): TableRelatedUserParameters {
		this.selectedFilter = selectedFilter;
		return this;
	}

	public setSelectedSortOrder(selectedSortSetting: SortSetting): TableRelatedUserParameters {
		this.selectedSortOrder = selectedSortSetting;
		return this;
	}

	public setSelectedHiddenColumnFilter(hiddenColumnFilter: HiddenColumnSetting): TableRelatedUserParameters {
		this.selectedHiddenColumnFilter = hiddenColumnFilter;
		return this;
	}

	public setFilters(filters: FilterSetting[]): TableRelatedUserParameters {
		this.filters = filters;
		return this;
	}

	public setSortOrderSetting(sortOrderSettings: SortSetting[]): TableRelatedUserParameters {
		this.sortOrderSettings = sortOrderSettings;
		return this;
	}

	public setHiddenColumnSettings(hiddenColumnSettings: HiddenColumnSetting[]): TableRelatedUserParameters {
		this.hiddenColumnSettings = hiddenColumnSettings;
		return this;
	}

	public getDxGridCommonSettings(): DxGridSettings {
		return this.dxGridCommonSettings;
	}


	private getTheBiggestObjectId(settings): number {
		const setting =
			settings.length &&
			settings.reduce((prev: FilterSetting, current: FilterSetting) => {
				return prev.objectId > current.objectId ? prev : current;
			});
		return setting ? ++setting.objectId : 1;
	}

	public getLastSettingCount(items: (FilterSetting | HiddenColumnSetting | SortSetting)[]) {
		return items.reduce((count, filter) => {
			const name = filter.getSettingName();
			if (name.includes('Filter')) {
				const match = name.match(/([0-9]+)/g);
				return match ? (parseInt(match[0]) > count ? parseInt(match[0]) : count) : count;
			}
			return count;
		}, 0);
	}

	public getLastFilterSettingCount() {
		return this.getLastSettingCount(this.filters);
	}

	public getLastHiddenColumnSettingCount() {
		return this.getLastSettingCount(this.hiddenColumnSettings);
	}
	public getLastSortOrderSettingCount() {
		return this.getLastSettingCount(this.sortOrderSettings);
	}

	public getTheBiggestFilterObjectId(): number {
		return this.getTheBiggestObjectId(this.filters);
	}

	public getTheBiggestHiddenColumnObjectId(): number {
		return this.getTheBiggestObjectId(this.hiddenColumnSettings);
	}

	public getTheBiggestSortOrderObjectId(): number {
		return this.getTheBiggestObjectId(this.sortOrderSettings);
	}

	public setDefaultFilter(defaultFilter): TableRelatedUserParameters {
		const defaultFilterSettingName = defaultFilter ? defaultFilter.settingName : null;
		const filter = this.filters.find(({ settingName }) => settingName === defaultFilterSettingName);
		this.defaultFilter = filter;
		defaultFilter && this.setSelectedFilter(filter);
		return this;
	}

	public setDefaultSortOrder(defaultSortOrder): TableRelatedUserParameters {
		const defaultSortOrderSettingName = defaultSortOrder ? defaultSortOrder.settingName : null;
		const sortOrder = this.sortOrderSettings.find(({ settingName }) => settingName === defaultSortOrderSettingName);
		this.defaultSortOrder = sortOrder;
		defaultSortOrder && this.setSelectedSortOrder(sortOrder);
		return this;
	}

	public setDefaultHiddenColumnSetting(defaultHiddenColumnFilter): TableRelatedUserParameters {
		const defaultHiddenColumnSettingName = defaultHiddenColumnFilter ? defaultHiddenColumnFilter.settingName : null;
		const hiddenColumn = this.hiddenColumnSettings.find(({ settingName }) => settingName === defaultHiddenColumnSettingName);
		this.defaultHiddenColumnFilter = hiddenColumn;
		hiddenColumn && this.setSelectedHiddenColumnFilter(hiddenColumn);
		return this;
	}
	@StoreSetting(EndPoints.DBE_FILTER_SETTING)
	public addFilter(newFilter: FilterSetting): any {
		this.setFilters([...this.filters, newFilter]);
		return newFilter;
	}

	@UpdateSetting(EndPoints.DBE_FILTER_SETTING)
	public editFilter(filterSetting: FilterSetting) {
		return filterSetting;
	}

	@DeleteSetting(StoreSettingKey.DBE_FILTER_SETTING)
	public deleteFilterSetting(filter: FilterSetting) {
		this.setFilters(this.filters.filter(({settingId}) => filter.settingId !== settingId));
		return filter;
	}

	@StoreSetting(EndPoints.DBE_SORT_ORDER_SETTING)
	public addSortOrder(sortOrder: SortSetting): SortSetting {
		this.setSortOrderSetting([...this.sortOrderSettings, sortOrder]);
		return sortOrder;
	}

	@DeleteSetting(StoreSettingKey.DBE_SORT_ORDER_SETTING)
	public deleteSortingSetting(sortSetting: SortSetting) {
		this.setSortOrderSetting(this.sortOrderSettings.filter(({settingId}) => sortSetting.settingId !== settingId));
		return sortSetting;
	}

	@UpdateSetting(EndPoints.DBE_SORT_ORDER_SETTING)
	public editSortingSetting(sortSetting: SortSetting) {
		return sortSetting;
	}

	@StoreSetting(EndPoints.DBE_HIDDEN_COLUMNS_FILTER_SETTING)
	public addHiddenColumnSetting(hiddenColumn: HiddenColumnSetting): HiddenColumnSetting {
		this.setHiddenColumnSettings([...this.hiddenColumnSettings, hiddenColumn]);
		return hiddenColumn;
	}

	@DeleteSetting(StoreSettingKey.DBE_HIDDEN_COLUMNS_FILTER_SETTING)
	public deleteHiddenColumnsSetting(sortSetting: SortSetting) {
		this.setHiddenColumnSettings(this.hiddenColumnSettings.filter(({settingId}) => sortSetting.settingId !== settingId));
		return sortSetting;
	}

	@UpdateSetting(EndPoints.DBE_HIDDEN_COLUMNS_FILTER_SETTING)
	public editHiddenColumnsSetting(hiddenColumnSetting: HiddenColumnSetting) {
		return hiddenColumnSetting;
	}

	@ShareUnshareSetting(StoreSettingKey.DBE_FILTER_SETTING)
	public shareUnshareFilterSetting(objectId: number, isShare: boolean) {
		return { objectId, isShare };
	}

	@ShareUnshareSetting(StoreSettingKey.DBE_SORT_ORDER_SETTING)
	public shareUnshareSortingSetting(objectId: number, isShare: boolean) {
		return { objectId, isShare };
	}

	@ShareUnshareSetting(StoreSettingKey.DBE_HIDDEN_COLUMNS_FILTER_SETTING)
	public shareUnshareHiddenColumnSetting(objectId: number, isShare: boolean) {
		return { objectId, isShare };
	}

	@StoreSetting(EndPoints.DBE_SPLIT_SCREEN_PARAMS, StoreSettingKey.DX_DBE_SCREEN_BUILDER_SETTINGS)
	public storeScreenBuilderSettings(templateId: number, params) {
		return templateId ? { setting: { templateId, tableNames: params } } : { setting: null };
	}

	@StoreSetting(EndPoints.DBE_SPLIT_SCREEN_PARAMS, StoreSettingKey.DX_DBE_PARENT_CHILD_TABLE_SETTINGS)
	public storeParentChildTableBuilderSettings(templateId: number, params) {
		return templateId ? { setting: { templateId, tableNames: params } } : { setting: null };
	}


	public getActions(): TableActionModel[] {
		return this.actions;
	}

	public saveSettings(params) {
		const {
			tabTitle,
			defaultFilter,
			defaultHiddenColumnFilter,
			defaultSortOrder,
			pageSize,
			isAutoRefresh,
			intervalInSeconds,
			lastSelectionMode
		} = params;
		this.tabTitle = tabTitle;
		this.defaultFilter = defaultFilter;
		this.defaultHiddenColumnFilter = defaultHiddenColumnFilter;
		this.defaultSortOrder = defaultSortOrder;
		this.pageSize = pageSize;
		this.isAutoRefresh = isAutoRefresh;
		this.intervalInSeconds = intervalInSeconds;
		this.lastSelectionMode = lastSelectionMode;

	}
}

export default TableRelatedUserParameters;
