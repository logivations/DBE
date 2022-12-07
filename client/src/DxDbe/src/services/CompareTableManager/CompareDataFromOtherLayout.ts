/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import TableDataModel from '../TableDataModel/TableDataModel';
import translate from '../../i18n/localization';
import { getListOfLayout } from './CompareTableComponents';
import ICompareDataButton from './ICompareDataButton';

class CompareDataFromOtherLayout implements ICompareDataButton {
	public readonly name = DxCompareTypeGroup.COMPARE_DATA_FROM_OTHER_LAYOUT;
	public readonly localizedName = translate('COMPARE_DATA_FROM_OTHER_LAYOUT');

	public isVisible: boolean;
	public tableDataModel: TableDataModel;

	static create(tableDataModel) {
		return new CompareDataFromOtherLayout(tableDataModel).setVisible(true);
	}

	constructor(tableDataModel: TableDataModel) {
		this.tableDataModel = tableDataModel;
	}

	public setVisible(isButtonVisible: boolean): CompareDataFromOtherLayout {
		this.isVisible = isButtonVisible;
		return this;
	}

	public getCaption(): string {
		return translate('SELECT_WAREHOUSE_TO_COMPARE');
	}

	public getName(): DxCompareTypeGroup {
		return this.name;
	}

	public getComponent() {
		const list = this.tableDataModel.getMetadata().getUserAccessibleWarehouses();
		return getListOfLayout(list);
	}
}

export default CompareDataFromOtherLayout;
