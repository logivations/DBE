/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { SortingData } from './index';
import { OrderingType } from '../Enums';
import SettingFilter from './SettingFilter';

class SortSetting extends SettingFilter<{ [index: string]: OrderingType }> {
	constructor(public selectedInteractive?: boolean, ...rest: any[]) {
		super(null, ...rest);
	}

	static create(sortSetting) {
		const setting = new SortSetting(
			sortSetting.selectedInteractive,
			sortSetting.settingName,
			sortSetting.key,
			sortSetting.ownerUserId,
			sortSetting.originalWarehouseId,
			sortSetting.isEditable,
			sortSetting.isPublic,
			sortSetting.objectId,
			sortSetting.evaluator,
		);

		return setting
			.createSettingId()
			.setSetting(sortSetting.setting)
			.setIsShared(sortSetting.originalWarehouseId)
			.setDescription(sortSetting.setting);
	}

	static createNewSortOrder(settingName, isPublic, objectId, setting) {
		const newSortOrder = {
			selectedInteractive: false,
			settingName,
			key: null,
			ownerUserId: window['USER_ID'],
			originalWarehouseId: null,
			isEditable: true,
			isPublic,
			objectId,
			evaluator: null,
			setting: setting,
		};
		return this.create(newSortOrder);
	}

	public static applySortingSetting(sortingSetting: SortSetting, dbeDxGridRef) {
		dbeDxGridRef.clearSorting();
		if (sortingSetting) {
			const columns = dbeDxGridRef.getVisibleColumns();
			SortingData.createDxSortingData(sortingSetting.setting).map((setting) => {
				const { selector, desc } = setting;
				const column = columns.find(({ dataField }) => dataField === selector);
				column && dbeDxGridRef.columnOption(column.index, 'sortOrder', desc ? 'desc' : 'asc');
			});
		}
	}

	public setDescription(settings: { [index: string]: OrderingType }): SortSetting {
		this.description = settings
			? Object.entries(settings).reduce((acc, setting, index, arr) => {
					const [selector, desc] = setting;
					index !== arr.length - 1 ? (acc += `${selector} ${desc}, `) : (acc += `${selector} ${desc}`);
					return acc;
			  }, '')
			: '';
		return this;
	}
}

export default SortSetting;
