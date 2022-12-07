/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { BuildersTypes } from '../../constants/ModalsTypes';
import { FilterSetting } from '../../models/Classes';
import translate from '../../i18n/localization';
import { useMemo } from 'react';
import ButtonNames from "../../services/ToolbarPanelManager/ButtonNames";

const useFilterSetting = (tableInstance, dbeDxGridRef, ownerUserFilters = false) => {
	return useMemo(() => {
		return {
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
				return tableInstance.selectedFilter.settingId === objectId;
			},
			createNewSetting: (settingName, isPublic, objectId, setting) =>
				FilterSetting.createNewFilterSetting(settingName, isPublic, objectId, setting),
			title: translate('FILTER'),
			getTheBiggestObjectId: () => tableInstance.tableRelatedUserParameters.getTheBiggestFilterObjectId(),
			isNameExists: (name) => tableInstance.isFilterNameExistsFilters(name),
			getNextSettingName: () => {
				return tableInstance.tableRelatedUserParameters.getLastFilterSettingCount() + 1;
			},
			updateToolbarButton: (toolbarRef, filterSetting) => {
				const filterButton = toolbarRef.current.props.children.find(({key}) => key === ButtonNames.filterSettingSplitMenuButton);
				filterButton.props.options.selectedItemKey = filterSetting.settingId;
				filterButton.props.options.items = [...filterButton.props.options.items, filterSetting].map((filter) => ({ ...filter }));
				toolbarRef.current.instance.repaint();
			},

			applySettingToDataGrid: (filterSetting) => {
				dbeDxGridRef.filter(filterSetting);
			}
		};
	}, [ownerUserFilters]);
};

export default useFilterSetting;
