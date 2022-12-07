/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import translate from '../i18n/localization';
import { createGroupedItemsForSelectBox } from '../utils/settingsUtils';
import TableInstance from '../services/TableInstanceManager/TableInstance';
import DataSource from "devextreme/data/data_source";
import {NO_FILTER} from "../constants/FiltersConstants";
import {HiddenColumnSetting} from "../models/Classes";

const useHiddenColumns = (tableInstance: TableInstance) => {
	return useMemo(() => {
		const hiddenColumnsSettings: HiddenColumnSetting[] = tableInstance.getHiddenColumns();

		const publicHiddenColumns = hiddenColumnsSettings.filter(({ isPublic }) => isPublic);
		const privateHiddenColumns = hiddenColumnsSettings.filter(({ isPublic }) => !isPublic);

		const publicHiddenColumnsForSelectBox = publicHiddenColumns.map((filter) => {
			return { ...filter, category: translate('PUBLIC_FILTERS') };
		});
		const privateHiddenColumnsForSelectBox = privateHiddenColumns.map((filter) => {
			return { ...filter, category: translate('PRIVATE_FILTERS') };
		});

		const noHiddenColumn = {
			settingName: translate('NO_FILTER_APPLIED'),
			category: '',
			settingId: NO_FILTER,
		};

		const groupedHiddenColumns: DataSource = createGroupedItemsForSelectBox([
			noHiddenColumn,
			...publicHiddenColumnsForSelectBox,
			...privateHiddenColumnsForSelectBox,
		]);
		return [groupedHiddenColumns];
	}, []);
};

export default useHiddenColumns;
