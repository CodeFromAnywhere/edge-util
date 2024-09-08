"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectMapToArray = exports.mapKeys = exports.mapValuesSync = exports.objectValuesMap = exports.objectMapSync = exports.objectMapAsync = void 0;
const general_js_1 = require("./general.js");
const getObjectKeysArray_js_1 = require("./getObjectKeysArray.js");
const mergeObjectsArray_js_1 = require("./mergeObjectsArray.js");
/**
 * Map an object asynchronously and return the same object with the mapped result in its values
 *
 * Example usage:
 *
 *
```ts

  const srcFileContentObject = {
    "index.ts": indexString,
    "public-local.ts": publicLocalTypescriptFileString,
    "public.ts": publicTypescriptFileString,
  };

  const srcFileWriteSuccessObject = await objectMapAsync(srcFileContentObject, async (operationRelativeTypescriptFilePath,content)=>{

    try {
      await fs.writeFile(
        path.join(operationBasePath, "src", operationRelativeTypescriptFilePath),
        content,
        "utf8"
      );

      return true;
    
    } catch {
      return false;
    }

  });

```

 */
const objectMapAsync = async (object, mapFn) => {
    const keys = (0, getObjectKeysArray_js_1.getObjectKeysArray)(object);
    const result = (0, mergeObjectsArray_js_1.mergeObjectsArray)(await Promise.all(keys.map(async (key) => {
        const value = object[key];
        return { [key]: await mapFn(key, value) };
    })));
    return result;
};
exports.objectMapAsync = objectMapAsync;
/**
 * maps over all values in an object and replaces them using a mapfn
 *
 * Example usage:
 *
 * ```ts
 *
const result = objectMapSync({ hello: "world", isTrue: true }, (key,value) => {
  return `${value}123`;
});
```
 */
const objectMapSync = (object, mapFn) => {
    const valueObjectParts = (0, getObjectKeysArray_js_1.getObjectKeysArray)(object).map((key) => {
        return { [key]: mapFn(key, object[key]) };
    });
    const merged = (0, mergeObjectsArray_js_1.mergeObjectsArray)(valueObjectParts);
    return merged;
};
exports.objectMapSync = objectMapSync;
/**
 * not sure if this is the best way, but it does save some lines of code!
 *
 * maps over an object's values with a map function
 *
 * DEPRECATED in favour of objectMapSync and objectMapAsync
 */
const objectValuesMap = (object, mapFn) => {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(key, object[key]);
        return result;
    }, {});
};
exports.objectValuesMap = objectValuesMap;
/**
 * maps over all values in an object and replaces them using a mapfn
 *
 * sync
 */
const mapValuesSync = (object, mapFn) => {
    const valueObjectParts = Object.keys(object).map((key) => {
        return { [key]: mapFn(object[key]) };
    });
    return (0, mergeObjectsArray_js_1.mergeObjectsArray)(valueObjectParts);
};
exports.mapValuesSync = mapValuesSync;
/**
 * maps over all keys in an object and replaces them using a mapfn
 */
const mapKeys = async (object, mapFn) => {
    const keyPairs = await Promise.all(Object.keys(object).map(async (oldKey) => {
        return { oldKey, newKey: await mapFn(oldKey) };
    }));
    return (0, mergeObjectsArray_js_1.mergeObjectsArray)(keyPairs
        .map((pair) => {
        return pair.newKey ? { [pair.newKey]: object[pair.oldKey] } : null;
    })
        .filter(general_js_1.notEmpty));
};
exports.mapKeys = mapKeys;
/** Turns an object mapped datastructure into a regular array  */
const objectMapToArray = (objectMap, 
/** If defined will use this as propterty, otherwise will just use "key" */
keyPropertyName) => {
    const items = !objectMap
        ? []
        : Object.keys(objectMap).map((key) => {
            const keyName = keyPropertyName || "key";
            const keyObject = { [keyName]: key };
            const newItem = { ...keyObject, ...objectMap[key] };
            return newItem;
        });
    return items;
};
exports.objectMapToArray = objectMapToArray;
// const res = objectMapToArray(
//   { x: { name: "x", age: 23 }, y: { name: "y", age: 30 } },
//   "letter",
// );
//# sourceMappingURL=object-maps.js.map