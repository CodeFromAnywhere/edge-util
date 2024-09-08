"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOptionalKeysFromObject = exports.removeOptionalKeysFromObjectStrings = void 0;
const omitUndefinedValues_js_1 = require("./omitUndefinedValues.js");
const removeOptionalKeysFromObjectStrings = (object, keys) => {
    const newObject = keys.reduce((objectNow, key) => {
        return {
            ...objectNow,
            [key]: undefined,
        };
    }, object);
    return (0, omitUndefinedValues_js_1.omitUndefinedValues)(newObject);
};
exports.removeOptionalKeysFromObjectStrings = removeOptionalKeysFromObjectStrings;
const removeOptionalKeysFromObject = (object, keys) => {
    return (0, exports.removeOptionalKeysFromObjectStrings)(object, keys);
};
exports.removeOptionalKeysFromObject = removeOptionalKeysFromObject;
//# sourceMappingURL=removeOptionalKeysFromObject.js.map