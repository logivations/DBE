/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {BuildersTypes} from '../../constants/ModalsTypes';
import {SortSetting} from '../../models/Classes';
import translate from '../../i18n/localization';
import {useMemo} from 'react';
import ButtonNames from "../../services/ToolbarPanelManager/ButtonNames";

const useSortingSetting = (tableInstance, dbeDxGridRef,  ownerUserFilters = false) => {
	return useMemo(() => {
		return {
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
				return tableInstance.selectedSortOrder.settingId === objectId;
			},
			createNewSetting: (settingName, isPublic, objectId, setting) =>
				SortSetting.createNewSortOrder(settingName, isPublic, objectId, setting),
			title: translate('TABLE_SORTING'),
			getTheBiggestObjectId: () => tableInstance.tableRelatedUserParameters.getTheBiggestSortOrderObjectId(),
			isNameExists: (name) => tableInstance.isFilterNameExistsSortOrderSettings(name),
			getNextSettingName: () => {
				return tableInstance.tableRelatedUserParameters.getLastSortOrderSettingCount() + 1;
			},
			updateToolbarButton: (toolbarRef, filterSetting) => {
				const filterButton = toolbarRef.current.props.children.find(({key}) => key === ButtonNames.tableSortButton);
				filterButton.props.options.selectedItemKey = filterSetting.settingId;
				filterButton.props.options.items = [...filterButton.props.options.items, filterSetting].map((filter) => ({ ...filter }));
				toolbarRef.current.instance.repaint();
			},
			applySettingToDataGrid: (sortingSetting) => {
				SortSetting.applySortingSetting(sortingSetting, dbeDxGridRef);
			}
		};
	}, [ownerUserFilters]);
};

export default useSortingSetting;
