/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback } from 'react';

const useComparingFilter = (setSelectedFilter) => {
	const onValueChange = useCallback((e) => {
		const model = e.component._model;
		const [firstFilter, , secondFilter] = model;
		if (firstFilter[0] === secondFilter[0] && firstFilter[1] === secondFilter[1]) {
			setSelectedFilter(() => e.value);
		}
	}, []);

	const onContentReady = useCallback((e) => {
		const model = e.component._model;
		const [firstFilter, , secondFilter] = model;
		if (firstFilter[0] !== secondFilter[0] || firstFilter[1] !== secondFilter[1]) {
			setSelectedFilter([model[0], 'and', model[0]]);
		}
	}, []);

	return [onValueChange, onContentReady];
};

export default useComparingFilter;
