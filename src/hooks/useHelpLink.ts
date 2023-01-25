/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useMemo } from 'react';
import { WarehouseTypeForHelp, WarehouseUiType } from '../models/Enums/Table';
import TableInstance from '../services/TableInstanceManager/TableInstance';

const useHelpLink = (tableInstance: TableInstance, link?: string) => {
	const warehouseId = window['WAREHOUSE_ID'];
	const uiType = useMemo(() => tableInstance.warehouseUiType, [tableInstance]);
	const layoutTypeTopic = WarehouseTypeForHelp[WarehouseUiType[uiType]];

	const helpLink = useMemo(() => {
		if (link) {
			const [topic, section, subSection] = link.split('/');
			const helpUrl = new URL(
				`${window.location.origin}${global.CONTEXT_PATH}/view/help/${layoutTypeTopic}/${topic || ''}/${section || ''}`,
			);
			helpUrl.searchParams.append('warehouseId', warehouseId.toString());
			subSection && (helpUrl.hash = subSection);
			return helpUrl;
		}
	}, [link]);
	return [helpLink];
};

export const useDbeActionsHelpLink = (uiType: number, dbeAction: string) => {
	const warehouseId = window['WAREHOUSE_ID'];
	const layoutTypeTopic = WarehouseTypeForHelp[WarehouseUiType[uiType]];
	return useMemo(() => {
		const dbeActionsLink = new URL(`${window.location.origin}`);
		dbeActionsLink.pathname = `${window['CONTEXT_PATH']}/view/help/${layoutTypeTopic}/direct-edit/dbe-actions`;
		dbeActionsLink.searchParams.append('warehouseId', warehouseId);
		dbeActionsLink.hash = dbeAction;
		return dbeActionsLink;
	}, [uiType, dbeAction]);
};

export default useHelpLink;
