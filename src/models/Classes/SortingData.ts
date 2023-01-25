/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import { OrderingType } from '../Enums';
import { DxOperations } from '../../constants/FilterBuilderConstants';
import { DxOrderType } from '../Enums/OrderingType';

interface SortingParameters {
	selector: string;
	desc: boolean;
}

class SortingData {
	constructor(private readonly column: string, private readonly orderingType: OrderingType) {}

	public static create(sortingParameters: SortingParameters[]): { [key: string]: OrderingType }[] {
		return sortingParameters.map(({ selector, desc }) => ({
			[selector]: desc ? OrderingType.DESCENDING : OrderingType.ASCENDING,
		}));
	}

	public static createDxSortingData(sortingParameters: { [index: string]: OrderingType }) {
		return Object.entries(sortingParameters).reduce((acc, sortingParameter) => {
			const [column, descending] = sortingParameter;
			const sortOrder = {
				selector: column,
				sortOrder: descending ? DxOrderType.DESCENDING : DxOrderType.ASCENDING,
			};
			return [...acc, sortOrder];
		}, []);
	}
}

export default SortingData;
