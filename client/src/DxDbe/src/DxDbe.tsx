/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import TableInstanceManager from './services/TableInstanceManager/TableInstanceManager';
import ToolbarModalWrapper from './Components/modals/ToolbarModalWrapper';
import ScreenBuilder from './Components/ScreenBuilder/ScreenBuilder';
import DxDbeHeader from './Components/DxDbeHeader/DxDbeHeader';
import OriginalTable from './Components/OriginalTable/OriginalTable';
import useScreenBuilderContext from './context/ScreenBuilderContext';

import 'devextreme/dist/css/dx.common.css';
import './styles/general.less';

const ParentTablePopup = React.lazy(
	() => import(/* webpackChunkName: "ParentTablePopup" */ './Components/ParentTablePopup/ParentTablePopup'),
);

function DxDbe() {
	const {screenBuilder} =  useScreenBuilderContext();
	return (
		<div className="App">
			<DxDbeHeader tableName={'original_table'} />
			<ParentTablePopup />
			<ToolbarModalWrapper tableType={TableInstanceManager.ORIGINAL_TABLE} />
			{
				!screenBuilder.isScreenBuilderOn
					? <OriginalTable height={undefined}/>
					: <ScreenBuilder isScreenBuilder={true}/>
			}
		</div>
	);
}

export default DxDbe;
