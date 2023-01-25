/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import SettingFilter from './SettingFilter';

class HiddenColumnSetting extends SettingFilter<string[]> {
	constructor(public selectedInteractive?: boolean, ...rest: any[]) {
		super(null, ...rest);
	}

	public static create(hiddenColumnSetting) {
		const setting = new HiddenColumnSetting(
			hiddenColumnSetting.selectedInteractive,
			hiddenColumnSetting.settingName,
			hiddenColumnSetting.key,
			hiddenColumnSetting.ownerUserId,
			hiddenColumnSetting.originalWarehouseId,
			hiddenColumnSetting.isEditable,
			hiddenColumnSetting.isPublic,
			hiddenColumnSetting.objectId,
			hiddenColumnSetting.evaluator,
		);

		return setting
			.setDescription(hiddenColumnSetting.setting)
			.createSettingId()
			.setIsShared(hiddenColumnSetting.originalWarehouseId)
			.setSetting(hiddenColumnSetting.setting);
	}

	static createNewHiddenColumnSetting(
		settingName: string,
		isPublic: boolean,
		objectId: number,
		hiddenColumns: string[],
	) {
		const newHiddenColumnSetting = {
			selectedInteractive: false,
			settingName,
			key: null,
			ownerUserId: window['USER_ID'],
			originalWarehouseId: null,
			isEditable: true,
			isPublic,
			objectId,
			evaluator: null,
			setting: hiddenColumns,
		};
		return this.create(newHiddenColumnSetting);
	}

	public setDescription(setting): HiddenColumnSetting {
		this.description = setting ? setting.toString() : '';
		return this;
	}
}

export default HiddenColumnSetting;
