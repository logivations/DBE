/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {AggregationFunction, ColumnDataType, MySqlDataType} from '../Enums';
import AbstractColumnModel from './AbstractColumnModel';
import ColumnViewModel from './ColumnViewModel';
import CustomValidator from './CustomValidator';
import MassUpdateOperation from './MassUpdateOperation';
import TableDataModel from '../../services/TableDataModel/TableDataModel';
import {asyncValidationColumn, getAsyncRule, getRequiredRule} from '../../Components/common/DbeColumnChildrens';
import {DxOperations} from '../../constants/FilterBuilderConstants';
import {SimpleValidators} from '../Enums/Validators';

class ColumnModel extends AbstractColumnModel {
    public columnViewModel?: ColumnViewModel;
    public isRequired?: boolean;
    public columnName?: string;

    public spName?: string;
    public validators?: CustomValidator[];
    public position?: number;
    public aggregationFunction?: AggregationFunction;

	public massiveUpdateOperations: MassUpdateOperation[] = [];
	public isMassiveUpdateField = false;
	public tableDataModel = null;

	public rules = [];

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
		this.isRequired = model.isRequired;
		this.columnName = model.columnName;
		this.defaultValue = model.defaultValue;
		this.columnViewModel = model.columnViewModel;
		this.columnType = model.columnType;
		this.spName = model.spName;
		this.validators = model.validators;
		this.position = model.position;
		this.aggregationFunction = model.aggregationFunction;
		this.setForeignKeyInfo(model.foreignKeyInfo);
		this.setDefaultValidationRules();
	}

	public static createColumnModels(columnModels: ColumnModel[] = [], getMetadata): ColumnModel[] {
		return columnModels.map((col) => ColumnModel.create(col, getMetadata));
	}

	public static create(columnModel: ColumnModel = new ColumnModel({}), getMetadata): ColumnModel {
		const model = new ColumnModel(columnModel);
		model.setColumnViewModel(columnModel.columnViewModel);
		model.setColumnType(columnModel.columnType);
		model.setGetMetadata(getMetadata);
		return model;
	}

	private setColumnViewModel(columnViewModel?: ColumnViewModel) {
		this.columnViewModel = ColumnViewModel.create(columnViewModel);
		return this;
	}

	public getViewModel(): ColumnViewModel {
		return this.columnViewModel;
	}

	public getIsRequired(): boolean {
		return this.isRequired;
	}

	public getName(): string {
		return this.columnName || '';
	}

	public getHeader(): string {
		return this.getViewModel().getHeader();
	}

	public getCaption(): string {
        const measurementAcronym = this.getViewModel().getUnits().getMeasurementAcronym();
		if (measurementAcronym) {
			return this.getViewModel().getHeader() + ` [${measurementAcronym}]`;
		}
		return this.getViewModel().getHeader();
	}

	public async setForeignKeyData(data?: any) {
		return this;
	}

	public setMassiveUpdateOperations(massiveUpdateOperations: MassUpdateOperation[]) {
		this.massiveUpdateOperations = massiveUpdateOperations;
	}

	public getMassiveUpdateOperations(): MassUpdateOperation[] {
		return this.massiveUpdateOperations;
	}

	public setIsMassiveUpdateField(isMassiveUpdateField: boolean): ColumnModel {
		this.isMassiveUpdateField = isMassiveUpdateField;
		return this;
	}

	public getValidators(): CustomValidator[] | null {
		return this.validators && this.validators.length ? this.validators : null;
	}

	public getValidatorName(): string | null {
		return this.getValidators() ? this.getValidators()[0].customValidatorType : null;
	}

	public setTableDataModel(tableDataModel: TableDataModel) {
		this.tableDataModel = tableDataModel;
	}

	public getDataTypeForFilter(): ColumnDataType {
		return this.getViewModel().getTypeForFilterSetting();
	}

	public getWidth(): number | string {
		return this.getViewModel().width + 30 || 150;
	}

	public getFooterAction(): string {
		return this.getViewModel().footerAction;
	}

	public getMaxLength(): number {
		return super.getColumnTypeObject().maxLength;
	}

	public validationOptionsToActionParams(value, columnName, row) {
		return this.tableDataModel.validationOptionsToActionParams(value, columnName, row);
	}

	public getPrimaryKeyColumnName(): string | null | undefined {
		return this.primaryKeyOrdinalPosition !== undefined ? this.columnName : null;
	}

	public getValidationRules(): any {
		return this.rules;
	}

	public setDefaultValidationRules() {
		if (this.getIsRequired()) {
			this.rules.push(getRequiredRule(this.getName()));
		}
		if (this.getValidators()) {
			const validationOptionsToActionParams = this.validationOptionsToActionParams.bind(this);
			const checkIsValidatorRelated = SimpleValidators[this.getValidators()[0].customValidatorType];
			// this checking was added only for Massive Update, because there are can only one input, so we need
			// to exclude async validators when value should be compared with another value (for example min/max weight)
			// there are should be only simple validation
			if ((this.isMassiveUpdateField && checkIsValidatorRelated) || !this.isMassiveUpdateField) {
				this.rules.push(
					getAsyncRule(
						this.getName(),
						validationOptionsToActionParams,
						this.getValidatorName(),
						this.getTypeOfColumn(),
						() => this.getMetadata().getTable().getTableName()
					),
				);
			}
		}
	}

	public getValidatorForAsyncRule(value, rowData) {
		const validationOptionsToActionParams = this.validationOptionsToActionParams.bind(this)(
			value,
			this.getName(),
			rowData,
		);
		return asyncValidationColumn(this.getName(), validationOptionsToActionParams, this.getMetadata().getTable().getTableName());
    }

	public getChildren(): any {
		return [];
	}

	public getEditCellRender(): any {
		return null;
	}

	public getCellRenderForFilterBuilder(value: number): null {
		return null;
	}

	public getTypeOfColumn(): MySqlDataType {
		return this.getColumnTypeObject().type;
	}

	public getFilterOperationForComparing(): DxOperations[] {
		return [DxOperations.EQUALS, DxOperations.ANY_OF, DxOperations.SEARCH_IN_TEXT];
	}

	public getColumnParametersForFilterSetting(editorParams?) {
		return null;
    }

	public getDefaultValue(value?: any) {
		return null;
    }

	public getEditorOptionsForFilterBuilder(value, onValueChangedHandler): any {
		return {
			onValueChanged: onValueChangedHandler,
			value: value || this.getDefaultValue(),

		};
	}

	public getDefaultOptionForFilterSetting() {
		return {
			key: this.getName(),
			caption: this.getCaption(),
			dataField: this.getName(),
			dataType: this.getDataTypeForFilter(),
		};
	}

	public getDefaultColumnEditorOptions() {
		return {
			width: 'auto',
			hint: this.getHint(),
        };
	}

	public getDefaultColumnParameters(): object {
		const cellKeyFn = ({ column, row: { key } }) => `${column.dataField}-${JSON.stringify(key)}`;
		return {
			key: this.getName(),
			dataField: this.getName(),
			dataType: this.getColumnDataType(),
			width: this.getWidth(),
			caption: this.getCaption(),
			cellRender: this.getCellRender(),
			editCellRender: this.getEditCellRender(),
			allowEditing: this.getIsEditable(),
			cellValue: this.getDefaultValue(),
			editorOptions: {
                ...this.getColumnEditorOptions(),
            },
			cellKeyFn,
		};
	}
}

export default ColumnModel;
