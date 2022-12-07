/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {DbeType} from '../../../models/Types/Types';

function DbeCommonType<TBase extends DbeType>(BaseClass: TBase) {
	return class extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
		}

		public getColumnParameters() {
			return this.getDefaultColumnParameters();
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
			return [...this.rules];
		}

		public getColumnParametersForFilterSetting() {
			return this.getDefaultOptionForFilterSetting();
		}

		getDefaultValue() {
			return null;
		}
	};
}

export default DbeCommonType;
