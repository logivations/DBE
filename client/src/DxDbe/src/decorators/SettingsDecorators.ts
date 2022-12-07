/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import communicator from '../api/Communicator';
import { EndPoints, StoreSettingKey } from '../constants/SettingsConstants';
import TFunction from '../models/Types/Types';

export function StoreSetting(endPoint: EndPoints, settingKey?: StoreSettingKey) {
	return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<TFunction>) {
		const method = descriptor.value!;

		descriptor.value = async function (...rest) {
			const result = method.apply(this, rest);
			await communicator.storeDxDbeUserParams(undefined, endPoint, result, target.tableName, settingKey);
			return result;
		};
	};
}

export function UpdateSetting(endPoint: EndPoints) {
	return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<TFunction>) {
		const method = descriptor.value!;

		descriptor.value = async function (...rest) {
			const result = method.apply(this, rest);
			await communicator.storeDxDbeUserParams(undefined, endPoint, result, target.tableName, null);
			return result;
		};
	};
}

export function DeleteSetting(settingKey: StoreSettingKey) {
	return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<TFunction>) {

		const method = descriptor.value!;

		descriptor.value = async function (...rest) {
			const result = method.apply(this, rest);
			await communicator.deleteDxDbeUserParams(undefined, settingKey, result.objectId, target.tableName);
			return result;
		};
	};
}

export function ShareUnshareSetting(settingKey: StoreSettingKey) {
	return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<TFunction>) {
		const method = descriptor.value!;

		descriptor.value = async function (...rest) {
			const result = method.apply(this, rest);
			await communicator.shareUnshareDxDbeSetting(undefined, settingKey, result.objectId, result.isShare, target.tableName);
			return result;
		};
	};
}
