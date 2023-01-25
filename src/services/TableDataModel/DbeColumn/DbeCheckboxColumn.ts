/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { getEditorComponent } from '../../../Components/common/DbeColumnChildrens';
import { DxOperations } from '../../../constants/FilterBuilderConstants';
import { DbeType } from '../../../models/Types/Types';

function DbeCheckboxType<TBase extends DbeType>(BaseClass: TBase) {
	return class extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
		}

		public getColumnParameters() {
			return this.getDefaultColumnParameters();
		}

		public getValidationRules() {
			return [];
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

		public getDefaultValue(): boolean {
			return this.defaultValue || false;
		}

		public getFilterOperations(): DxOperations[] {
			return [DxOperations.EQUALS, DxOperations.NOT_EQUALS];
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

export default DbeCheckboxType;
