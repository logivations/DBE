/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import useDbeTableDataContext, { IDbeTableDataContext } from '../context/DbeTableDataContext';
import { useMemo } from 'react';

const useTableInstance = (tableName) => {
	const { tableInstanceManager }: IDbeTableDataContext = useDbeTableDataContext();
	const tableInstance = useMemo(() => {
		if (tableInstanceManager) {
			return tableInstanceManager.getTableInstance(tableName);
		}
	}, [tableInstanceManager, tableName]);
	return { tableInstanceManager, tableInstance };
};

export default useTableInstance;
