/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

Object.defineProperty(Object.prototype, "getPropIgnoreCase", {
    value: function (propName) {
        const propertyName = Object.getOwnPropertyNames(this).find((name) => {
            return name.toLowerCase() === propName.toLowerCase();
        });
        return propertyName ? this[propertyName] : undefined;
    }
});

Object.defineProperty(Object.prototype, "isObjectEmpty", {
    value: function () {
        return Object.getOwnPropertyNames(this).length === 0;
    }
});
