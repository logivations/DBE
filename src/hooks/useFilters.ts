/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import translate from '../i18n/localization';
import { createGroupedItemsForSelectBox } from '../utils/settingsUtils';
import TableInstance from '../services/TableInstanceManager/TableInstance';
import { FilterSetting } from '../models/Classes';

const useFilters = (tableInstance: TableInstance) => {
	return useMemo(() => {
		const filtersSettings: FilterSetting[] = tableInstance.getFilters();

		const { publicFiltersForSelectBox, privateFiltersForSelectBox } = filtersSettings.reduce(
			(acc, filterSettings) => {
				filterSettings.isPublic
					? acc.publicFiltersForSelectBox.push({ ...filterSettings, category: translate('PUBLIC_FILTERS') })
					: acc.privateFiltersForSelectBox.push({
							...filterSettings,
							category: translate('PRIVATE_FILTERS'),
					  });
				return acc;
			},
			{ publicFiltersForSelectBox: [], privateFiltersForSelectBox: [] },
		);

		const noFilter = {
			settingName: translate('NO_FILTER_APPLIED'),
			category: '',
			settingId: 'no_filter',
		};

		const groupedFilters = createGroupedItemsForSelectBox([
			noFilter,
			...publicFiltersForSelectBox,
			...privateFiltersForSelectBox,
		]);
		return [groupedFilters];
	}, []);
};

export default useFilters;
