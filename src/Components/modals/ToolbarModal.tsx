/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import { isDefined } from '../../utils/utils';

import './styles.css';
const WithModalPopup = ({ ModalContent, modalName, visibility, props, closeModal }) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const close = useCallback(() => {
		closeModal(modalName);
		setLoading(false);
	}, [modalName]);

	return (
		<Popup
			key={modalName}
			visible={visibility}
			onHiding={close}
			animation={{ show: null }}
			dragEnabled={true}
			hideOnOutsideClick={!isDefined(props.hideOnOutsideClick) ? props.hideOnOutsideClick : true}
			showCloseButton={true}
			showTitle={true}
			title={props.modalTitle || modalName}
			width={props.width || 550}
			height={props.height || 'auto'}
			deferRendering={true}
			minHeight={100}
			wrapperAttr={{ class: 'modal-container' }}
		>
			{visibility ? (
				<ModalContent
					tableType={props.tableType}
					openModal={props.openModal}
					closeModal={close}
					props={props}
					setLoading={setLoading}
					isLoading={isLoading}
				/>
			) : (
				<div>Loading...</div>
			)}
		</Popup>
	);
};

export const MemoizedModalPopup = React.memo(WithModalPopup, (prevProps, nextProps) => {
	return prevProps.visibility === nextProps.visibility;
});

export default MemoizedModalPopup;
