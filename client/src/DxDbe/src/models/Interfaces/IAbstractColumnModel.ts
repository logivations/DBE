/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {AbstractParameters, ColumnModel, ColumnRestriction, ColumnViewModel, ForeignKeyInfo, MySqlColumnType,} from '../Classes';
import {CellType, MySqlDataType, Unit} from '../Enums';
import {IAbstractModelView} from './index';
import TableActionParameterViewModel from '../Classes/TableActionParameterViewModel';
import MassUpdateOperation from '../Classes/MassUpdateOperation';
import TableDataModel from '../../services/TableDataModel/TableDataModel';

interface IAbstractColumnModel {
    foreignKeyInfo?: ForeignKeyInfo;
    columnRestriction?: ColumnRestriction;
    modelView?: IAbstractModelView;
    measurementAcronymSafe?: string;
    unitSafe?: Unit;
    abstractParametersSafe?: AbstractParameters<AbstractParameters<any>>;
    columnType?: MySqlColumnType;
    format?: string;
	columnName?: string;
	defaultValue?: any;
	isRequired?: boolean;
	primaryKeyOrdinalPosition?: number;
	uniqueKeyOrdinalPosition?: number;

	rules;

	getName(): string;
	getViewModel(): ColumnViewModel | TableActionParameterViewModel;
	getMaxLength(): number;
	getIsRequired(): boolean;
	getColumnRestriction(): ColumnRestriction;
	getMaxValue(): string;
	getFraction(): number;
	getEnumDataSource();
	setActionId(actionId: number);

	getDefaultInputParameters();
	getInputParameters();
	getEditorOptionsForInputParameters();
	getDefaultEditorOptions();

	getDefaultColumnParameters();
	getColumnParameters();

	getDefaultOptionForFilterSetting();

	getForeignCellData(columnData, extraData?, extraForeignKeyData?, operation?: MassUpdateOperation);
	getFormCellRender(extraData?: any, extraForeignKeyData?: any, operation?: MassUpdateOperation);
	getForeignDataForInputParam(value, columnName?);

	getEditCellRender();

	getFilterOperationForComparing();

	getChildren();
	getDefaultValue();

	getCellRender(extraData?: any): any;

	setMassiveUpdateOperations(massiveUpdateOperations: MassUpdateOperation[]);
	setIsMassiveUpdateField(isMassiveUpdateField: boolean): ColumnModel;
	setTableDataModel(tableDataModel: TableDataModel);
	getCellRenderForFilterBuilder(value: number);
	getEditorOptionsForFilterBuilder(value, onValueChangedHandler);

	getDefaultColumnEditorOptions();
	getFormat(): string;

	getColumnType(): MySqlDataType;
	getValidatorName(): string | null;

	getIsEditable(): boolean;

	setForeignKeyData();
	getCellType(): CellType
}

export default IAbstractColumnModel;
