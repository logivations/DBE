/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import BaseSetting from './BaseSetting';
import { v4 } from 'uuid';

abstract class SettingFilter<T> extends BaseSetting<T> {
	constructor(public selectedInteractive?: boolean, ...rest: any[]) {
		super(null, ...rest);
	}

	public getSetting(): T {
		return this.setting;
	}

	public getSettingId(): string {
		return this.settingId || null;
	}

	public setIsShared(originalWarehouseId: number) {
		this.isShared = !!originalWarehouseId;
		return this;
	}

	public createSettingId() {
		this.settingId = v4();
		return this;
	}

	public setSetting(setting: T) {
		this.setting = setting;
		return this;
	}

	public getSettingName(): string {
		return this.settingName;
	}

	public get isOtherFilter(): boolean {
		return this.ownerUserId !== parseInt(window['USER_ID'], 10);
	}
}

export default SettingFilter;
