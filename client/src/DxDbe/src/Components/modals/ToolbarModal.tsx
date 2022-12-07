/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, {useState} from 'react';
import {Popup} from 'devextreme-react/popup';
import {getComponentByModalName} from './index';
import TFunction from '../../models/Types/Types';
import ScrollView from 'devextreme-react/scroll-view';

import './styles.less';

interface IToolbarModal {
	tableType: string;
    modalName: string;
    index: number;
    visible: boolean;
    openModal: TFunction;
	modalSymbol: symbol;
	closeModal: TFunction;
	props: any;
}

const ToolbarModal = ({ tableType, modalName, index, openModal, modalSymbol, closeModal, props }: IToolbarModal) => {
	const ModalContent = getComponentByModalName(modalName);
	const [isLoading, setLoading] = useState<boolean>(!props.asyncRender);
	return (
		<Popup
			key={`${modalName}-${index}`}
			visible={isLoading}
			onHiding={() => closeModal(modalSymbol)}
			dragEnabled={true}
			hideOnOutsideClick={props.closeOnOutsideClick !== undefined ? props.closeOnOutsideClick : true}
			showCloseButton={true}
			showTitle={true}
			title={props.modalTitle || modalName}
			container={'.dx-viewport'}
			width={props.width || 550}
			height={props.height || 'auto'}
			deferRendering={false}
			minHeight={100}
			className={'modal'}
		>
            <ScrollView width="100%" height="100%" style={{maxHeight: '90vh'}}>
                <ModalContent
					tableType={tableType}
                    openModal={openModal}
                    closeModal={closeModal}
                    props={props}
                    setLoading={setLoading}
                />
            </ScrollView>
		</Popup>
	);
};

export default ToolbarModal;
