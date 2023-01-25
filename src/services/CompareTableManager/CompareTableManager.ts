/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import TableInstance from '../TableInstanceManager/TableInstance';
import CompareDataByCampaign from './CompareDataByCampaign';
import CompareDataWithinThisLayout from './CompareDataWithinThisLayout';
import CompareDataFromOtherLayout from './CompareDataFromOtherLayout';
import TableDataModel from '../TableDataModel/TableDataModel';
import ICompareDataButton from './ICompareDataButton';

class CompareTableManager {
	static instance: CompareTableManager;
	public tableDataModel: TableDataModel;

	public tableInstance: TableInstance;

	public compareDataFromOtherLayout: CompareDataFromOtherLayout;
	public compareDataWithinThisLayout: CompareDataWithinThisLayout;
	public compareDataByCampaign: CompareDataByCampaign;

	constructor(tableDataModel) {
		if (!CompareTableManager.instance) {
			CompareTableManager.instance = this;
		}
		this.tableDataModel = tableDataModel;
		this.createCompareButtons();
		return CompareTableManager.instance;
	}

	public createCompareButtons() {
		this.compareDataByCampaign = CompareDataByCampaign.create(this.tableDataModel);
		this.compareDataWithinThisLayout = CompareDataWithinThisLayout.create(this.tableDataModel);
		this.compareDataFromOtherLayout = CompareDataFromOtherLayout.create(this.tableDataModel);
	}

	public getVisibleCompareTableButtons(): ICompareDataButton[] {
		return [this.compareDataFromOtherLayout, this.compareDataByCampaign, this.compareDataWithinThisLayout].filter(
			({ isVisible }) => isVisible,
		);
	}
}

export default CompareTableManager;
