/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/
import {OrderingType} from '../Enums';

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
				desc: descending === OrderingType.DESCENDING,
			};
			acc.push(sortOrder);
			return acc;
		}, []);
	}
}

export default SortingData;
