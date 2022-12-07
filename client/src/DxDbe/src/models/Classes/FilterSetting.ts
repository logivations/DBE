/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { FilterGroup } from './index';
import SettingFilter from './SettingFilter';

class FilterSetting extends SettingFilter<FilterGroup> {
	constructor(public selectedInteractive?: boolean, ...rest: any[]) {
		super(null, ...rest);
	}

	static create(filter) {
		const setting = new FilterSetting(
			filter.selectedInteractive,
			filter.settingName,
			filter.key,
			filter.ownerUserId,
			filter.originalWarehouseId,
			filter.isEditable,
			filter.isPublic,
			filter.objectId,
			filter.evaluator,
		);
		return setting
			.createSettings(filter.setting)
			.createSettingId()
			.setIsShared(filter.originalWarehouseId)
			.setDescription(setting.setting);
	}

	static createNewFilterSetting(settingName: string, isPublic: boolean, objectId: number, setting) {
		const newFilter = {
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
		return this.create(newFilter);
	}

	static createZeroSetting(filterSetting) {
		const setting = this.create(filterSetting);
		setting.setting = null;
		return setting;
	}

	public getDescription(filter: FilterGroup) {
		const criteria = filter.getFilterCriteria();
		const condition = filter.getOperator();
		const filterGroups = filter.getFilterGroups();

		const criteriaDescription = criteria
			.map((cri) => {
				const columnName = cri.getColumnName();
				const operator = cri.getOperator();
				// const values = cri.getValues() ? cri.getValues().join(', ') : '';
				return `${columnName} ${operator}`;
			})
			.join(` ${condition} `);

		return filterGroups.reduce((acc, filterGroup) => {
			const filterGroupDescription = ` ${filterGroup.getOperator()} (${this.getDescription(filterGroup)}) `;
			acc += filterGroupDescription;
			return acc;
		}, criteriaDescription);
	}

	public setDescription(setting: FilterGroup): FilterSetting {
		this.description = this.getDescription(setting);
		return this;
	}

	public createSettings(setting: FilterGroup) {
		this.setting = setting instanceof FilterGroup ? setting : FilterGroup.create(setting);
		return this;
	}
}

export default FilterSetting;
