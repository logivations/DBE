/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import ToolbarPanelButtonManager from '../services/ToolbarPanelManager/ToolbarPanelButtonManager';
import ToolbarPanelView from '../services/ToolbarPanelManager/ToolbarPanelView';
import TableInstanceManager from '../services/TableInstanceManager/TableInstanceManager';
import ToolbarPanelConfigByTable from '../services/ToolbarPanelManager/ToolbarPanelConfigByTable';
import useScreenBuilderContext from '../context/ScreenBuilderContext';
import useModalWindowPopupContext from '../context/ModalPopupContext';

const useButtonManager = (tableType, tableInstance, dbeDxGridRef, saveButtonVisibility) => {
	const { updateSplitElements, destroyChildParentTable, destroyScreenBuilder, screenBuilder } =
		useScreenBuilderContext();

	const { openModalWithProps, closeModal } = useModalWindowPopupContext();

	const tableInstanceManager = new TableInstanceManager();
	return useMemo<ToolbarPanelButtonManager>(() => {
		const buttonManager = new ToolbarPanelButtonManager(tableInstance, tableType);
		if (dbeDxGridRef) {
			buttonManager.setDbeDxGridRef(dbeDxGridRef);
		}

		tableInstanceManager.setButtonManager(buttonManager);
		tableInstance.setToolbarPanelButtonManager(buttonManager);
		return buttonManager
			.setActions('updateSplitElements', (tableToDelete, tableName) => {
				destroyScreenBuilder();
				return updateSplitElements(tableToDelete, tableName, screenBuilder);
			})
			.setActions('destroyChildParentTable', destroyChildParentTable)
			.setActions('openModal', openModalWithProps)
			.setActions('closeModal', closeModal)
			.createToolbarBarEvents()
			.buildToolbarButtons()
			.registerShortcuts()
			.configureButtonsVisibility(
				ToolbarPanelView.getToolbarPanelButtonsConfig(tableType, saveButtonVisibility),
				ToolbarPanelConfigByTable.build(tableInstance),
			);
	}, [tableType, screenBuilder]);
};

export default useButtonManager;
