/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { CellType } from '../Enums';
import { ParameterizedUnit } from '../Classes';
import ColumnDataType, { CustomColumnDataTypes } from '../Enums/ColumnDataType';
import InputType from '../Enums/InputType';

interface IAbstractModelView {
	name?: any;
	cellType?: CellType;
	unit?: ParameterizedUnit;
	hint?: string;
	dependsOnParam?: string;
	format?: string;
	isEditable?: boolean;
	width?: number;

	getUnits(): ParameterizedUnit;

	getCellType(): CellType;

	getColumnType(): ColumnDataType | CustomColumnDataTypes;

	getInputType(): InputType;
}

export default IAbstractModelView;
