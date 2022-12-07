/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import CommonColumnsNames from "../constants/CommonColumnsNames";

const isCommonColumn = (columnName) => {
    for (const name in CommonColumnsNames) {
        if (Object.hasOwn(CommonColumnsNames, name)) {
            if (CommonColumnsNames[name].equalsIgnoreCase(columnName)) {
                return true;
            }
        }
    }
    return false;
};

export default isCommonColumn;