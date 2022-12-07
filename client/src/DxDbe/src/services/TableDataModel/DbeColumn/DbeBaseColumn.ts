// /*******************************************************************************
//  * (C) Copyright
//  * Logivations GmbH, Munich 2010-2022
//  ******************************************************************************/
//
// import { ColumnModel } from '../../../models/Classes';
// import { ColumnDataType, MySqlDataType } from '../../../models/Enums';
// import { CustomColumnDataTypes } from '../../../models/Enums/ColumnDataType';
// import TableDataModel from '../TableDataModel';
// import { asyncValidation, getAsyncRule, getRequiredRule } from '../../../Components/common/DbeColumnChildrens';
// import { DxOperations } from '../../../constants/FilterBuilderConstants';
// import { SimpleValidators } from '../../../models/Enums/Validators';
//
// abstract class DbeBaseColumn extends ColumnModel{
// 	public tableDataModel: TableDataModel = null;
// 	public rules: any = [];
//
// 	protected constructor(model: object) {
// 		super(model);
// 		this.setDefaultValidationRules();
// 	}
//
// 	public setTableDataModel(tableDataModel: TableDataModel) {
// 		this.tableDataModel = tableDataModel;
// 	}
//
// 	public setDefaultValidationRules() {
// 		if (this.getIsRequired()) {
// 			this.rules.push(getRequiredRule(this.getName()));
// 		}
// 		if (this.getValidators()) {
// 			const validationOptionsToActionParams = this.validationOptionsToActionParams.bind(this);
// 			const checkIsValidatorRelated = SimpleValidators[this.getValidators()[0].customValidatorType];
// 			// this checking was added only for Massive Update, because there are can only one input, so we need
// 			// to exclude async validators when value should be compared with another value (for example min/max weight)
// 			// there are should be only simple validation
// 			if ((this.isMassiveUpdateField && checkIsValidatorRelated) || !this.isMassiveUpdateField) {
// 				this.rules.push(
// 					getAsyncRule(
// 						this.getName(),
// 						validationOptionsToActionParams,
// 						this.getValidatorName(),
// 						this.getTypeOfColumn(),
// 					),
// 				);
// 			}
// 		}
// 	}
//
// 	public getName(): string {
// 		return this.columnName || '';
// 	}
//
// 	public getColumnDataType(): ColumnDataType | CustomColumnDataTypes {
// 		return super.getViewModel().getColumnType();
// 	}
//
// 	public getDataTypeForFilter(): ColumnDataType {
// 		return super.getViewModel().getTypeForFilterSetting();
// 	}
//
// 	public getCaption(): string {
// 		return super.getViewModel().header || '';
// 	}
//
// 	public getWidth(): number | string {
// 		return super.getViewModel().width + 30 || 150;
// 	}
//
// 	public getFooterAction(): string {
// 		return super.getViewModel().footerAction;
// 	}
//
// 	public getFraction(): number {
// 		return super.getColumnType().fraction || 0;
// 	}
//
// 	public getMaxLength(): number {
// 		return super.getColumnType().maxLength;
// 	}
//
// 	public getIsRequired() {
// 		return this.isRequired;
// 	}
//
// 	public validationOptionsToActionParams(value, columnName, row) {
// 		return this.tableDataModel.validationOptionsToActionParams(value, columnName, row);
// 	}
//
// 	public getPrimaryKeyColumnName(): string | null | undefined {
// 		return this.primaryKeyOrdinalPosition !== undefined ? this.columnName : null;
// 	}
//
// 	public getValidationRules(): any {
// 		return null;
// 	}
//
// 	public getValidatorForAsyncRule = (value, rowData) => {
// 		const validationOptionsToActionParams = this.validationOptionsToActionParams.bind(this)(
// 			value,
// 			this.getName(),
// 			rowData,
// 		);
// 		return asyncValidation(this.getName(), validationOptionsToActionParams);
// 	};
//
// 	public getChildren(): any {
// 		return [];
// 	}
//
// 	public getCellRender(extraData?: any): any {
// 		return null;
// 	}
//
// 	public getFormCellRender(): any {
// 		return null;
// 	}
//
// 	public getEditCellRender(): any {
// 		return null;
// 	}
//
// 	public getCellRenderForFilterBuilder(value: number): null {
// 		return null;
// 	}
//
// 	public getIsEditable(): boolean {
// 		return this.getViewModel().isEditable;
// 	}
//
// 	public getHint(): string {
// 		return this.getViewModel().hint;
// 	}
//
// 	public getTypeOfColumn(): MySqlDataType {
// 		return this.getColumnType().type;
// 	}
//
// 	public getEditorOptionsForFilterBuilder(value, onValueChangedHandler) {
// 		return {
// 			onValueChanged: onValueChangedHandler,
// 			value: value,
// 		};
// 	}
//
// 	public getFilterOperationForComparing(): DxOperations[] {
// 		return [DxOperations.EQUALS, DxOperations.ANY_OF, DxOperations.SEARCH_IN_TEXT];
// 	}
//
// 	abstract getColumnParameters();
//
// 	abstract getColumnParametersForFilterSetting(editorParams);
//
// 	abstract getDefaultValue(value?: any);
//
// 	public getDefaultOptionForFilterSetting() {
// 		return {
// 			key: this.getName(),
// 			dataField: this.getName(),
// 			dataType: this.getDataTypeForFilter(),
// 		};
// 	}
//
// 	public getDefaultColumnParameters(): object {
// 		const cellKeyFn = ({ column, row: { key } }) => `${column.dataField}-${JSON.stringify(key)}`;
// 		return {
// 			key: this.getName(),
// 			dataField: this.getName(),
// 			dataType: this.getColumnDataType(),
// 			width: this.getWidth(),
// 			caption: this.getCaption(),
// 			cellRender: this.getCellRender(),
// 			editCellRender: this.getEditCellRender(),
// 			allowEditing: this.getIsEditable(),
// 			cellKeyFn,
// 		};
// 	}
// }
//
// export default DbeBaseColumn;
