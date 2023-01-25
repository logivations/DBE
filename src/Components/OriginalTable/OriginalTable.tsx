/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React from 'react';
import TableInstanceManager from '../../services/TableInstanceManager/TableInstanceManager';
import ScreenBuilder from '../ScreenBuilder/ScreenBuilder';
import useScreenBuilderContext from '../../context/ScreenBuilderContext';

const DbeDataGrid = React.lazy(() => import(/* webpackChunkName: "DbeDataGrid" */ '../DbeDataGrid/DbeDataGrid'));

const OriginalTable = ({ height = undefined }) => {
	const { parentChildTable } = useScreenBuilderContext();
	return parentChildTable.childParentTable ? (
		<ScreenBuilder isScreenBuilder={false} />
	) : (
		<DbeDataGrid tableName={TableInstanceManager.ORIGINAL_TABLE} height={height} initialFilter={null}
					 saveButtonVisibility={false} />
	);
};

export default OriginalTable;
