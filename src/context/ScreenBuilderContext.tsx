/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useContext, useEffect, useState } from 'react';
import communicator from '../api/Communicator';
import SplitScreen from '../models/Classes/SplitScreenSetting';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';

export const ScreenBuilderContext = React.createContext<any>(null);

interface IContextProps {
	children: JSX.Element[] | JSX.Element;
}

const deleteTable = (splitElements, tableToDelete) => {
	return {
		...splitElements,
		elements: splitElements.elements
			.map((table) => {
				if (table.table_name) {
					if (table.tableKey !== tableToDelete) {
						return table;
					}
				} else {
					const splitBlock = deleteTable(table, tableToDelete);
					if (splitBlock.elements.length === 1) {
						return splitBlock.elements[0];
					}
					return splitBlock;
				}
			})
			.filter((value) => !!value),
	};
};

export const ScreenBuilderContextProvider = ({ children }: IContextProps) => {
	const [parentChildTable, setParentChildTable] = useState({
		childParentConfig: null,
		childParentTable: null,
		childParentTableTemplateID: null,
	});

	const [screenBuilder, setScreenBuilder] = useState({
		screenBuilderTemplateID: null,
		splitElements: null,
		screenBuilderTables: null,
		isScreenBuilderOn: false,
	});

	const setChildParentConfig = useCallback(
		(childParentConfig, childParentTable, childParentTableTemplateID, joinedColumnGroups?) => {
			setParentChildTable(() => {
				return {
					childParentConfig: childParentConfig,
					childParentTable: childParentTable,
					childParentTableTemplateID: childParentTableTemplateID,
					childParentTableJoinedColumnGroups: joinedColumnGroups,
				};
			});
		},
		[],
	);

	const setScreenBuilderConfig = useCallback((splitElements, screenBuilderTemplateID, screenBuilderTables) => {
		setScreenBuilder(() => {
			return {
				screenBuilderTemplateID: screenBuilderTemplateID,
				splitElements: splitElements,
				screenBuilderTables: screenBuilderTables,
				isScreenBuilderOn: true,
			};
		});
	}, []);

	const destroyScreenBuilder = useCallback(() => {
		setScreenBuilder(() => {
			return {
				screenBuilderTemplateID: null,
				splitElements: null,
				screenBuilderTables: null,
				isScreenBuilderOn: false,
			};
		});
	}, []);

	const destroyChildParentTable = useCallback(() => {
		setParentChildTable(() => {
			return {
				childParentConfig: null,
				childParentTable: null,
				childParentTableTemplateID: null,
			};
		});
	}, []);

	const updateSplitElements = useCallback(
		(tableToDelete, tableName, currenScreenBuilder) => {
			const updatedElements = deleteTable(currenScreenBuilder.splitElements, tableToDelete);
			const check =
				updatedElements.elements.length === 1 &&
				updatedElements.elements[0].table_name === TableInstanceManager.ORIGINAL_TABLE;
			const tables = currenScreenBuilder.screenBuilderTables.filter((table) => table !== tableName);

			setScreenBuilder(() => {
				return {
					screenBuilderTemplateID: currenScreenBuilder.screenBuilderTemplateID,
					splitElements: !check ? updatedElements : null,
					screenBuilderTables: !check ? tables : null,
					isScreenBuilderOn: !check,
				};
			});
		},
		[screenBuilder],
	);

	useEffect(() => {
		communicator.getSplitScreenSettings().then((res) => {
			const { parentChildTableBuilderSettings, screenBuilderSettings } = res;

			if (parentChildTableBuilderSettings.setting) {
				const childParentSetting = SplitScreen.create(parentChildTableBuilderSettings);
				const template = childParentSetting.getTemplate(false);
				const tablesName = childParentSetting.getTablesName()[0];
				const templateId = childParentSetting.getTemplateId();
				const joinedColumnGroups = childParentSetting.getJoinedColumnGroups();
				setChildParentConfig(
					template.splitScreenConfig(tablesName),
					tablesName,
					templateId,
					joinedColumnGroups,
				);
			}

			if (screenBuilderSettings.setting) {
				const screenBuilderSetting = SplitScreen.create(screenBuilderSettings);
				const template = screenBuilderSetting.getTemplate(true);
				const tablesNames = screenBuilderSetting.getTablesName();
				const templateId = screenBuilderSetting.getTemplateId();
				setScreenBuilderConfig(template.splitScreenConfig(tablesNames), templateId, tablesNames);
			}
		});
	}, []);

	return (
		<ScreenBuilderContext.Provider
			value={{
				parentChildTable,
				setChildParentConfig,
				screenBuilder,
				setScreenBuilderConfig,
				destroyScreenBuilder,
				updateSplitElements,
				destroyChildParentTable,
			}}
		>
			{children}
		</ScreenBuilderContext.Provider>
	);
};

const useScreenBuilderContext = () => useContext(ScreenBuilderContext);

export default useScreenBuilderContext;
