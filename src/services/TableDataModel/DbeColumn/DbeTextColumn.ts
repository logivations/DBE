/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { getEditorComponent, getStringLengthRule } from '../../../Components/common/DbeColumnChildrens';
import { DxOperations } from '../../../constants/FilterBuilderConstants';
import { DbeType } from '../../../models/Types/Types';
import translate from '../../../i18n/localization';
import { FormatConstants } from '../../../models/Enums/FormatConstants';

function DbeTextType<TBase extends DbeType>(BaseClass: TBase) {
	return class extends BaseClass {
		constructor(...args: any[]) {
			super(...args);
			this.setValidationRules();
		}

		public getColumnParameters() {
			return {
				...this.getDefaultColumnParameters(),
				customizeText: (data) => {
					if (this.getFormat() === FormatConstants.TRANSLATED) {
						return translate(data.value);
					}
					return data.value;
				},
			};
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

		public setValidationRules() {
			if (this.getMaxLength()) {
				this.rules.push(getStringLengthRule(this.getMaxLength(), this.getName()));
			}
		}

		public getChildren() {
			return [...this.rules];
		}

		public getDefaultValue(value?: string) {
			return value || '';
		}

		public getFilterOperations() {
			return [
				DxOperations.EQUALS,
				DxOperations.NOT_EQUALS,
				DxOperations.STATS_WITH,
				DxOperations.ENDS_WITH,
				DxOperations.CONTAINS,
				DxOperations.NOT_CONTAINS,
				DxOperations.IS_BLANK,
				DxOperations.IS_NOT_BLANK,
				DxOperations.ANY_OF,
				DxOperations.NONE_OF,
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

export default DbeTextType;
