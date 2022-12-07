/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import ExportModal from './ExportModal';
import SettingsModal from './SettingsModal';
import ImportModal from './ImportModal';
import UserParamsSettingsModal from './UserParamsSettingsModal';
import LinkWithFilter from './LinkWithFilter';
import TableActionModal from './TableActionModal';
import AddNewSettingsModal from './AddNewSetting';
import EditSetting from './EditSetting';
import ScreenBuilderConfig from './ScreenBuilderConfig';

import ModalsTypes from '../../constants/ModalsTypes';
import ChildParentTableModal from './ChildParentTableModal';
import MassiveUpdateModal from './MassiveUpdateModal';
import AddNewRowModal from './AddNewRowModal';
import CloneSelectedRowsModal from './CloneSelectedRowsModal';
import CompareTablesParametersModal from './CompareTablesParametersModal';
import MergeRowsModal from './MergeRowsModal';
import RecalculateReportData from './RecalculateReportData';
import SelectionForFilterModal from './SelectionForFilterModal';

const getComponentByModalName = (modalName) => {
	return {
		[ModalsTypes.TABLE_ACTION_MODAL]: TableActionModal,
		[ModalsTypes.SETTINGS_MODAL]: SettingsModal,
		[ModalsTypes.EXPORT_MODAL]: ExportModal,
		[ModalsTypes.IMPORT_MODAL]: ImportModal,
		[ModalsTypes.LINK_WITH_FILTER]: LinkWithFilter,
		[ModalsTypes.MASSIVE_UPDATE_MODAL]: MassiveUpdateModal,

		[ModalsTypes.USER_PARAMS_SETTINGS_MODAL]: UserParamsSettingsModal,
		[ModalsTypes.ADD_NEW_SETTINGS_MODAL]: AddNewSettingsModal,
		[ModalsTypes.EDIT_SETTING_MODAL]: EditSetting,

		[ModalsTypes.SCREEN_BUILDER_CONFIG]: ScreenBuilderConfig,
		[ModalsTypes.CHILD_PARENT_TABLE_MODAL]: ChildParentTableModal,

		[ModalsTypes.ADD_NEW_ROW_MODAL]: AddNewRowModal,
		[ModalsTypes.CLONE_SELECTED_ROWS_MODAL]: CloneSelectedRowsModal,
		[ModalsTypes.COMPARE_TABLES_PARAMETERS_MODAL]: CompareTablesParametersModal,
		[ModalsTypes.MERGE_ROWS_MODAL]: MergeRowsModal,
		[ModalsTypes.RECALCULATE_REPORT_DATA]: RecalculateReportData,
		[ModalsTypes.SELECTION_FOR_FILTER_MODAL]: SelectionForFilterModal,
	}[modalName];
};

export { getComponentByModalName };
