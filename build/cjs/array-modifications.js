"use strict";
/**
 Insert an array or item inside of an array before a certain index
 
 Example:

 ```ts

 const testArray = [1, 2, 3, 4, 5];
 const result = insertAt(testArray, [99, 100], 2);
 console.log({ testArray, result });

 ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.putIndexAtIndex = exports.findLastIndex = exports.removeIndexFromArray = exports.insertAt = void 0;
const insertAt = (array, items, 
/**
 *
 */
beforeIndex) => {
    const itemsArray = Array.isArray(items) ? items : [items];
    // NB: slice makes copies
    const before = array.slice(0, beforeIndex);
    const after = array.slice(beforeIndex);
    return [...before, ...itemsArray, ...after];
};
exports.insertAt = insertAt;
/**
 removes an index from an array

 example:
 
 ```ts
const exampleArray = ["a", "b", "c", "d", "e"];
console.log(removeIndexFromArray(exampleArray, 2)); //c should be removed
```
 */
const removeIndexFromArray = (array, index) => {
    const before = array.slice(0, index);
    const after = array.slice(index + 1);
    return [...before, ...after];
};
exports.removeIndexFromArray = removeIndexFromArray;
/**
 * finds the last index of an array where a certain filter holds true
 */
const findLastIndex = (array, findFn) => {
    var _a;
    const lastIndex = (_a = array
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => findFn(item))
        .pop()) === null || _a === void 0 ? void 0 : _a.index;
    return lastIndex;
};
exports.findLastIndex = findLastIndex;
/**
 * Takes an item from an index of an array and put it somewhere at another index
 */
const putIndexAtIndex = (array, index, toIndex) => {
    const item = array[index];
    const arrayWithoutIndex = (0, exports.removeIndexFromArray)(array, index);
    const changedArray = (0, exports.insertAt)(arrayWithoutIndex, item, toIndex);
    return changedArray;
};
exports.putIndexAtIndex = putIndexAtIndex;
//# sourceMappingURL=array-modifications.js.map