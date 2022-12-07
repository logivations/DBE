/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import useParentTablePopupContext from '../../context/ParentTablePopupContext';
import PopupElement from './PopupElement';
import '../../styles/general.less';

const ParentTablePopup = () => {
	const { tablePopupProps, close } = useParentTablePopupContext();

	return (
		<div>
			{[...tablePopupProps].map(({ tableName, visible, tableType, tableTitle }, index) => {
				return (
					<PopupElement
						tableType={tableType}
						tableTitle={tableTitle}
						key={`${tableName}-${index}`}
						tableName={tableName}
						isVisible={visible}
						close={close}
						index={index}
					/>
				);
			})}
		</div>
	);
};

export default ParentTablePopup;
