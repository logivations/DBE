/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import DxCompareTypeGroup from '../../models/Enums/DxCompareTypeGroup';
import {FilterGroup} from '../../models/Classes';
import translate from '../../i18n/localization';
import NotificationController from "../Notification/NotificationController";
import {Severity} from "../../models/Enums/Notification";

class CompareTableDto {
	static instance;
	static notificationController: NotificationController;
	public compareTablesType = DxCompareTypeGroup.COMPARE_DATA_FROM_OTHER_LAYOUT;
	public showChangedColumn = false;
	public showCommonRecords = false;
	public hiddenColumns: string[] = [];
	public targetWarehouseId: number = null;
	public customFilter: FilterGroup = null;

	public selectedCompareCriteriaValue: string;
	public comparableColumnsModels: string[] = [];

	public sourceAndTargetFilter: { [key: string]: FilterGroup } = null;
	public sourceAndTargetCampaignId: { [key: string]: number } = null;

	static getCompareTableDto() {
		return new CompareTableDto();
	}

	constructor() {
		if (!CompareTableDto.instance) {
			CompareTableDto.instance = this;
		}
		CompareTableDto.notificationController = new NotificationController()

		return CompareTableDto.instance;
	}

	public setCompareTablesType(type: DxCompareTypeGroup, primaryKeys: string[]): CompareTableDto {
		this.compareTablesType = type;
		switch (type) {
			case DxCompareTypeGroup.COMPARE_DATA_FROM_OTHER_LAYOUT: {
				this.selectedCompareCriteriaValue = null;
				this.comparableColumnsModels = primaryKeys;
				this.sourceAndTargetCampaignId = null;
				break;
			}
			case DxCompareTypeGroup.COMPARE_DATA_BY_CAMPAIGN: {
				this.comparableColumnsModels = primaryKeys;
				this.setSelectedCompareCriteriaValue('ID_campaign');
				break;
			}
			case DxCompareTypeGroup.COMPARE_DATA_WITHIN_THIS_LAYOUT: {
				break;
			}
		}
		return this;
	}

	public setTargetWarehouseId(targetWarehouseId: number): CompareTableDto {
		this.targetWarehouseId = targetWarehouseId;
		return this;
	}

	public setHiddenColumns(hiddenColumns: string[]): CompareTableDto {
		this.hiddenColumns = hiddenColumns;
		return this;
	}

	public setValueByKey(key: string, value: boolean): CompareTableDto {
		this[key] = value;
		return this;
	}

	public setSourceAndTargetCampaignId(targetCampaign: number, sourceCampaign: number) {
		this.sourceAndTargetCampaignId = { targetCampaign, sourceCampaign };
	}

	public setCustomFilter(filter: FilterGroup): CompareTableDto {
		this.customFilter = filter;
		return this;
	}

	public setSourceAndTargetFilter(sourceFilter: FilterGroup, targetFilter: FilterGroup): CompareTableDto {
		this.sourceAndTargetFilter = { sourceFilter, targetFilter };
		return this;
	}

	public setSelectedCompareCriteriaValue(selectedCompareCriteriaValue: string): CompareTableDto {
		this.selectedCompareCriteriaValue = selectedCompareCriteriaValue;
		return this;
	}

	public setComparableColumnsModels(comparableColumnsModels: string[]) {
		this.comparableColumnsModels = comparableColumnsModels;
		return this;
	}

	public addComparableColumnsModels(columnName: string): CompareTableDto {
		this.comparableColumnsModels.includes(columnName)
			? (this.comparableColumnsModels = this.comparableColumnsModels.filter((column) => column !== columnName))
			: this.comparableColumnsModels.push(columnName);
		return this;
	}

	public validate(primaryKeys) {
		if (this.hiddenColumns && this.hiddenColumns.some((column) => primaryKeys.includes(column))) {
			CompareTableDto.notificationController.createNotification(translate('_HIDDEN_PRIMARY_KEY'), Severity.WARNING)
			return false;
		}
		return true;
	}

	public resetToDefaultParams() {
		this.compareTablesType = DxCompareTypeGroup.COMPARE_DATA_FROM_OTHER_LAYOUT;
		this.showChangedColumn = false;
		this.showCommonRecords = false;
		this.hiddenColumns = null;
		this.targetWarehouseId = null;
		this.customFilter = null;
		this.selectedCompareCriteriaValue = null;
		this.comparableColumnsModels = [];
		this.sourceAndTargetFilter = null;
		this.sourceAndTargetCampaignId = null;
	}
}

export default CompareTableDto;
