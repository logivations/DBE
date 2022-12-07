/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import {ISeparatorEvaluator} from '../Interfaces/IListBoxCandidate';
import {IBaseSetting} from '../Interfaces';
import {FilterActions} from '../../constants/FiltersConstants';

class BaseSetting<T> implements IBaseSetting<T> {
	public ownerUserId: number;
	constructor(
		public setting?: T,
		public settingName?: string,
		public key?: FilterActions,
		ownerUserId?: number,
		public originalWarehouseId?: number,
		public isEditable?: boolean,
		public isPublic?: boolean,
		public objectId?: number,
		public evaluator?: ISeparatorEvaluator<boolean>,
		public settingId?: string,
		public isShared?: boolean,
		public description?: string,
	) {
		this.ownerUserId = ownerUserId ? parseInt(ownerUserId.toString(), 10) : ownerUserId;
	}
}

export default BaseSetting;
