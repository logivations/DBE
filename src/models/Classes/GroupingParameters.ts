/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

interface GroupParams {
	selector: string;
	desc: boolean;
	isExpanded: boolean;
}

class GroupingParameters {
	constructor(
		private readonly columnName: string = '',
		private readonly realColumnName: string = '',
		private readonly aggregationFunction: string = 'NONE',
		private readonly position: number = 0,
		private readonly usedForAggregation: boolean = false,
		private readonly addButton: boolean = false,
	) {}

	public static create(groupParams: GroupParams[]): GroupingParameters[] {
		return groupParams.map((param: GroupParams, index: number) => {
			return new GroupingParameters(param.selector, param.selector, 'COUNT', index, true, false);
		});
	}
}

export default GroupingParameters;
