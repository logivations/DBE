/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import { TableSuffix } from '../../models/Enums';
import translate from '../../i18n/localization';
import TableDataModel from '../TableDataModel/TableDataModel';
import { getFilterBuilderForComparing } from './CompareTableComponents';
import ICompareDataButton from './ICompareDataButton';

class CompareDataWithinThisLayout implements ICompareDataButton {
	readonly name = DxCompareTypeGroup.COMPARE_DATA_WITHIN_THIS_LAYOUT;
	readonly localizedName = translate('COMPARE_DATA_WITHIN_THIS_LAYOUT');
	public isVisible: boolean;

	static create(tableDataModel: TableDataModel) {
		const tableSuffix = tableDataModel.getMetadata().getTable().getTableSuffix();
		const isButtonVisible = CompareDataWithinThisLayout.isButtonVisible(tableSuffix);
		return new CompareDataWithinThisLayout().setVisible(isButtonVisible);
	}

	static isButtonVisible(tableSuffix: TableSuffix) {
		return tableSuffix === TableSuffix.WAREHOUSE_AND_CAMPAIGN_ID_SUFFIX;
	}

	public setVisible(isButtonVisible: boolean): CompareDataWithinThisLayout {
		this.isVisible = isButtonVisible;
		return this;
	}

	public getName(): DxCompareTypeGroup {
		return this.name;
	}

	public getCaption(): string {
		return translate('SELECT_FILTERS_TO_COMPARE');
	}

	public getComponent(tableInstance) {
		return getFilterBuilderForComparing(tableInstance);
	}
}

export default CompareDataWithinThisLayout;
