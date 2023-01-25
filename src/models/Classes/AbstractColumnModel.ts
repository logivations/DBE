/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { IAbstractColumnModel, IAbstractModelView } from '../Interfaces';
import { CellType, ColumnDataType, MySqlDataType, Unit } from '../Enums';
import ColumnRestriction from './ColumnRestriction';
import ForeignKeyInfo from './ForeignKeyInfo';
import AbstractParameters from './AbstractParameters';
import { ColumnModel, ColumnViewModel, MySqlColumnType } from './index';
import TableActionParameterViewModel from './TableActionParameterViewModel';
import { CustomColumnDataTypes } from '../Enums/ColumnDataType';
import TableDataModel from '../../services/TableDataModel/TableDataModel';
import MassUpdateOperation from './MassUpdateOperation';
import TFunction from '../Types/Types';

abstract class AbstractColumnModel implements IAbstractColumnModel {
	public columnType: MySqlColumnType;

	public columnRestriction: ColumnRestriction;
	public foreignKeyInfo: ForeignKeyInfo;
	public abstractParametersSafe: AbstractParameters<AbstractParameters<any>>;
	public defaultValue: any;
	public format: string;
	public measurementAcronymSafe: string;
	public modelView: IAbstractModelView;
	public primaryKeyOrdinalPosition: number;
	public uniqueKeyOrdinalPosition: number;
	public unitSafe: Unit;

	public rules = [];

	public getMetadata: TFunction;

	protected constructor(
		columnRestriction: ColumnRestriction,
		columnType: MySqlColumnType,
		defaultValue: any,
		foreignKeyInfo: ForeignKeyInfo,
		format: string,
		measurementAcronymSafe: string,
		modelView: IAbstractModelView,
		primaryKeyOrdinalPosition: number,
		uniqueKeyOrdinalPosition: number,
		unitSafe: Unit,
		abstractParametersSafe: AbstractParameters<AbstractParameters<any>>,
		getMetadata: TFunction,
	) {
		this.setColumnRestrictions(columnRestriction);
		this.setColumnType(columnType);

		this.defaultValue = defaultValue;
		this.format = format;
		this.measurementAcronymSafe = measurementAcronymSafe;
		this.modelView = modelView;
		this.primaryKeyOrdinalPosition = primaryKeyOrdinalPosition;
		this.uniqueKeyOrdinalPosition = uniqueKeyOrdinalPosition;
		this.unitSafe = unitSafe;
		this.abstractParametersSafe = abstractParametersSafe;
		this.getMetadata = getMetadata;
	}

	abstract getViewModel(): ColumnViewModel | TableActionParameterViewModel;

	abstract getIsRequired(): boolean;

	abstract getName(): string;

	abstract setDefaultValidationRules();

	protected setForeignKeyInfo(foreignKeyInfo?: ForeignKeyInfo): AbstractColumnModel {
		this.foreignKeyInfo = ForeignKeyInfo.create(foreignKeyInfo, this.getName());
		return this;
	}

	protected setColumnRestrictions(columnRestriction?: ColumnRestriction) {
		this.columnRestriction = ColumnRestriction.create(columnRestriction);
		return this;
	}

	protected setColumnType(columnType?: MySqlColumnType) {
		this.columnType = MySqlColumnType.create(columnType);
		return this;
	}

	protected setGetMetadata(getMetadata: TFunction) {
		this.getMetadata = getMetadata;
		return this;
	}

	public getForeignCellData(columnData, extraData?, operation?): object {
		return this.foreignKeyInfo.getForeignCellData(columnData, extraData, operation);
	}

	public getForeignKeyInfo(): ForeignKeyInfo {
		return this.foreignKeyInfo;
	}

	public getCellType(): CellType {
		return this.getViewModel().getCellType();
	}

	public getCaption(): string {
		return this.getViewModel().getHeader();
	}

	public getColumnTypeObject(): MySqlColumnType {
		return this.columnType || new MySqlColumnType();
	}

	public getColumnRestriction(): ColumnRestriction {
		return this.columnRestriction || new ColumnRestriction();
	}

	public getMaxValue(): string {
		return this.getColumnRestriction().maxValue;
	}

	public getIsEditable(): boolean {
		return this.getViewModel().isEditable;
	}

	public getColumnDataType(): ColumnDataType | CustomColumnDataTypes {
		return this.getViewModel().getColumnType();
	}

	public getHint(): string {
		return this.getViewModel().hint || '';
	}

	public getMaxLength(): number {
		return this.getColumnTypeObject().maxLength;
	}

	public getFraction(): number {
		return this.getColumnTypeObject().fraction || 0;
	}

	public getFormat(): string {
		return this.getViewModel().getFormat();
	}

	public getColumnType(): MySqlDataType {
		return this.getColumnTypeObject().type;
	}

	public getPrimaryKeyColumnName(): string | null | undefined {
		return null;
	}

	public getFooterAction(): string {
		return null;
	}

	public getDxFormat(): object {
		return {};
	}

	public setTableDataModel(tableDataModel: TableDataModel) {
		return null;
	}

	public getValidatorForAsyncRule(value, rowData) {
		return null;
	}

	public getChildren() {
		return [];
	}

	public getDefaultOptionForFilterSetting() {
		return null;
	}

	public getFilterOperationForComparing() {
		return null;
	}

	public getCellRender(extraData?: any): any {
		return null;
	}

	public getEditCellRender() {
		return null;
	}

	public getFormCellRender(extraData?: any, disabled = false, operation?: MassUpdateOperation): any {
		return null;
	}

	public getDefaultInputParameters() {
		return null;
	}

	public getInputParameters() {
		return null;
	}

	public getEditorOptionsForInputParameters() {
		return null;
	}

	public getDefaultColumnParameters() {
		return null;
	}

	public getColumnParameters() {
		return null;
	}

	public getEnumDataSource() {
		return [];
	}

	public getDefaultEditorOptions() {
		return null;
	}

	public getDefaultValue() {
		return null;
	}

	public setMassiveUpdateOperations(massiveUpdateOperations: MassUpdateOperation[]) {
		return null;
	}

	public setIsMassiveUpdateField(isMassiveUpdateField: boolean): ColumnModel {
		return null;
	}

	public setActionId(actionId: number) {
		return null;
	}

	public getCellRenderForFilterBuilder(value: number) {
		return null;
	}

	public getEditorOptionsForFilterBuilder(value, onValueChangedHandler): any {
		return null;
	}

	public getDefaultColumnEditorOptions() {
		return null;
	}

	public getColumnEditorOptions() {
		return null;
	}

	public getValidatorName() {
		return null;
	}
}

export default AbstractColumnModel;
