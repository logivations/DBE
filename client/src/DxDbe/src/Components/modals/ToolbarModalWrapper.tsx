/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import useModalContext from '../../context/ModalsContext';
import React, { Suspense } from 'react';

import ToolbarModal from './ToolbarModal';
import translate from '../../i18n/localization';

interface IToolbarModalWrapper {
	tableType: string;
}

const ToolbarModalWrapper = ({ tableType }: IToolbarModalWrapper) => {
	const { modalsState, closeModal, openModal } = useModalContext();
	return (
		<Suspense fallback={<div>{translate('LOADING...')}</div>}>
			<div className="modal">
				{[...modalsState.entries()].map(([modalName, modal], index: number) => {
					return (
						<ToolbarModal
							visible={true}
							modalSymbol={modalName}
							key={`${modalName.description}-${index}`}
							tableType={tableType}
							modalName={modalName.description}
							index={index}
							closeModal={closeModal}
							openModal={openModal}
							props={modal.props}
							{...modal}
						/>
					);
				})}
			</div>
		</Suspense>
	);
};

export default ToolbarModalWrapper;
