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
Object.defineProperty(Object.prototype, "isEqual", {
    value: function (objToCompare) {
        function isObject(object) {
            return object != null && typeof object === 'object';
        }
        function isEqual(obj1, obj2) {
            const props1 = Object.getOwnPropertyNames(obj1);
            const props2 = Object.getOwnPropertyNames(obj2);
            if (props1.length != props2.length) {
                return false;
            }
            for (let i = 0; i < props1.length; i++) {
                const val1 = obj1[props1[i]];
                const val2 = obj2[props1[i]];
                const isObjects = isObject(val1) && isObject(val2);
                if (isObjects && !isEqual(val1, val2) || !isObjects && val1 !== val2) {
                    return false;
                }
            }
            return true;
        }

        if (isObject(this) && isObject(objToCompare)) {
            return isEqual(this, objToCompare);
        } else {
            return this.valueOf() === objToCompare;
        }
    }
});
