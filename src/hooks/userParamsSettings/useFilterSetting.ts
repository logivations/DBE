/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { BuildersTypes } from '../../constants/ModalsTypes';
import { FilterSetting } from '../../models/Classes';
import translate from '../../i18n/localization';
import { useMemo } from 'react';
import ButtonNames from '../../services/ToolbarPanelManager/ButtonNames';

const useFilterSetting = (tableInstance, dbeDxGridRef, ownerUserFilters = false) => {
	return useMemo(() => {
		return {
			buttonName: ButtonNames.filterSettingButton,
			settingElements: ownerUserFilters ? tableInstance.getFilters() : tableInstance.getOtherFilters(),
			addSetting: (newFilter) => {
				return tableInstance.tableRelatedUserParameters.addFilter(newFilter);
			},
			editSetting: (filterSetting) => tableInstance.tableRelatedUserParameters.editFilter(filterSetting),
			deleteSetting: (filter) => tableInstance.tableRelatedUserParameters.deleteFilterSetting(filter),
			builderKey: BuildersTypes.FILTER_BUILDER,
			setSelectedSetting: (selectedFilter) => {
				return tableInstance.tableRelatedUserParameters.setSelectedFilter(selectedFilter);
			},
			shareUnshareSetting: (objectId, isShare) => {
				return tableInstance.tableRelatedUserParameters.shareUnshareFilterSetting(objectId, isShare);
			},
			checkSelectedSetting: (objectId) => {
				return tableInstance.selectedFilter && tableInstance.selectedFilter.settingId === objectId;
			},
			createNewSetting: (settingName, isPublic, objectId, setting) =>
				FilterSetting.createNewFilterSetting(settingName, isPublic, objectId, setting),
			title: translate('FILTER'),
			getTheBiggestObjectId: () => tableInstance.tableRelatedUserParameters.getTheBiggestFilterObjectId(),
			isNameExists: (name) => tableInstance.isFilterNameExistsFilters(name),
			getNextSettingName: () => {
				return tableInstance.tableRelatedUserParameters.getLastFilterSettingCount() + 1;
			},
			updateToolbarButton: (toolbarPanelDispatch, filterSetting) => {
				toolbarPanelDispatch({
					type: 'UPDATE_ITEMS',
					payload: {
						items: [filterSetting].map((filter) => ({ ...filter })),
						buttonName: ButtonNames.filterSettingButton,
					},
				});
				toolbarPanelDispatch({
					type: 'UPDATE_SELECTED_ITEM_KEY',
					payload: {
						selectedItemKey: filterSetting?.settingId || null,
						buttonName: ButtonNames.filterSettingButton,
					},
				});
			},

			applySettingToDataGrid: (filterSetting) => {
				dbeDxGridRef.filter(filterSetting);
			},
		};
	}, [ownerUserFilters]);
};

export default useFilterSetting;
