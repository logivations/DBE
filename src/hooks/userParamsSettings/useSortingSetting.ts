/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { BuildersTypes } from '../../constants/ModalsTypes';
import { SortSetting } from '../../models/Classes';
import translate from '../../i18n/localization';
import { useMemo } from 'react';
import ButtonNames from '../../services/ToolbarPanelManager/ButtonNames';

const useSortingSetting = (tableInstance, dbeDxGridRef, ownerUserFilters = false) => {
	return useMemo(() => {
		return {
			buttonName: ButtonNames.tableSortButton,
			settingElements: ownerUserFilters
				? tableInstance.getSortOrderSettings()
				: tableInstance.getOtherSortOrderSettings(),
			editSetting: (sortSetting) => tableInstance.tableRelatedUserParameters.editSortingSetting(sortSetting),
			addSetting: (sortSetting) => tableInstance.tableRelatedUserParameters.addSortOrder(sortSetting),
			deleteSetting: (sortSetting) => tableInstance.tableRelatedUserParameters.deleteSortingSetting(sortSetting),
			builderKey: BuildersTypes.SORTING_BUILDER,
			setSelectedSetting: (selectedSortSetting) => {
				return tableInstance.tableRelatedUserParameters.setSelectedSortOrder(selectedSortSetting);
			},
			shareUnshareSetting: (objectId, isShare) => {
				return tableInstance.tableRelatedUserParameters.shareUnshareSortingSetting(objectId, isShare);
			},
			checkSelectedSetting: (objectId) => {
				return tableInstance.selectedSortOrder && tableInstance.selectedSortOrder.settingId === objectId;
			},
			createNewSetting: (settingName, isPublic, objectId, setting) =>
				SortSetting.createNewSortOrder(settingName, isPublic, objectId, setting),
			title: translate('TABLE_SORTING'),
			getTheBiggestObjectId: () => tableInstance.tableRelatedUserParameters.getTheBiggestSortOrderObjectId(),
			isNameExists: (name) => tableInstance.isFilterNameExistsSortOrderSettings(name),
			getNextSettingName: () => {
				return tableInstance.tableRelatedUserParameters.getLastSortOrderSettingCount() + 1;
			},
			updateToolbarButton: (toolbarPanelDispatch, filterSetting) => {
				toolbarPanelDispatch({
					type: 'UPDATE_ITEMS',
					payload: {
						items: [filterSetting].map((filter) => ({ ...filter })),
						buttonName: ButtonNames.tableSortButton,
					},
				});
				toolbarPanelDispatch({
					type: 'UPDATE_SELECTED_ITEM_KEY',
					payload: {
						selectedItemKey: filterSetting?.settingId || null,
						buttonName: ButtonNames.tableSortButton,
					},
				});
			},
			applySettingToDataGrid: (sortingSetting) => {
				SortSetting.applySortingSetting(sortingSetting, dbeDxGridRef);
			},
		};
	}, [ownerUserFilters]);
};

export default useSortingSetting;
