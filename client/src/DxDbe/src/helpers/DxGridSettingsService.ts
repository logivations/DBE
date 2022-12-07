/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {StoreSetting} from '../decorators/SettingsDecorators';
import {EndPoints} from '../constants/SettingsConstants';
import debounce from 'lodash/debounce';
import TFunction from '../models/Types/Types';
import TableInstance from "../services/TableInstanceManager/TableInstance";

export interface IDxGridSettings {
	component: never;
	element: HTMLElement;
	fullName: string;
	name: AllowedSettingNames;
	value: string | number;
}

interface IDxGridSettingOptions {
	columnIndex: number;

	[key: string]: number | string;
}

export enum AllowedSettingNames {
	columns = 'columns',
	selectedRowKeys = 'selectedRowKeys',
	focusedRowIndex = 'focusedRowIndex',
	focusedColumnIndex = 'focusedColumnIndex',
}

class DxGridSettings {
	private readonly dxGridSettings: Map<string, Map<string, IDxGridSettingOptions> | string | number>;
	private readonly settingCache: Set<IDxGridSettings> = new Set();
	private readonly debouncedStoreSettings: TFunction;
	private readonly debouncedSettingChange: TFunction;

	constructor(dxGridSettings) {
		this.dxGridSettings = dxGridSettings;

		this.debouncedStoreSettings = debounce(this.storeSettings.bind(this), 300);
		this.debouncedSettingChange = debounce(this.handleSettingChange.bind(this), 500, { trailing: true });
	}

	public static create(settingObj): DxGridSettings {
		if (settingObj) {
			const optionsObj = new Map(Object.entries(settingObj));
			if (Object.hasOwn(settingObj, 'columns')) {
				optionsObj.set('columns', new Map(Object.entries(settingObj.columns)));
			}
			return new DxGridSettings(optionsObj);
		}
		return new DxGridSettings(new Map());
	}

	private static parseSettings(
		settings: IDxGridSettings,
		options: string | number | Map<string, IDxGridSettingOptions>,
		getDbeDxGridInstance: TFunction,
		tableInstance: TableInstance
	) {
		switch (settings.name) {
			case AllowedSettingNames.columns: {
				return DxGridSettings.parseColumnsSetting(settings, options, getDbeDxGridInstance, tableInstance);
			}
			// case AllowedSettingNames.selectedRowKeys:
			case AllowedSettingNames.focusedRowIndex:
			case AllowedSettingNames.focusedColumnIndex: {
				return settings.value;
			}
			default:
				return null;
		}
	}

	private static parseColumnsSetting(
		settings: IDxGridSettings,
		options: string | number | Map<string, IDxGridSettingOptions>,
		getDbeDxGridInstance: TFunction,
		tableInstance: TableInstance
	) {
		const regExp = new RegExp(/([a-zA-Z]*)\[(\d*)]\.([a-zA-Z]*)/gm);
		const parsedData = settings.fullName.matchAll(regExp).next().value;
		const [_, __, colIndex, fieldName] = [...parsedData.values()];
		const columns = getDbeDxGridInstance().option('columns');
		const column = columns[parseInt(colIndex, 10)];
		if (!column || (fieldName === 'sortOrder' && tableInstance.selectedSortOrder) || (fieldName === 'visible' && tableInstance.selectedHiddenColumnFilter)) {
			return;
		}


		const columnName = column.dataField;
		if (options instanceof Map) {
			const mapEntries: [string, { [p: string]: any; columnIndex: number }][] = [...options.entries()].reduce(
				(acc, [colName, settingObject]) => {
					const { columnIndex, ...restSetting } = settingObject;
					const col = getDbeDxGridInstance().getVisibleColumns().find(({ index }) => index === columnIndex);

					const extraParams = Object.keys(restSetting).reduce((acc, key) => {
						const val = col && Object.hasOwn(col, key) ? col[key] : null;
						return val ? { ...acc, [key]: val } : acc;
					}, {...restSetting});
					if (Object.keys(extraParams).length === 0) return acc;
					return [...acc, [colName, { columnIndex, ...extraParams }]];
				},
				[],
			);
			const optionsMap = new Map(mapEntries);
			const opt = options.has(columnName) ? options.get(columnName) : {};
			optionsMap.set(columnName, {
				...opt,
				columnIndex: parseInt(colIndex, 10),
				[fieldName]: settings.value,
			});
			return optionsMap;
		}
		return options;
	}

	public onSettingsChanged(dxGridSettings: IDxGridSettings, getDbeDxGridInstance: TFunction, tableInstance: TableInstance) {
		if (AllowedSettingNames[dxGridSettings.name]) {
			this.settingCache.add(dxGridSettings);
			this.debouncedSettingChange(getDbeDxGridInstance, tableInstance);
		}
	}

	public handleSettingChange(getDbeDxGridInstance: TFunction, tableInstance: TableInstance) {
		this.settingCache.forEach((dxGridSettings) => {
			const options = this.dxGridSettings.has(dxGridSettings.name)
				? this.dxGridSettings.get(dxGridSettings.name)
				: new Map();
			const parsedSettings = DxGridSettings.parseSettings(dxGridSettings, options, getDbeDxGridInstance, tableInstance);
			if (parsedSettings) {
				this.dxGridSettings.set(dxGridSettings.name, parsedSettings);
			}
		});
		this.settingCache.clear();
		this.debouncedStoreSettings();
	}

	public getByParamName(paramName: string) {
		return this.dxGridSettings.get(paramName);
	}

	public getByColumnName(name: string) {
		const data = this.getByParamName('columns');
		return data instanceof Map ? (data as Map<string, IDxGridSettingOptions>).get(name) : null;
	}

	private toObject() {
		const optionsObj = Object.fromEntries(this.dxGridSettings.entries());
		if (Object.hasOwn(optionsObj, 'columns') && optionsObj.columns instanceof Map) {
			Object.assign(optionsObj, { columns: Object.fromEntries(optionsObj.columns.entries()) });
		}
		return optionsObj;
	}

	public checkIfColumnsFiltered() {
		if (this.dxGridSettings.has('columns')) {
			const colOption = this.dxGridSettings.get('columns');
			if (colOption instanceof Map) {
				return [...colOption.values()].some((w) => {
					return Object.hasOwn(w, 'filterValue') || Object.hasOwn(w, 'filterValues');
				});
			}
		}
		return false;
	}

	public getHiddenColumns(): string[] {
		const columns = this.dxGridSettings.get('columns') as Map<string, IDxGridSettingOptions>;
		return columns
			? [...columns.entries()].reduce((acc, [name, value]) => Object.hasOwn(value, 'visible') && !value.visible ? [...acc, name] : acc, [])
			: [];
	}

	@StoreSetting(EndPoints.DBE_GRID_COMMON_SETTINGS)
	private storeSettings() {
		return {
			settingName: `dxDbeGridCommonSettings`,
			setting: this.toObject(),
			objectId: 0,
			isEditable: false,
			isPublic: false,
			originalWarehouseId: window['WAREHOUSE_ID'],
			ownerUserId: window['USER_ID'],
		};
	}
}

export default DxGridSettings;
