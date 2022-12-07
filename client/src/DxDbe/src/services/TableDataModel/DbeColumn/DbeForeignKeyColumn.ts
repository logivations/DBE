/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import getButtonCell from '../../../Components/common/ButtonCell';
import communicator from '../../../api/Communicator';
import {getEditorComponent, getRequiredRule} from '../../../Components/common/DbeColumnChildrens';
import {DxOperations} from '../../../constants/FilterBuilderConstants';
import {DbeType} from '../../../models/Types/Types';
import MassUpdateOperation from "../../../models/Classes/MassUpdateOperation";

function DbeForeignKeyType<TBase extends DbeType>(BaseClass: TBase) {
	return class DbeForeignKey extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
		}

		public async setForeignKeyData(data?) {
			if (data) {
				await this.foreignKeyInfo.setForeignKeyData(data);
			} else {
				await communicator
					.getTableData(this.foreignKeyInfo.parentTable, {
						skip: 0,
						take: -1,
						isDictinct: true,
						dataField: [
							...Object.values(this.foreignKeyInfo.joinedKeyColumnNames),
							this.foreignKeyInfo.parentKeyColumnText,
						],
					})
					.then((data2) => {
						this.foreignKeyInfo.foreignKeyData = data2.data;
					});
			}
			return this;
		}

		public getColumnParameters() {
			return Object.assign(this.getDefaultColumnParameters(), {
				cssClass: 'foreign-btn-cell',
				allowEditing: false,
				allowSearch: false,
				allowHeaderFiltering: false,
			});
		}

		public getColumnEditorOptions() {
			return {
				...this.getDefaultColumnEditorOptions(),
			};
		}

		public getInputParameters() {
			return {
				...this.getDefaultInputParameters(),
			};
		}

		public getEditorOptionsForInputParameters() {
			return this.getDefaultEditorOptions();
		}

		public getChildren(): any {
			if (this.getIsRequired()) {
				return [getRequiredRule(this.getName())];
			}
			return [];
		}

		public getCellRender(): any {
			return (data) => {
				return getButtonCell(this.getForeignCellData(data), this, !this.getIsEditable(), data);
			};
		}

		public getFormCellRender(extraData?: any, extraForeignKeyData?: any, operation?: MassUpdateOperation): any {
			return (data) => {
				return getButtonCell(this.getForeignCellData({ ...data }, extraData, extraForeignKeyData, operation), this, operation, data);
			};
		}

		public getForeignDataForFilterBuilder(value) {
			return {
				[this.foreignKeyInfo.columnName]: parseInt(value, 10),
				text: this.foreignKeyInfo.getTextByForeignKeyId(parseInt(value, 10)),
			};
		}

		public getParentDataByForeignKeyId(id: number, columnName?) {
			const fieldName = this.foreignKeyInfo.joinedKeyColumnNames[columnName].toLocaleLowerCase();
			return this.foreignKeyInfo.foreignKeyData.find(
				(foreignData) => foreignData.getPropIgnoreCase(fieldName) === id,
			);
		}

		public getForeignDataForInputParam(value, columnName?) {
			return {
				[columnName]: parseInt(value, 10),
				...this.getParentDataByForeignKeyId(parseInt(value, 10), columnName),
			};
		}

		public getCellRenderForFilterBuilder(value: number) {
			return this.getFormCellRender(
				value ? this.getForeignDataForFilterBuilder(value) : {},
				this.foreignKeyInfo.foreignKeyData,
			);
		}

		public getFilterOperations(): DxOperations[] {
			return [
				DxOperations.EQUALS,
				DxOperations.NOT_EQUALS,
				DxOperations.IS_BLANK,
				DxOperations.IS_NOT_BLANK,
				DxOperations.ANY_OF,
				DxOperations.NONE_OF,
				DxOperations.SEARCH_IN_TEXT,
			];
		}

		public getDefaultValue() {
            return this.defaultValue && parseInt(this.defaultValue, 10);
		}

		public getColumnParametersForFilterSetting(isCompare = false) {
			return {
				...this.getDefaultOptionForFilterSetting(),
				editorRender: (data) => getEditorComponent(data, this),
				filterOperations: isCompare ? this.getFilterOperationForComparing() : this.getFilterOperations(),
				customizeText: (data) => {
					return isNaN(parseInt(data.value, 10))
						? data.value
						: this.foreignKeyInfo.getTextByForeignKeyId(parseInt(data.value, 10));
				},
			};
		}
	};
}

export default DbeForeignKeyType;
