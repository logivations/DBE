/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useContext, useMemo, useState } from 'react';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import { FilterGroup } from '../models/Classes';

export interface ITablePopup {
	tableName: string;
	tableTitle: string;
	visible: boolean;
	initialFilter: FilterGroup;
	saveButtonVisibility: boolean;
}

interface IContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const ParentTablePopupContext = React.createContext<any>(null);

export const ParentTablePopupContextProvider = ({ children }: IContextProps) => {
	const [tablePopupProps, setTablePopupProps] = useState<ITablePopup[]>([]);

	const close = useCallback(() => {
		setTablePopupProps((prevProps) => {
			const tableInstanceManager = new TableInstanceManager();
			const tables = [...prevProps];
			const lastTable = tables.pop();
			tableInstanceManager.deleteTableInstance(lastTable?.tableName);
			return tables;
		});
	}, []);

	const setData = useCallback(
		(foreignKeyInfo, data, button) => {
			const { parentTable: tableName } = foreignKeyInfo;
			const tableInstanceManager = new TableInstanceManager();
			tableInstanceManager.createInstance(tableName, { foreignKeyInfo, close }).then((tableInstance) => {
				const initialFilter: FilterGroup = tableInstance
					.getTableDataModel()
					.createFilterGroupFromUniqueKeys(null, data);
				setTablePopupProps((prevProps) => {
					const newTableProps = {
						tableName,
						tableTitle: tableInstance.getTableNameForTitle(),
						visible: true,
						tableType: TableInstanceManager.FOREIGN_KEY_TABLE,
						initialFilter,
						saveButtonVisibility: button.getIsEditable(),
					};
					return [...prevProps, newTableProps];
				});
			});
		},
		[tablePopupProps],
	);

	const setCompareTableData = useCallback(
		(compareTableInfo) => {
			const { tableName } = compareTableInfo;
			const tableInstanceManager = new TableInstanceManager();
			tableInstanceManager.createCompareTableInstance(tableName).then((tableInstance) => {
				setTablePopupProps((prevProps) => [
					...prevProps,
					{
						tableName,
						tableTitle: tableInstance.getTableNameForTitle(),
						visible: true,
						tableType: TableInstanceManager.COMPARE_TABLE_RESULT,
						initialFilter: new FilterGroup(),
						saveButtonVisibility: true,
					},
				]);
			});
		},
		[tablePopupProps],
	);

	const parentTablePopupContext = useMemo(() => {
		return { close, setData, setCompareTableData, tablePopupProps };
	}, [close, setData, setCompareTableData, tablePopupProps]);

	return (
		<ParentTablePopupContext.Provider value={parentTablePopupContext}>{children}</ParentTablePopupContext.Provider>
	);
};

const useParentTablePopupContext = () => useContext(ParentTablePopupContext);

export default useParentTablePopupContext;
