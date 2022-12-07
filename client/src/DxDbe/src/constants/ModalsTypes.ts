/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

enum ModalsTypes {
	TABLE_ACTION_MODAL = 'TableActionModal',
	SETTINGS_MODAL = 'SettingsModal',
	IMPORT_MODAL = 'ImportModal',
	EXPORT_MODAL = 'ExportModal',

	USER_PARAMS_SETTINGS_MODAL = 'UserParamsSettingsModal',
	ADD_NEW_SETTINGS_MODAL = 'AddNewSettingsModal',
	EDIT_SETTING_MODAL = 'EditSettingModal',

	LINK_WITH_FILTER = 'LinkWithFilter',

	MASSIVE_UPDATE_MODAL = 'MassiveUpdateModal',
	SCREEN_BUILDER_CONFIG = 'ScreenBuilderConfig',
	CHILD_PARENT_TABLE_MODAL = 'ChildParentTableModal',

	ADD_NEW_ROW_MODAL = 'AddNewRowModal',
	CLONE_SELECTED_ROWS_MODAL = 'CloneSelectedRowsModal',
	COMPARE_TABLES_PARAMETERS_MODAL = 'CompareTablesParametersModal',
	MERGE_ROWS_MODAL = 'MergeRowsModal',

	RECALCULATE_REPORT_DATA = 'RecalculateReportData',
	SELECTION_FOR_FILTER_MODAL = 'SelectionForFilterModal',
}

export enum BuildersTypes {
	FILTER_BUILDER = 'FilterBuilder',
	SORTING_BUILDER = 'SortingBuilder',
	HIDDEN_COLUMNS_BUILDER = 'HiddenColumnsBuilder',
}

export default ModalsTypes;
