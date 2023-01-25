/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { ParameterizedUnit } from './index';
import { CellType } from '../Enums';
import AbstractModelView from './AbstractModelView';

class ColumnViewModel extends AbstractModelView {
	public defaultValue?: any;
	public color?: string;
	public footerAction?: string;
	public header?: string;
	public usedFoAggregation?: boolean;
	public usedForGroupAction?: boolean;
	public isZeroAsAny?: boolean;
	public isClearOnClone?: boolean;
	public isHideOnCLone?: boolean;

	constructor(
		cellType?: CellType,
		unit?: ParameterizedUnit,
		hint?: string,
		dependsOnParam?: string,
		format?: string,
		isEditable?: boolean,
		width?: number,
		defaultValue?: any,
		color?: string,
		footerAction?: string,
		header?: string,
		usedFoAggregation?: boolean,
		usedForGroupAction?: boolean,
		isZeroAsAny?: boolean,
		isClearOnClone?: boolean,
		isHideOnCLone?: boolean,
	) {
		super(cellType, dependsOnParam, format, hint, isEditable, unit, width);
		this.defaultValue = defaultValue;
		this.color = color;
		this.footerAction = footerAction;
		this.header = header;
		this.usedFoAggregation = usedFoAggregation;
		this.usedForGroupAction = usedForGroupAction;
		this.isZeroAsAny = isZeroAsAny;
		this.isClearOnClone = isClearOnClone;
		this.isHideOnCLone = isHideOnCLone;
	}

	public static create(columnViewModel?: ColumnViewModel): ColumnViewModel {
		return columnViewModel
			? new ColumnViewModel(
					columnViewModel.cellType,
					columnViewModel.unit,
					columnViewModel.hint,
					columnViewModel.dependsOnParam,
					columnViewModel.format,
					columnViewModel.isEditable,
					columnViewModel.width,
					columnViewModel.defaultValue,
					columnViewModel.color,
					columnViewModel.footerAction,
					columnViewModel.header,
					columnViewModel.usedFoAggregation,
					columnViewModel.usedForGroupAction,
					columnViewModel.isZeroAsAny,
					columnViewModel.isClearOnClone,
					columnViewModel.isHideOnCLone,
			  )
			: new ColumnViewModel();
	}

	public getHeader(): string {
		return this.header || '';
	}

	public getFormat(): string {
		return this.format || null;
	}

	public getDefaultValue() {
		if (this.defaultValue === 'FALSE') {
			return false;
		}
		if (this.defaultValue === 'TRUE') {
			return true;
		}
		return this.defaultValue;
	}

	public isHideOnCloneOrAdding() {
		return this.isHideOnCLone;
	}

	public getZeroAsAny() {
		return this.isZeroAsAny;
	}
}

export default ColumnViewModel;
