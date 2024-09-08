"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromisedMappedKeysObject = exports.createMappedKeysObject = exports.createMappedObject = void 0;
const mergeObjectsArray_js_1 = require("./mergeObjectsArray.js");
/**
 * Creates a `MappedObject` of an array of any type. `MappedObject`s are great for increasing efficiency to get an item from an array. Especially useful when finds are needed on a specific key match for huge arrays. Instead of finding on the array you can simply get the right property from this object.
 *
 * NB: Don't use this inside of render functions, it's a very slow function, the whole idea is that this makes it faster, so just do it once!
 */
const createMappedObject = (array, 
/**
 Key to make the map from. Must be unique or it could be overwritten. Key must be a string
 */
mapKey, 
/**
 * If the result of the mapped object, based on the object should have mapped values, provide this mapfunction to get them.
 */
mapFn) => {
    const mappedObject = (0, mergeObjectsArray_js_1.mergeObjectsArray)(array.map((item) => {
        const key = item[mapKey];
        const value = mapFn ? mapFn(item, array) : item;
        return {
            [key]: value,
        };
    }));
    return mappedObject;
};
exports.createMappedObject = createMappedObject;
/**
 * Simpler mapped object creator that I need quite often!
 */
const createMappedKeysObject = (keys, map) => {
    const result = (0, mergeObjectsArray_js_1.mergeObjectsArray)(keys.map((key) => ({ [key]: map(key) })));
    return result;
};
exports.createMappedKeysObject = createMappedKeysObject;
/**
 * Simpler mapped object creator that I need quite often!
 */
const createPromisedMappedKeysObject = async (keys, map) => {
    const result = (0, mergeObjectsArray_js_1.mergeObjectsArray)(await Promise.all(keys.map(async (key) => ({ [key]: await map(key) }))));
    return result;
};
exports.createPromisedMappedKeysObject = createPromisedMappedKeysObject;
//# sourceMappingURL=createMappedObject.js.map