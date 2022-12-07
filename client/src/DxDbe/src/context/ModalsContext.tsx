/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2021
 ******************************************************************************/

import React, { useCallback, useContext, useState } from 'react';
import ModalsTypes from '../constants/ModalsTypes';
import TFunction from '../models/Types/Types';

export interface IModalContext {
	openModal: (modalName: ModalsTypes, props?: any) => void;
	closeModal: (modalName: symbol) => void;
	modalsState: Map<symbol, IModalConfig>;
}

interface IContextProps {
	children: JSX.Element[] | JSX.Element;
}

export const ModalsContext = React.createContext<IModalContext>({
	openModal: () => false,
	closeModal: () => false,
	modalsState: new Map(),
});

interface IModalConfig {
	visible?: boolean;
	closeModal?: TFunction;
	props?: object;
}

export const ModalsProvider = ({ children }: IContextProps) => {
	const [modalsState, setModalsState] = useState<Map<symbol, IModalConfig>>(new Map());

	const toggleModal = useCallback((modalName: symbol, props?: object) => {
		setModalsState((prevModalState) => {
			const newModalState = new Map(prevModalState);
			const modalConfigs: IModalConfig = newModalState.has(modalName) ? newModalState.get(modalName) : {};
			modalConfigs['closeModal'] = () => closeModal(modalName);
			props && (modalConfigs['props'] = props);
			newModalState.set(modalName, modalConfigs);
			return newModalState;
		});
	}, []);
	const openModal = useCallback(
		(modalName: ModalsTypes, props?: any) => {
			const name = Symbol(modalName);
			toggleModal(name, props);
		},
		[toggleModal],
	);
	const closeModal = useCallback(
		(modalName: symbol) => {
			setModalsState((prevState) => {
				const newState = new Map(prevState);
				newState.delete(modalName);
				return newState;
			});
		},
		[toggleModal],
	);
	return <ModalsContext.Provider value={{ openModal, closeModal, modalsState }}>{children}</ModalsContext.Provider>;
};

const useModalContext = () => useContext(ModalsContext);

export default useModalContext;
