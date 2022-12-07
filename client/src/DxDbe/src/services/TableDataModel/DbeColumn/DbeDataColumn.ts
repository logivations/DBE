/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {DxOperations} from '../../../constants/FilterBuilderConstants';
import {getEditorComponent} from '../../../Components/common/DbeColumnChildrens';
import {DbeType} from '../../../models/Types/Types';
import {DATE_FORMAT} from '../../../constants/Formats';
import {DataType} from '../../../models/Enums/ColumnDataType';

function DbeDataType<TBase extends DbeType>(BaseClass: TBase) {
    return class DbeDate extends BaseClass {
        constructor(...args: any[]) {
            super(...args);
        }

        public getDxFormat() {
            return this.getFormat() || DATE_FORMAT;
        }

		public getColumnParameters() {
			return {
                ...this.getDefaultColumnParameters(),
                format: this.getDxFormat(),
            };
		}

		public getColumnEditorOptions() {
			return {
                ...this.getDefaultColumnEditorOptions(),
                type: DataType[this.getColumnType()],
                displayFormat: this.getDxFormat(),
				format: this.getDxFormat(),
            };
		}

		public getChildren(): any {
			return [...this.rules];
		}

		public getInputParameters() {
			return {
                ...this.getDefaultInputParameters(),
            };
		}

		public getEditorOptionsForInputParameters() {
			return {
                ...this.getDefaultEditorOptions(),
                type: DataType[this.getColumnType()],
                displayFormat: this.getDxFormat(),
            };
		}

		public getEditorOptionsForFilterBuilder(value, onValueChangedHandler): any {
			return {
				onValueChanged: onValueChangedHandler,
				value: value,
				displayFormat: this.getDxFormat(),
				dateSerializationFormat: this.getDxFormat(),
				type: DataType[this.getColumnType()],
			};
		}

		public getDefaultValue() {
			return this.defaultValue || new Date();
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
				format: this.getDxFormat(),
				editorOptions: {
					type: DataType[this.getColumnType()],
					dateSerializationFormat: this.getDxFormat(),
					displayFormat: this.getDxFormat()
				}

			};
		}
	};
}

export default DbeDataType;
