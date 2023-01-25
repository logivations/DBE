/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import { Unit } from '../Enums';
import { AbstractParameters } from './index';

class ParameterizedUnit {
	constructor(
		private readonly unit: Unit,
		private readonly measurementAcronym: string,
		private readonly abstractParameters: AbstractParameters<AbstractParameters<any>>,
	) {}

	public static create(parameterizedUnit: ParameterizedUnit = ParameterizedUnit.zeroParameterizedUnit()) {
		return new ParameterizedUnit(
			parameterizedUnit.unit,
			parameterizedUnit.measurementAcronym,
			parameterizedUnit.abstractParameters,
		);
	}

	public static zeroParameterizedUnit() {
		return new ParameterizedUnit(Unit.ENUM, '', {});
	}

	public getOptions(): { [key: string]: any }[][] {
		return this.abstractParameters ? this.abstractParameters.options : [];
	}

	public getMeasurementAcronym() {
		return this.measurementAcronym;
	}

	public getAbstractParameters(): AbstractParameters<AbstractParameters<any>> {
		return this.abstractParameters;
	}
}

export default ParameterizedUnit;
