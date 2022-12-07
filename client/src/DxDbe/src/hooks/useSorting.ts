/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import translate from '../i18n/localization';
import { createGroupedItemsForSelectBox } from '../utils/settingsUtils';
import {NO_FILTER} from "../constants/FiltersConstants";

const useSorting = (tableInstance) => {
	return useMemo(() => {
		const sortOrderSettings = tableInstance.getSortOrderSettings();

		const publicSortOrder = sortOrderSettings.filter(({ isPublic }) => isPublic);
		const privateSortOrder = sortOrderSettings.filter(({ isPublic }) => !isPublic);

		const publicSortOrderSettingsForSelectBox = publicSortOrder.map((filter) => {
			return { ...filter, category: translate('PUBLIC_FILTERS') };
		});
		const privateSortOrderSettingsForSelectBox = privateSortOrder.map((filter) => {
			return { ...filter, category: translate('PRIVATE_FILTERS') };
		});

		const noSortOrderSetting = {
			settingName: translate('NO_FILTER_APPLIED'),
			settingId: NO_FILTER,
			category: '',
		};

		const groupedSorting = createGroupedItemsForSelectBox([
			noSortOrderSetting,
			...publicSortOrderSettingsForSelectBox,
			...privateSortOrderSettingsForSelectBox,
		]);

		return [groupedSorting];
	}, []);
};

export default useSorting;
