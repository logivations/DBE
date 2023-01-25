/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import getButtonCell from '../../../Components/common/ButtonCell';
import { getEditorComponent, getRequiredRule } from '../../../Components/common/DbeColumnChildrens';
import { DxOperations } from '../../../constants/FilterBuilderConstants';
import { DbeType } from '../../../models/Types/Types';
import MassUpdateOperation from '../../../models/Classes/MassUpdateOperation';
import { isDefined } from '../../../utils/utils';

function DbeForeignKeyType<TBase extends DbeType>(BaseClass: TBase) {
	return class DbeForeignKey extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
		}

		public getColumnParameters() {
			return Object.assign(this.getDefaultColumnParameters(), {
				cssClass: 'foreign-btn-cell',
				allowEditing: false,
				allowSearch: false,
				allowFixing: false,
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
				return getButtonCell(this.getForeignCellData(data), this, false, data);
			};
		}

		public getFormCellRender(extraData?: any, disabled = false, operation?: MassUpdateOperation): any {
			return (data) => {
				return getButtonCell(this.getForeignCellData(data, extraData, operation), this, disabled, data);
			};
		}

		public getCellRenderForFilterBuilder(value) {
			return this.getFormCellRender({ [this.getName()]: parseInt(value) });
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
			return isDefined(this.defaultValue) ? parseInt(this.defaultValue, 10) : null;
		}

		public getColumnParametersForFilterSetting(isCompare = false) {
			return {
				...this.getDefaultOptionForFilterSetting(),
				editorRender: (data) => getEditorComponent(data, this),
				filterOperations: isCompare ? this.getFilterOperationForComparing() : this.getFilterOperations(),
				customizeText: (data) => {
					return data?.value?.foreignButtonText;
				},
			};
		}
	};
}

export default DbeForeignKeyType;
