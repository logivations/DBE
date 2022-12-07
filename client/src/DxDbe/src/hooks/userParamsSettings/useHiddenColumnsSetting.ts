/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {HiddenColumnSetting, TableRelatedUserParameters} from '../../models/Classes';
import translate from '../../i18n/localization';
import {BuildersTypes} from '../../constants/ModalsTypes';
import {useMemo} from 'react';
import ButtonNames from "../../services/ToolbarPanelManager/ButtonNames";

const useHiddenColumnsSetting = (tableInstance, dbeDxGridRef, ownerUserFilters = false) => {
	return useMemo(() => {
		return {
			settingElements: ownerUserFilters ? tableInstance.getHiddenColumns() : tableInstance.getOtherHiddenColumn(),
			editSetting: (hiddenColumnFilter) =>
				tableInstance.tableRelatedUserParameters.editHiddenColumnsSetting(hiddenColumnFilter),
			addSetting: (hiddenColumnFilter) =>
				tableInstance.tableRelatedUserParameters.addHiddenColumnSetting(hiddenColumnFilter),
			deleteSetting: (hiddenColumnFilter) =>
				tableInstance.tableRelatedUserParameters.deleteHiddenColumnsSetting(hiddenColumnFilter),
			builderKey: BuildersTypes.HIDDEN_COLUMNS_BUILDER,
			setSelectedSetting: (hiddenColumnFilter): TableRelatedUserParameters => {
				return tableInstance.tableRelatedUserParameters.setSelectedHiddenColumnFilter(hiddenColumnFilter);
			},
			shareUnshareSetting: (objectId, isShare): void => {
				return tableInstance.tableRelatedUserParameters.shareUnshareHiddenColumnSetting(objectId, isShare);
			},
			checkSelectedSetting: (objectId): boolean => {
				return tableInstance.selectedHiddenColumnFilter.settingId === objectId;
			},
			createNewSetting: (settingName, isPublic, objectId, setting) =>
				HiddenColumnSetting.createNewHiddenColumnSetting(settingName, isPublic, objectId, setting),
			title: translate('HIDDEN_COLUMNS_FILTER'),
			getTheBiggestObjectId: () => tableInstance.tableRelatedUserParameters.getTheBiggestHiddenColumnObjectId(),
			isNameExists: (name) => tableInstance.isFilterNameExistsHiddenColumn(name),
			getNextSettingName: () => {
				return tableInstance.tableRelatedUserParameters.getLastHiddenColumnSettingCount() + 1;
			},
			updateToolbarButton: (toolbarRef, filterSetting) => {
				const filterButton = toolbarRef.current.props.children.find(({key}) => key === ButtonNames.hiddenColumnSettingSplitMenuButton);
				filterButton.props.options.selectedItemKey = filterSetting.settingId;
				filterButton.props.options.items = [...filterButton.props.options.items, filterSetting].map((filter) => ({ ...filter }));
				toolbarRef.current.instance.repaint();
			},
			applySettingToDataGrid: (hiddenColumns) => {
				dbeDxGridRef.option('customizeColumns', (columns) => {
					columns.forEach((column) => {
						column.visible = !hiddenColumns.setting.includes(column.dataField);
					});
				});
			}
		};
	}, [ownerUserFilters]);
};

export default useHiddenColumnsSetting;
