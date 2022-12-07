/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {getEditorComponent, getLookupChildrenForColumn} from '../../../Components/common/DbeColumnChildrens';
import {DxOperations} from '../../../constants/FilterBuilderConstants';
import {DbeType} from '../../../models/Types/Types';

function DbeEnumType<TBase extends DbeType>(BaseClass: TBase) {
    return class DbeEnum extends BaseClass {
        constructor(...args: any[]) {
            super(...args);
        }

        public getEnumDataSource(): { [key: string]: any }[] {
            return this.getViewModel().getUnits().getOptions();
        }

		public getOptionByKey(value) {
			return this.getEnumDataSource().find((option) => option.key === value);
		}

		public getWidth() {
			return 180;
		}

		public getColumnEditorOptions() {
			return {
				...this.getDefaultColumnEditorOptions(),
				dataSource: this.getEnumDataSource(),
				valueExpr: 'key',
				displayExpr: 'translatedAlias',
			};
		}

		public getColumnParameters() {
			return {...this.getDefaultColumnParameters(), allowFiltering: false, allowHeaderFiltering: true};
		}

		public getInputParameters() {
			return {
                ...this.getDefaultInputParameters(),
            };
		}

		public getEditorOptionsForInputParameters() {
			return {
				...this.getDefaultEditorOptions(),
				dataSource: this.getEnumDataSource(),
				valueExpr: 'key',
				displayExpr: 'translatedAlias',
			};
		}

		public getChildren() {
			return [
				...this.rules,
				getLookupChildrenForColumn(this.getEnumDataSource(), this.getName()),
			];
		}

		public getEditorOptionsForFilterBuilder(value, onValueChangedHandler): any {
			return {
				onValueChanged: onValueChangedHandler,
				items: this.getEnumDataSource(),
				value: value,
				valueExpr: 'key',
				displayExpr: 'translatedAlias',
				format: {
					formatter: (value) => {
						return this.getOptionByKey(value).translatedAlias;
					},
				},
			};
		}

		public getFilterOperations(): DxOperations[] {
			return [
				DxOperations.EQUALS,
				DxOperations.NOT_EQUALS,
				DxOperations.IS_BLANK,
				DxOperations.IS_NOT_BLANK,
				DxOperations.ANY_OF,
				DxOperations.NONE_OF,
			];
		}

		public getColumnParametersForFilterSetting() {
			return {
				...this.getDefaultOptionForFilterSetting(),
				lookup: {
					dataSource: this.getViewModel().getUnits().getOptions(),
					valueExpr: 'key',
					displayExpr: 'translatedAlias',
				},
				filterOperations: this.getFilterOperations(),
				editorRender: (data) => getEditorComponent(data, this),

				format: {
					formatter: (value) => {
						return this.getOptionByKey(value).translatedAlias;
					},
				},
			};
		}

		getDefaultValue() {
			return parseInt(this.defaultValue, 10) || this.getEnumDataSource()[0]?.key;
		}
	};
}

export default DbeEnumType;
