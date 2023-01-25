/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { Fragment, useEffect, useReducer } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import ToolbarItem from '../../services/ToolbarPanelManager/ToolbarItem';

import useButtonManager from '../../hooks/useButtonManager';

import './style.css';
function reducer(state, action) {
	switch (action.type) {
		case 'UPDATE_SELECTED_ITEM_KEY':
			return {
				...state,
				[action.payload.buttonName]: {
					...state[action.payload.buttonName],
					selectedItemKey: action.payload.selectedItemKey,
				},
			};
		case 'UPDATE_ITEMS':
			return {
				...state,
				[action.payload.buttonName]: {
					...state[action.payload.buttonName],
					items: [...state[action.payload.buttonName].items, ...action.payload.items],
				},
			};
		default:
			return state;
	}
}

const ToolbarPanel = ({ tableType, tableInstance, dbeDxGridRef, toolbarRef, saveButtonVisibility }) => {
	const buttonsManager = useButtonManager(tableType, tableInstance, dbeDxGridRef, saveButtonVisibility);
	const [state, dispatch] = useReducer(reducer, {}, () => {
		return buttonsManager.getVisibleButtons().reduce((acc, button) => {
			return { ...acc, [button.buttonName]: button.getButtonOptions() };
		}, {});
	});

	useEffect(() => {
		buttonsManager.setActions('toolbarPanelDispatch', dispatch);
	}, []);
	return (
		<Fragment>
			<Toolbar ref={toolbarRef} className={'toolbar-buttons-holder'} id={'toolbar-holder'}>
				{buttonsManager.getVisibleButtons().map((button: ToolbarItem) => {
					return (
						<Item key={button.getKey()} {...button.getItemProps()} options={state[button.buttonName]}>
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
