/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/


export const generateQueryParams = (params) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([paramName, value]) => {
        value !== null && value !== undefined && queryParams.append(paramName, value.toString());
    });
    return queryParams.toString();
};