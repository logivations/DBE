/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import SettingFilter from './SettingFilter';
import { childParentScreenTemplates, screenBuilderTemplates } from '../../constants/TemplateSource';

class SplitScreenSetting {
	public tablesNames: string[];
	public templateId: number;

	constructor(tablesNames, templateId) {
		this.tablesNames = tablesNames;
		this.templateId = templateId;
	}

	static create(tablesNames, templateId) {
		return new SplitScreenSetting(tablesNames, templateId);
	}
}

class SplitScreen extends SettingFilter<SplitScreenSetting> {
	constructor(public selectedInteractive?: boolean, ...rest: any[]) {
		super(null, ...rest);
	}

	static create(splitScreen) {
		const setting = new SplitScreen(
			null,
			null,
			null,
			null,
			null,
			splitScreen.isEditable,
			splitScreen.isPublic,
			splitScreen.objectId,
			null,
		);
		return setting.createSettings(splitScreen.setting);
	}

	public createSettings(setting) {
		this.setting = SplitScreenSetting.create(setting.tableNames, setting.templateId);
		return this;
	}

	public getTemplate(isScreenBuilder) {
		return (isScreenBuilder ? screenBuilderTemplates : childParentScreenTemplates).find((template) => {
			return template.ID === this.getTemplateId();
		});
	}

	public getTemplateId(): number {
		return this.getSetting().templateId;
	}

	public getTablesName(): string[] {
		return this.getSetting().tablesNames;
	}
}

export default SplitScreen;
