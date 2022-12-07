/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useMemo} from 'react';
import ToolbarPanelButtonManager from '../services/ToolbarPanelManager/ToolbarPanelButtonManager';
import ToolbarPanelView from '../services/ToolbarPanelManager/ToolbarPanelView';
import useModalContext from '../context/ModalsContext';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import ToolbarPanelConfigByTable from '../services/ToolbarPanelManager/ToolbarPanelConfigByTable';
import useScreenBuilderContext from "../context/ScreenBuilderContext";

const useButtonManager = (tableType, tableInstance, dbeDxGridRef, closeModal) => {
	const { openModal } = useModalContext();
	const {updateSplitElements, destroyChildParentTable, destroyScreenBuilder, screenBuilder} =  useScreenBuilderContext();
	const tableInstanceManager = new TableInstanceManager();
	return useMemo<ToolbarPanelButtonManager>(() => {
		const buttonManager = new ToolbarPanelButtonManager(tableInstance, tableType);
		console.log(buttonManager);
		if (dbeDxGridRef) {
			buttonManager.setDbeDxGridRef(dbeDxGridRef);
		}

		tableInstanceManager.setButtonManager(buttonManager);
		tableInstance.setToolbarPanelButtonManager(buttonManager);
		return buttonManager
			.setActions('openModal', openModal)
			.setActions('closeModal', closeModal)
			.setActions('updateSplitElements', (tableToDelete) => {
				destroyScreenBuilder();
				return updateSplitElements(tableToDelete, screenBuilder, screenBuilder);
			})
			.setActions('destroyChildParentTable', destroyChildParentTable)
			.createToolbarBarEvents()
			.buildToolbarButtons()
			.registerShortcuts()
			.configureButtonsVisibility(
				ToolbarPanelView.getToolbarPanelButtonsConfig(tableType),
				ToolbarPanelConfigByTable.build(tableInstance),
			);
	}, [tableType, screenBuilder]);
};

export default useButtonManager;
