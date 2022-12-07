/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useCallback, useContext, useState} from 'react';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import TFunction from "../models/Types/Types";

export interface ITablePopup {
	tableName: string;
	tableTitle: string;
	visible: boolean;
	repaintForeignCells: TFunction
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
			lastTable?.repaintForeignCells();
			return tables;
		});
	}, []);

	const setData = useCallback(
		(foreignKeyInfo, repaintForeignCells) => {
			const { parentTable: tableName } = foreignKeyInfo;
			const tableInstanceManager = new TableInstanceManager();
			tableInstanceManager.createInstance(tableName, {foreignKeyInfo, close}).then((tableInstance) => {
				setTablePopupProps((prevProps) => ([
					...prevProps,
					{
						tableName,
						tableTitle: tableInstance.getTableNameForTitle(),
						visible: true,
						tableType: TableInstanceManager.FOREIGN_KEY_TABLE,
						repaintForeignCells
					},
				]));
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
						repaintForeignCells: () => false
					},
				]);
			});
		},
		[tablePopupProps],
	);

	return (
		<ParentTablePopupContext.Provider value={{ close, setData, setCompareTableData, tablePopupProps }}>
			{children}
		</ParentTablePopupContext.Provider>
	);
};

const useParentTablePopupContext = () => useContext(ParentTablePopupContext);

export default useParentTablePopupContext;
