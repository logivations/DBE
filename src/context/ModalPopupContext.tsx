/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2023
 ******************************************************************************/

import React, { useCallback, useContext, useReducer } from 'react';
import { modalContentByName } from '../Components/modals';
import MemoizedModalPopup from '../Components/modals/ToolbarModal';

interface IContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const ModalWindowPopupContext = React.createContext<any>(null);

function reducer(state, action) {
	switch (action.type) {
		case 'OPEN_MODAL_WITH_PROPS': {
			return {
				...state,
				[action.modalName]: { ...state[action.modalName], visibility: true, props: action.props },
			};
		}

		case 'CLOSE_MODAL': {
			return {
				...state,
				[action.modalName]: { visibility: false, props: {} },
			};
		}
		default:
			return state;
	}
}

export const ModalWindowPopupContextProvider = ({ children }: IContextProps) => {
	const [state, dispatch] = useReducer(reducer, {}, () => {
		return Object.keys(modalContentByName).reduce((acc, modalName) => {
			return { ...acc, [modalName]: { visibility: false, props: {} } };
		}, {});
	});

	const closeModal = useCallback(
		(modalName) => {
			dispatch({ type: 'CLOSE_MODAL', modalName });
		},
		[state, dispatch],
	);

	const openModalWithProps = useCallback(
		async (modalName, props) => {
			dispatch({ type: 'OPEN_MODAL_WITH_PROPS', modalName, props });
			return async () => await closeModal(modalName);
		},
		[state, dispatch, closeModal],
	);

	return (
		<ModalWindowPopupContext.Provider value={{ openModalWithProps, closeModal }}>
			<>
				{children}
				<div id="modals-root">
					{Object.entries(modalContentByName).map(([modalName, ModalContent]) => {
						const allProps = state[modalName];
						return (
							<MemoizedModalPopup
								key={modalName}
								ModalContent={ModalContent}
								modalName={modalName}
								visibility={allProps.visibility}
								props={allProps.props}
								closeModal={closeModal}
							/>
						);
					})}
				</div>
			</>
		</ModalWindowPopupContext.Provider>
	);
};

const useModalWindowPopupContext = () => useContext(ModalWindowPopupContext);

export default useModalWindowPopupContext;
