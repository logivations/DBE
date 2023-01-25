/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class ChartDescription {
	constructor(public id: number, public text: string) {}

	public static create(description: ChartDescription): ChartDescription {
		return new ChartDescription(description.id, description.text);
	}
}

export default ChartDescription;
