/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import IAbstractColumnModel from '../Interfaces/IAbstractColumnModel';

type TFunction = (...args: any[]) => any;

export type Constructor = new (...args: any[]) => any;

type GConstructor<T = {}> = new (...args: any[]) => T;

export type DbeType = GConstructor<IAbstractColumnModel>;

export default TFunction;
