/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useMemo} from "react";
import {WarehouseTypeForHelp, WarehouseUiType} from "../models/Enums/Table";
import {generateQueryParams} from "../utils/urlUtils";
import TableInstance from "../services/TableInstanceManager/TableInstance";

const useHelpLink = (tableInstance: TableInstance, link?: string) => {
    const warehouseId = useMemo(() => tableInstance.warehouseId, []);
    const uiType = useMemo(() => tableInstance.warehouseUiType, []);
    const layoutTypeTopic = WarehouseTypeForHelp[WarehouseUiType[uiType]];
    const queryParams = generateQueryParams({warehouseId: warehouseId});

    const helpLink = useMemo(() => {
        if (link) {
            const [topic, section, subSection] = link.split('/');

            const helpUrl = new URL(`${location.origin}${global.CONTEXT_PATH}/view/help/${layoutTypeTopic}/${topic || ''}/${section || ''}?${queryParams}`);
            subSection && (helpUrl.hash = subSection);
            return helpUrl;
        }}, [link]);
    return [helpLink];
};

export const useDbeActionsHelpLink = (uiType: number, dbeAction: string) => {
    const warehouseId = window['WAREHOUSE_ID'];
    const layoutTypeTopic = WarehouseTypeForHelp[WarehouseUiType[uiType]];
    const queryParams = generateQueryParams({warehouseId: warehouseId});
    return useMemo(() => {
        const dbeActionsLink = new URL(window.location.toString());
        dbeActionsLink.pathname = `${window['CONTEXT_PATH']}/view/help/${layoutTypeTopic}/direct-edit/dbe-actions?${queryParams}`;
        dbeActionsLink.hash = dbeAction;
        return dbeActionsLink;
    }, [uiType, dbeAction]);
};

export default useHelpLink;