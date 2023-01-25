/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import { LoadPanel } from 'devextreme-react/load-panel';
import translate from '../../i18n/localization';

const Loader = ({ message = translate('Loading ...') }) => {
	return (
		<LoadPanel
			shadingColor={'transparent'}
			message={message}
			position={{ my: 'center', at: 'center', of: window }}
			showPane={false}
			visible={true}
		/>
	);
};

export default Loader;
