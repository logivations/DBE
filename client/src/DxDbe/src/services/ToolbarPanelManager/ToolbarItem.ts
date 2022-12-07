/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import * as Icons from '../../assets/icons';
import TFunction from '../../models/Types/Types';
import {ShortcutOptions} from "../../helpers/KeyboardProcessor";

type WidgetType =
	| 'dxAutocomplete'
	| 'dxButton'
	| 'dxCheckBox'
	| 'dxDateBox'
	| 'dxMenu'
	| 'dxSelectBox'
	| 'dxTabs'
	| 'dxTextBox'
	| 'dxButtonGroup'
	| 'dxDropDownButton';
type LocateInMenuType = 'always' | 'auto' | 'never';
type LocationType = 'after' | 'before' | 'center';

class ToolbarItem {
	isDown: boolean = false;
	private icon: string;
	public ref: any;
	public component: any;

	private shortcutOptions: ShortcutOptions[] = [];

	constructor(
		public readonly buttonName: string,
		private text: string = '',
		private title: string = '',
		private disabled: boolean = false,
		private cssClass: string = 'toolbar-item-custom',
		private locateInMenu: LocateInMenuType = 'auto',
		private location: LocationType = 'before',
		private widget: WidgetType = 'dxButton',
		private visible: boolean = false,
		private options: any = {},
		private children: any = null,
	) {}

	public setShortcut(code, shift = false, ctrl = false, extraParams = {}) {
		this.shortcutOptions.push(new ShortcutOptions(code, shift, ctrl, extraParams));
		return this;
	}

	public getShortcuts(): ShortcutOptions[] {
		return this.shortcutOptions;
	}

	public static getIcon(name) {
		return Icons[name] || name;
	}

	public setRef(ref): ToolbarItem {
		this.ref = ref;
		return this;
	}

	public setVisible(visible: boolean): ToolbarItem {
		this.visible = visible;
		return this;
	}

	public isVisible(): boolean {
		return this.visible;
	}

	public setTitle(title: string): ToolbarItem {
		this.title = title;
		this.options.hint = title;
		return this;
	}

	public setIcon(iconName = ''): ToolbarItem {
		this.icon = ToolbarItem.getIcon(iconName);
		this.options.icon = ToolbarItem.getIcon(iconName);
		return this;
	}

	public setCssClass(className = ''): ToolbarItem {
		this.cssClass += ` ${className}`;
		return this;
	}

	public setChildren(children: any): ToolbarItem {
		this.children = children;
		return this;
	}

	public setWidget(widgetName: WidgetType): ToolbarItem {
		this.widget = widgetName;
		return this;
	}

	public setText(text?: string): ToolbarItem {
		this.text = text;
		return this;
	}

	public getKey(): string {
		return this.buttonName;
	}

	public mergeOptions(options: any): ToolbarItem {
		Object.assign(this.options, options);
		return this;
	}

	public setClickHandler(handler: TFunction) {
		this.clickHandler = handler;
		this.setShortcutHandler(handler);
	}

	public setShortcutHandler(handler: TFunction) {
		this.shortcutHandler = handler;
	}

	public getClickHandler(): TFunction {
		return this.clickHandler;
	}

	public getShortcutHandler(): TFunction {
		return this.shortcutHandler;
	}

	public getChildren() {
		return this.children;
	}

	public getItemProps() {
		return Object.assign({
			text: this.text,
			title: this.title,
			hint: this.title,
			icon: this.icon,
			disabled: this.disabled,
			cssClass: this.cssClass,
			locateInMenu: this.locateInMenu,
			location: this.location,
			widget: this.widget,
			visible: this.visible,
			options: this.options,
		}, this.widget !== 'dxDropDownButton' ? {onClick: this.clickHandler} : {});
	}

	private clickHandler: TFunction = () => true;
	private shortcutHandler: TFunction = () => true;
}

export default ToolbarItem;
