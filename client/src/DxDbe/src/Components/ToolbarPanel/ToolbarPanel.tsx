/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Fragment } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import ToolbarItem from '../../services/ToolbarPanelManager/ToolbarItem';

import useButtonManager from '../../hooks/useButtonManager';

const ToolbarPanel = ({ tableType, tableInstance, dbeDxGridRef, toolbarRef, closeModal }) => {
	const buttonsManager = useButtonManager(tableType, tableInstance, dbeDxGridRef, closeModal);
	return (
		<Fragment>
			<Toolbar ref={toolbarRef} className={'toolbar-buttons-holder'}>
				{buttonsManager.getVisibleButtons().map((button: ToolbarItem) => {
					return (
						<Item key={button.getKey()} {...button.getItemProps()} ref={(buttonRef) => {
							button.setRef(buttonRef);
						}}>
							{button.getChildren()}
						</Item>
					);
				})}
			</Toolbar>
		</Fragment>
	);
};

ToolbarPanel.defaultProps = {
	closeModal: () => null,
};

export default ToolbarPanel;
