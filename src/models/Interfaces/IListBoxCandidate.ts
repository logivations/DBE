/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export interface ISeparatorEvaluator<T> {}

interface IListBoxCandidate<C> {
	evaluator?: ISeparatorEvaluator<C>;
}

export default IListBoxCandidate;
