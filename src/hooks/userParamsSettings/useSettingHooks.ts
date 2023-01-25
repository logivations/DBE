/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import useFilterSetting from './useFilterSetting';
import useSortingSetting from './useSortingSetting';
import useHiddenColumnsSetting from './useHiddenColumnsSetting';
import { TypeOfUserParamSettings } from '../../constants/userParamsSettingsConstants';

const useSettingHooks = (type) => {
	return useMemo(() => {
		switch (type) {
			case TypeOfUserParamSettings.FILTER_SETTINGS:
				return useFilterSetting;
			case TypeOfUserParamSettings.SORTING_SETTING:
				return useSortingSetting;
			case TypeOfUserParamSettings.HIDDEN_COLUMNS_SETTING:
				return useHiddenColumnsSetting;
		}
	}, [type]);
};

export default useSettingHooks;
