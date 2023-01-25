/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

Array.prototype.notEmpty = function () {
    return this ? this.length > 0 : false;
};

Array.prototype.isEmpty = function () {
    return this ? this.length === 0 : true;
};

Array.prototype.isEqual = function (arrayToCompare) {
    return Array.isArray(this)
        && Array.isArray(arrayToCompare)
        && this.length === arrayToCompare.length
        && this.every((val, index) => val === arrayToCompare[index]);
};
