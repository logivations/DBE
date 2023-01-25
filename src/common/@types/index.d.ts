/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export {};

declare global {
    declare interface Array<T> {
        notEmpty(): boolean;
        isEmpty(): boolean;
        isEqual(arrayToCompare): boolean;
    }
    declare interface Object {
        getPropIgnoreCase(propName : string): any;
        isObjectEmpty(): boolean;
        isEqual(objectToCompare): boolean;
    }
    declare interface String {
        equalsIgnoreCase(comparableString : string): boolean;
        isEqual(comparableString : string): boolean;
    }
    declare interface Boolean {
        isEqual(boolToCompare : boolean): boolean;
    }
    declare interface Number {
        isEqual(numToCompare : number): boolean;
    }
}
