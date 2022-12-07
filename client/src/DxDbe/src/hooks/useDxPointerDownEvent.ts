/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import React, { useCallback, useEffect } from 'react';
import { off, on } from 'devextreme/events';

const useDxPointerDownEvent = (formRef) => {
	const isValid = useCallback(() => formRef?.current?.instance.validate().isValid, [formRef]);
	useEffect(() => {
		const event = (e) => {
			if (isValid()) {
				off(document.body, 'dxpointerdown');
			} else {
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
		};
		on(document.body, 'dxpointerdown', event);
		return () => {
			off(document.body, 'dxpointerdown');
		};
	}, [isValid]);
};

export default useDxPointerDownEvent;
