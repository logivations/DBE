/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useCallback, useMemo} from 'react';
import translate from '../i18n/localization';
import { createGroupedItemsForSelectBox } from '../utils/settingsUtils';
import TableInstance from '../services/TableInstanceManager/TableInstance';
import { FilterSetting } from '../models/Classes';

const useFilters = (tableInstance: TableInstance) => {
	return useMemo(() => {
		const filtersSettings: FilterSetting[] = tableInstance.getFilters();

		const publicFilters = filtersSettings.filter(({ isPublic }) => isPublic);
		const privateFilters = filtersSettings.filter(({ isPublic }) => !isPublic);

		const publicFiltersForSelectBox = publicFilters.map((filter: FilterSetting) => {
			return { ...filter, category: translate('PUBLIC_FILTERS') };
		});
		const privateFiltersForSelectBox = privateFilters.map((filter: FilterSetting) => {
			return { ...filter, category: translate('PRIVATE_FILTERS') };
		});

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
