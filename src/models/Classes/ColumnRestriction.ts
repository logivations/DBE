/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

class ColumnRestriction {
	constructor(
		public minValue?: string,
		public maxValue?: string,
		public minThreshold?: string,
		public maxThreshold?: string,
		public unsigned?: boolean,
	) {}

	public static create(columnRestriction: ColumnRestriction = {}): ColumnRestriction {
		return new ColumnRestriction(
			columnRestriction.minValue,
			columnRestriction.maxValue,
			columnRestriction.minThreshold,
			columnRestriction.maxThreshold,
			columnRestriction.unsigned,
		);
	}
}

export default ColumnRestriction;
