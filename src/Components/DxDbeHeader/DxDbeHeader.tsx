/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import Toolbar, { Item } from 'devextreme-react/toolbar';
import LogivationsLogo from './LogivationsLogo';
import translate from '../../i18n/localization';
import React, { useEffect, useState } from 'react';
import { useTableInstance, useThemes } from '../../hooks';
import communicator from '../../api/Communicator';

import './style.css';

import ToggleThemeButton from '../common/ToggleThemeButton/ToggleThemeButton';

const CONTEXT_PATH = window['CONTEXT_PATH'];
const WAREHOUSE_ID = window['WAREHOUSE_ID'];

const DxDbeHeader = ({ tableName }) => {
	const { tableInstance } = useTableInstance(tableName);
	const [userName, setUserName] = useState('');
	const { changeTheme } = useThemes();

	useEffect(() => {
		communicator.getUserLogin().then((userLogin) => {
			setUserName(userLogin);
		});
	}, []);

	if (!tableInstance) {
		return null;
	}
	return (
		<div className={'dx-header'}>
			<Toolbar className={'toolbar-info-holder'}>
				<Item location={'before'} component={() => <LogivationsLogo />} />
				<Item location={'before'} text={tableInstance.getTableTitle()} />
				<Item
					location={'after'}
					cssClass={'header-text'}
					component={() => (
						<a href={`${CONTEXT_PATH}/view/showLayoutEditor?warehouseId=${WAREHOUSE_ID}`} target={'_blank'}>
							{translate('GO_TO_LAYOUT')}
						</a>
					)}
				/>
				<Item
					cssClass={'header-text'}
					location={'after'}
					component={() => (
						<a href={`${CONTEXT_PATH}/view/help/warehouse/direct-edit`} target={'_blank'}>
							{translate('HELP')}
						</a>
					)}
				/>
				<Item location={'after'} text={userName} cssClass={'header-text'} />
				<Item location={'after'} component={() => <ToggleThemeButton onValueChanged={changeTheme} />} />
				<Item
					location={'after'}
					widget={'dxButton'}
					options={{
						type: 'success',
						text: translate('LOGOUT'),
						onClick: () => {
							window.location.replace(`${CONTEXT_PATH}/j_spring_security_logout`);
						},
					}}
				/>
			</Toolbar>
		</div>
	);
};

export default DxDbeHeader;
