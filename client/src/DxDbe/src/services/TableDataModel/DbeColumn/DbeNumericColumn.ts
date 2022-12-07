/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {getCustomRule, getEditorComponent, getIntegerRule, getNumericRule, getPatternRuleForFloats} from '../../../Components/common/DbeColumnChildrens';
import {DxOperations} from '../../../constants/FilterBuilderConstants';
import {DbeType} from '../../../models/Types/Types';
import MySqlDataType from '../../../models/Enums/MySqlDataType';
import {checkIfIntegerByFormat, parseToDxFormat} from "../../../utils/utils";

enum TimeFormats {
	'MS->SS' = 1000,
	'SS->HH'= 3600
}

function DbeNumericType<TBase extends DbeType>(BaseClass: TBase) {
    return class DbeNumeric extends BaseClass {
        constructor(...args: any[]) {
            super(...args);
            this.setValidationRules();
        }

        public getDxFormat() {
			const formatFromAbstractParameters = TimeFormats[this.getViewModel().getUnits().getAbstractParameters().format];
			if (formatFromAbstractParameters) {
				return {
					formatter: (value) => {
						return (parseInt(value) / formatFromAbstractParameters).toString();
					}
				};
			}

            if (this.getFormat()) {
				return {
					type: parseToDxFormat(this.getFormat()),
				};
			}
			if (this.getFraction()) {
				return {
					type: 'fixedPoint',
					precision: 4
				};
			}
			if (checkIfIntegerByFormat(this.getFormat())) {
				return null;
			}

			return null;
		}
		public getColumnParameters() {
			return {
                ...this.getDefaultColumnParameters(),
                format: this.getDxFormat()
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
				format: this.getDxFormat()
            };
		}

		public getEditorOptionsForInputParameters() {
			return {
                ...this.getDefaultEditorOptions(),
				format: this.getDxFormat()
            };
		}

		public getMinValue(): number {
			return parseInt(this.getColumnRestriction().minValue) || 0;
		}

		public setValidationRules(): void {
			this.rules.push(getNumericRule(this.getName()));
			if (this.getMaxValue() && this.getMinValue()) {
				this.rules.push(
					getCustomRule(this.getMaxValue(), this.getMinValue(), this.getIsRequired(), this.getName()),
				);
			}
			if (this.getColumnType() === MySqlDataType.INTEGER || checkIfIntegerByFormat(this.getFormat())) {
				this.rules.push(getIntegerRule(this.getName()));
			}
			if (this.getMaxLength() && this.getColumnType() === MySqlDataType.FLOAT) {
				this.rules.push(getPatternRuleForFloats(this.getMaxLength(), this.getFraction(), this.getName()));
			}
		}

		public getChildren() {
			return [...this.rules];
		}

		public getDefaultValue() {
			return this.defaultValue || null;
		}

		public getFilterOperations(): DxOperations[] {
			return [
				DxOperations.EQUALS,
				DxOperations.NOT_EQUALS,
				DxOperations.LESS_THEN,
				DxOperations.LESS_THEN_OR_EQUAL,
				DxOperations.GREATER_THEN,
				DxOperations.GREATER_THEN_OR_EQUAL,
				DxOperations.IS_BLANK,
				DxOperations.IS_NOT_BLANK,
				DxOperations.ANY_OF,
				DxOperations.NONE_OF,
				DxOperations.BETWEEN,
			];
		}

		public getColumnParametersForFilterSetting() {
			return {
				...this.getDefaultOptionForFilterSetting(),
				filterOperations: this.getFilterOperations(),
				editorRender: (data) => getEditorComponent(data, this),
				format: this.getDxFormat()
			};
		}
	};
}

export default DbeNumericType;
