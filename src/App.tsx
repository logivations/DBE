/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import TableInstanceManager from './services/TableInstanceManager/TableInstanceManager';
import ScreenBuilder from './Components/ScreenBuilder/ScreenBuilder';
import DxDbeHeader from './Components/DxDbeHeader/DxDbeHeader';
import OriginalTable from './Components/OriginalTable/OriginalTable';
import useScreenBuilderContext from './context/ScreenBuilderContext';

import 'devextreme/dist/css/dx.common.css';
import './styles/general.css';

const ParentTablePopup = React.lazy(
	() => import(/* webpackChunkName: "ParentTablePopup" */ './Components/ParentTablePopup/ParentTablePopup'),
);

function App() {
	const { screenBuilder } = useScreenBuilderContext();
	return (
		<div className="App">
			<DxDbeHeader tableName={TableInstanceManager.ORIGINAL_TABLE} />
			<ParentTablePopup />
			{!screenBuilder.isScreenBuilderOn ? (
				<OriginalTable height={undefined} />
			) : (
				<ScreenBuilder isScreenBuilder={true} />
			)}
		</div>
	);
}

export default App;
