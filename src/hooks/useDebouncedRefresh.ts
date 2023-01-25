/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const useDebouncedRefresh = (tableInstance) => {
	return useMemo(() => {
		return debounce(({ component }) => {
			(async () => {
				if (!tableInstance.getTableDataModel().hasSummary()) return;
				const selectedRows = await component.getSelectedRowsData();
				const selectionFilter = tableInstance.getTableDataModel().createFilterGroupFromUniqueKeys(selectedRows);
				tableInstance
					.getTableDataModel()
					.setSelectionFilter(selectionFilter.isZeroFilter() ? null : selectionFilter);
				component.refresh(true);
			})();
		}, 1000);
	}, [tableInstance]);
};

export default useDebouncedRefresh;
