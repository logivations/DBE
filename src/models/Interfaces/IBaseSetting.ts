/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import IListBoxCandidate, { ISeparatorEvaluator } from './IListBoxCandidate';

interface IBaseSetting<T> extends IListBoxCandidate<boolean> {
	setting?: T;
	settingName?: string;
	isSettingAction?: boolean;
	ownerUserId?: number;
	originalWarehouseId?: number;
	editable?: boolean;
	isPublic?: boolean;
	objectId?: number;
	evaluator?: ISeparatorEvaluator<boolean>;
}

export default IBaseSetting;
