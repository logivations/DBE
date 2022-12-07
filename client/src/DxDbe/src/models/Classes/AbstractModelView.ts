/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {CellType} from '../Enums';
import IAbstractModelView from '../Interfaces/IAbstractModelView';
import ParameterizedUnit from './ParameterizedUnit';
import ColumnDataType, {CustomColumnDataTypes} from '../Enums/ColumnDataType';
import InputType from '../Enums/InputType';

abstract class AbstractModelView implements IAbstractModelView {
	public unit: ParameterizedUnit;

	protected constructor(
		public cellType: CellType,
		public dependsOnParam: string,
		public format: string,
		public hint: string,
		public isEditable: boolean,
		unit: ParameterizedUnit,
		public width: number,
	) {
		this.unit = ParameterizedUnit.create(unit);
	}

	abstract getHeader(): string;

	public getUnits(): ParameterizedUnit {
		return this.unit;
	}

	public getCellType(): CellType {
        return this.cellType;
    }

	public getHint(): string {
		return this.hint || null;
	}

	public getColumnType(): ColumnDataType | CustomColumnDataTypes {
		switch (this.cellType) {
			case CellType.CHECK_BOX_CELL:
				return ColumnDataType.BOOLEAN;
			case CellType.DROP_DOWN_CELL:
				return ColumnDataType.ENUM;
			case CellType.NUMBER_CELL:
				return ColumnDataType.NUMBER;
			case CellType.COLOR_BOX_CELL:
				return CustomColumnDataTypes.COLOR_PICKER;
			case CellType.TEXT_CELL:
			case CellType.FOREIGN_KEY_CELL:
				return ColumnDataType.STRING;
			case CellType.DATE_CELL:
				return ColumnDataType.DATA;
			case CellType.TIME_CELL:
				return ColumnDataType.DATETIME;
			default:
				return ColumnDataType.STRING;
		}
	}

	public getTypeForFilterSetting(): ColumnDataType {
		switch (this.cellType) {
			case CellType.CHECK_BOX_CELL:
				return ColumnDataType.BOOLEAN;
			case CellType.DROP_DOWN_CELL:
				return ColumnDataType.OBJECT;
			case CellType.COLOR_BOX_CELL:
			case CellType.TEXT_CELL:
			case CellType.FOREIGN_KEY_CELL:
				return ColumnDataType.STRING;
			case CellType.NUMBER_CELL:
				return ColumnDataType.NUMBER;
			case CellType.DATE_CELL:
				return ColumnDataType.DATA;
			case CellType.TIME_CELL:
				return ColumnDataType.DATETIME;
			default:
				return ColumnDataType.STRING;
		}
	}

	// 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' |
	// 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox'
	public getInputType(): InputType {
		switch (this.cellType) {
			case CellType.CHECK_BOX_CELL:
				return InputType.CheckBox;
			case CellType.DROP_DOWN_CELL:
				return InputType.SelectBox;
			case CellType.NUMBER_CELL:
				return InputType.NumberBox;
			case CellType.COLOR_BOX_CELL:
				return InputType.ColorBox;
			case CellType.TEXT_CELL:
				return InputType.TextBox;
			case CellType.LARGE_TEXT_CELL:
				return InputType.TextArea;
			case CellType.FOREIGN_KEY_CELL:
				return InputType.TextBox;
			case CellType.DATE_CELL:
				return InputType.DateBox;
			case CellType.TIME_CELL:
				return InputType.DateBox;
			default:
				return InputType.TextBox;
		}
	}

	public isHideOnCloneOrAdding() {
		return false;
	}
}

export default AbstractModelView;
