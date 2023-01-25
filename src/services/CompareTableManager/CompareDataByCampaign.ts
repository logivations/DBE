/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import translate from '../../i18n/localization';
import ICompareDataButton from './ICompareDataButton';
import { getCompareDataByCampaignComponent } from './CompareTableComponents';

class CompareDataByCampaign implements ICompareDataButton {
	readonly name = DxCompareTypeGroup.COMPARE_DATA_BY_CAMPAIGN;
	readonly localizedName = translate('COMPARE_DATA_BY_CAMPAIGN');
	public isVisible: boolean;

	static create(tableDataModel) {
		const primaryKeys = tableDataModel.getPrimaryKeys();
		const isButtonVisible = primaryKeys.length > 1;

		return new CompareDataByCampaign().setVisible(isButtonVisible);
	}

	public setVisible(isButtonVisible: boolean): CompareDataByCampaign {
		this.isVisible = isButtonVisible;
		return this;
	}

	public getName(): DxCompareTypeGroup {
		return this.name;
	}

	public getCaption(): string {
		return translate('SELECT_CAMPAIGN_TO_COMPARE');
	}

	public getComponent(tableInstance, campaigns) {
		return getCompareDataByCampaignComponent(tableInstance.getTableDataModel().getMetadata().campaignId, campaigns);
	}
}

export default CompareDataByCampaign;
