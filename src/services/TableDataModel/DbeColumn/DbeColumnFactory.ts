/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { CellType } from '../../../models/Enums';
import { AbstractColumnModel, ColumnModel, InputParameterModel } from '../../../models/Classes';
import DbeEnumType from './DbeEnumColumn';
import DbeForeignKeyType from './DbeForeignKeyColumn';
import DbeCheckboxType from './DbeCheckboxColumn';
import DbeColorType from './DbeColorColumn';
import DbeTextType from './DbeTextColumn';
import DbeDataType from './DbeDataColumn';
import DbeCommonType from './DbeCommonColumn';
import DbeNumericType from './DbeNumericColumn';
import DbeTimeColumn from './DbeTimeColumn';

function DbeTypesFactory(model: InputParameterModel | ColumnModel, baseClass): AbstractColumnModel {
	const cellType = model.getViewModel().getCellType();
	switch (cellType) {
		case CellType.DROP_DOWN_CELL:
			return new (DbeEnumType(baseClass))(model);
		case CellType.COLOR_BOX_CELL:
			return new (DbeColorType(baseClass))(model);
		case CellType.FOREIGN_KEY_CELL:
			return new (DbeForeignKeyType(baseClass))(model);
		case CellType.CHECK_BOX_CELL:
			return new (DbeCheckboxType(baseClass))(model);
		case CellType.NUMBER_CELL:
			return new (DbeNumericType(baseClass))(model);
		case CellType.TEXT_CELL:
		case CellType.LARGE_TEXT_CELL:
			return new (DbeTextType(baseClass))(model);
		case CellType.DATE_CELL:
			return new (DbeDataType(baseClass))(model);
		case CellType.TIME_CELL:
			return new (DbeTimeColumn(baseClass))(model);
		default:
			return new (DbeCommonType(baseClass))(model);
	}
}

export default DbeTypesFactory;
