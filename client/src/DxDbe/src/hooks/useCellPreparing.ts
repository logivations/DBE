/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {useCallback} from 'react';
import {CssClasses, RowTypes, ValidationTypes} from '../constants/DataGridConstants';
import CompareTableDataModel from "../services/TableDataModel/CompareTableDataModel";

const useCellPreparing = (tableInstance) => {
	const addInvalidCellClass = useCallback(
		({ cellElement }) => cellElement.classList.add(CssClasses.INVALID_CELL),
		[],
	);
	const validateAllCells = useCallback((e) => {
		if (e.rowType === RowTypes.DATA && e.column.validationRules) {
			e.column.validationRules.forEach((rule) => {
				switch (rule.type) {
					case ValidationTypes.ASYNC:
						rule.validationCallback({ data: e.row.data, value: e.value }).then((res) => {
							!res && addInvalidCellClass(e);
						});
						break;
					case ValidationTypes.REQUIRED:
						e.value === null && addInvalidCellClass(e);
						break;
					case ValidationTypes.NUMERIC:
						break;
					case ValidationTypes.STRING_LENGTH:
						if (rule.max) {
							(e.value && e.value.length) > rule.max && addInvalidCellClass(e);
						}
						break;
					case ValidationTypes.CUSTOM:
						!rule.validationCallback({ value: e.value }) && addInvalidCellClass(e);
						break;
				}
			});
		}
	}, []);

	const highlightCellsAfterComparing = useCallback((e, tableInstance) => {
		if (e.rowType === RowTypes.DATA && e.column.dataField) {
			const color = tableInstance
				.getTableDataModel()
				.getCompareTableResultColorCell(e.row.dataIndex, e.column.dataField);
			color && (e.cellElement.style.backgroundColor = color);
		}
	}, []);

	return useCallback((e) => {
		validateAllCells(e);
		if (tableInstance && tableInstance.getTableDataModel() instanceof CompareTableDataModel) {
			highlightCellsAfterComparing(e, tableInstance);
		}
	}, [tableInstance]);
};

export default useCellPreparing;
