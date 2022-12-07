/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {getColorBoxCell, getEditableColorBoxCell} from '../../../Components/common/ColorBoxCell';
import {DxOperations} from '../../../constants/FilterBuilderConstants';
import {getEditorComponent} from '../../../Components/common/DbeColumnChildrens';
import {DbeType} from '../../../models/Types/Types';

function DbeColorType<TBase extends DbeType>(BaseClass: TBase) {
	return class extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
		}

		public getColumnParameters() {
			const defaultParams = this.getDefaultColumnParameters();
			return Object.assign(defaultParams, {
				allowEditing: true,
				cssClass: 'color-cell',
			});
		}

		public getColumnEditorOptions() {
			return {
				...this.getDefaultColumnEditorOptions(),
			};
		}

		public getInputParameters() {
			const defaultParams = this.getDefaultInputParameters();
			return Object.assign(defaultParams, {
				allowEditing: true,
				cssClass: 'color-cell',
				cellRender: this.getCellRender(),
				editCellRender: this.getEditCellRender(),
			});
		}

		public getEditorOptionsForInputParameters() {
			return this.getDefaultEditorOptions();
		}

		public getWidth() {
			return 160;
		}

		public getDefaultValue(): string {
			return '#000000';
		}

		public getCellRender() {
			return getColorBoxCell;
		}

		public getEditCellRender() {
			return getEditableColorBoxCell;
		}

		public getFormCellRender() {
			return undefined;
		}

		public getEditorOptionsForFilterBuilder(value, onValueChangedHandler): any {
			return {
				onValueChanged: onValueChangedHandler,
				value: value || this.getDefaultValue(),
			};
		}
		public getFilterOperations() {
			return [
				DxOperations.EQUALS,
				DxOperations.NOT_EQUALS,
				DxOperations.IS_BLANK,
				DxOperations.IS_NOT_BLANK,
				DxOperations.ANY_OF,
				DxOperations.NONE_OF,
				DxOperations.STATS_WITH,
				DxOperations.ENDS_WITH,
				DxOperations.CONTAINS,
				DxOperations.NOT_CONTAINS
			];
		}

		public getColumnParametersForFilterSetting() {
			return {
				...this.getDefaultOptionForFilterSetting(),
				filterOperations: this.getFilterOperations(),
				editorRender: (data) => getEditorComponent(data, this),
			};
		}
	};
}

export default DbeColorType;
