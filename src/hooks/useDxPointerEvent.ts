/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { useCallback, useEffect } from 'react';
import { off, on } from 'devextreme/events';
import { ColumnModel } from '../models/Classes';
import { CellType } from '../models/Enums';
import { isDefined } from '../utils/utils';
import TFunction from '../models/Types/Types';

const useDxPointerDownEvent = (isFormValid: TFunction, column: ColumnModel, filterValue) => {
	const isValid = useCallback(() => {
		if (column.getCellType() === CellType.FOREIGN_KEY_CELL) {
			return Array.isArray(filterValue) ? filterValue.every((value) => isDefined(value)) : isDefined(filterValue);
		}
		return isFormValid();
	}, [isFormValid, filterValue]);
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
	}, [isValid, filterValue]);
};

export default useDxPointerDownEvent;
