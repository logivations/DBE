/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

String.prototype.equalsIgnoreCase = function(comparableString) {
    return comparableString.toLowerCase() === this.toLowerCase();
};
