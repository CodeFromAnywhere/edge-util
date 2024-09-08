"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitUndefinedValues = void 0;
const omitUndefinedValues = (object) => {
    Object.keys(object).map((key) => {
        const value = object[key];
        if (value === undefined) {
            delete object[key];
        }
    });
    return object;
};
exports.omitUndefinedValues = omitUndefinedValues;
//# sourceMappingURL=omitUndefinedValues.js.map