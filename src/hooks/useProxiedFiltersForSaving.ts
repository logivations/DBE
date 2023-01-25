/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback, useEffect, useState } from 'react';

const useProxiedFiltersForSaving = (tableInstance, settingElements, editSetting, shareUnshareSetting) => {
	const [dataSource, setDataSource] = useState([]);
	const setProxiedSettings = useCallback(
		(filters) => {
			const res = (() => {
				if (Array.isArray(filters)) {
					return filters;
				}
				return filters(dataSource);
			})();
			const proxiedSettingElements = res.map((settEl) => {
				return new Proxy(settEl, {
					set(target, prop, val) {
						target[prop] = val;
						if (prop === 'isShared') {
							if (target.isShared) {
								target.originalWarehouseId = tableInstance.originalWarehouseId;
							} else {
								target.originalWarehouseId = null;
							}
							shareUnshareSetting(target.objectId, target.isShared);
						} else {
							editSetting(target);
						}
						return true;
					},
				});
			});

			setDataSource(proxiedSettingElements);
		},
		[dataSource],
	);

	useEffect(() => {
		setProxiedSettings(settingElements);
	}, [settingElements]);

	return [dataSource, setProxiedSettings];
};

export default useProxiedFiltersForSaving;
