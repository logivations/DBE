/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import AbstractColumnModel from './AbstractColumnModel';
import ColumnRestriction from './ColumnRestriction';
import TableActionParameterViewModel from './TableActionParameterViewModel';
import { getAsyncRuleForInput, getRequiredRule } from '../../Components/common/DbeColumnChildrens';
import TFunction from '../Types/Types';

class InputParameterModel extends AbstractColumnModel {
	public tableActionParameterViewModel: TableActionParameterViewModel;
	public isMandatory: boolean;
	public parameterName: string;
	public isSaveLastInput: boolean;

	public height: string;
	private spLink: string;

	public rules = [];

	public actionId: number;

	constructor(model: any) {
		super(
			model.columnRestriction,
			model.columnType,
			model.defaultValue,
			model.foreignKeyInfo,
			model.format,
			model.measurementAcronymSafe,
			model.modelView,
			model.primaryKeyOrdinalPosition,
			model.uniqueKeyOrdinalPosition,
			model.unitSafe,
			model.abstractParametersSafe,
			model.getMetadata,
		);

		this.isMandatory = model.isMandatory;
		this.parameterName = model.parameterName;
		this.actionId = model.actionId;

		this.defaultValue = model.defaultValue;
		this.columnType = model.columnType;
		this.tableActionParameterViewModel = model.tableActionParameterViewModel;
		this.setForeignKeyInfo(model.foreignKeyInfo);
		this.setDefaultValidationRules();
	}

	public static createInputParametersModels(inputParameterModels: InputParameterModel[], getMetadata: TFunction) {
		return inputParameterModels.map((col) => InputParameterModel.create(col, getMetadata));
	}

	public static create(inputParameterModel: { [key: string]: any }, getMetadata): InputParameterModel {
		const parametersModel = new InputParameterModel(inputParameterModel);
		parametersModel.setColumnViewModel(inputParameterModel.tableActionParameterViewModel);
		parametersModel.setGetMetadata(getMetadata);
		return parametersModel;
	}

	public setColumnViewModel(tableActionParameterViewModel) {
		this.tableActionParameterViewModel = TableActionParameterViewModel.create(tableActionParameterViewModel);
		return this;
	}

	public setActionId(actionId: number): this {
		this.actionId = actionId;
		return this;
	}

	public getIsRequired(): boolean {
		return this.isMandatory;
	}

	public getName(): string {
		return this.parameterName || '';
	}

	public getViewModel(): TableActionParameterViewModel {
		return this.tableActionParameterViewModel || TableActionParameterViewModel.create({});
	}

	public getDependsOnParamsList(): [string, boolean][] {
		return this.getViewModel()
			.getDependsOnParamsList()
			.map((item) => [item.replace('!', ''), /!(.*)/.test(item)]);
	}

	public setDefaultValidationRules() {
		if (this.getIsRequired()) {
			this.rules.push(getRequiredRule(this.getName()));
		}
		this.rules.push(
			getAsyncRuleForInput(this.getName(), this.actionId, () => this.getMetadata().getTable().getTableName()),
		);
	}

	public getChildren(): any {
		return [];
	}

	public getColumnRestriction(): ColumnRestriction {
		return this.columnRestriction;
	}

	public getInputParameters() {
		return null;
	}

	public getDefaultInputParameters(): object {
		return {
			name: this.getName(),
			dataField: this.getName(),
			editorType: this.getViewModel().getInputType(),
			key: this.getName(),
			label: { text: this.getCaption() },
		};
	}

	public getDefaultEditorOptions(): object {
		return {
			name: this.getName(),
			dataField: this.getName(),
			width: 'auto',
		};
	}
}

export default InputParameterModel;
