/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

export {};

declare global {
    declare interface Array<T> {
        notEmpty(): boolean;
        isEmpty(): boolean;
    }
    declare interface Object {
        getPropIgnoreCase(propName : string): any;
        isObjectEmpty(): boolean;
    }
    declare interface String {
        equalsIgnoreCase(comparableString : string): boolean;
    }
}
