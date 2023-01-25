/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2021
 ******************************************************************************/

import React, { useContext, useEffect, useState } from 'react';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import { useThemes } from '../hooks';

export interface IDbeTableDataContext {
	tableInstanceManager: TableInstanceManager;
}

export const DbeTableDataContext = React.createContext<IDbeTableDataContext>({
	tableInstanceManager: new TableInstanceManager(),
});

interface IContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const DbeTableDataContextProvider = ({ children }: IContextProps) => {
	const [tableInstanceManager, setTableInstanceManager] = useState<TableInstanceManager>(null);
	const { applyBaseTheme } = useThemes();
	useEffect(() => {
		(async () => {
			applyBaseTheme();
			document.body.setAttribute('id', 'dbe-app');
			const tableInstanceManager = new TableInstanceManager();
			await tableInstanceManager.createInstance();
			setTableInstanceManager(tableInstanceManager);
		})();
	}, []);
	return <DbeTableDataContext.Provider value={{ tableInstanceManager }}>{children}</DbeTableDataContext.Provider>;
};

const useDbeTableDataContext = () => useContext(DbeTableDataContext);

export default useDbeTableDataContext;
