/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import AbstractModelView from './AbstractModelView';

class TableActionParameterViewModel extends AbstractModelView {
	constructor(public name, private isNamePinned, hint, format, unit, cellType, dependsOnParam) {
		super(cellType, dependsOnParam, format, hint, true, unit, 0);
	}

	public static create(actionViewModel: { [key: string]: any }) {
		return new TableActionParameterViewModel(
			actionViewModel.name,
			actionViewModel.isNamePinned,
			actionViewModel.hint,
			actionViewModel.format,
			actionViewModel.unit,
			actionViewModel.cellType,
			actionViewModel.dependsOnParam,
		);
	}

	public getHeader(): string {
		return this.name || '';
	}

	public getFormat(): string {
		return this.format || null;
	}

	public getDependsOnParamsList(): string[] {
		return this.dependsOnParam ? this.dependsOnParam.split(', ') : [];
	}
}

export default TableActionParameterViewModel;
