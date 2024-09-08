"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumAllKeys = exports.sumObjectParameters = exports.getObjectFromParamsString = exports.takeFirst = exports.makeArray = exports.onlyDuplicates = exports.onlyUnique2 = exports.isAllTrue = exports.groupByKey = exports.createEnum = exports.apply = exports.sum = exports.noEmptyString = void 0;
exports.onlyUnique = onlyUnique;
exports.notEmpty = notEmpty;
const mergeObjectsArray_js_1 = require("./mergeObjectsArray.js");
const noEmptyString = (input) => {
    if (input === "")
        return undefined;
    return input;
};
exports.noEmptyString = noEmptyString;
const sum = (items) => {
    const total = items.reduce((total, num) => {
        if (typeof num !== "number") {
            console.log("WTF", num);
        }
        return total + num;
    }, 0);
    return total;
};
exports.sum = sum;
// sum([1, 2, 3]);
/**
 * function that takes an array of functions and applies them one by one, on the value or the result of the previous function. Only possible if the type of the value stays the same.
 *
 * NB: don't do just "T" as this conflicts in tsx files.
 */
const apply = (functions, value) => {
    return functions.reduce((val, fn) => {
        return fn(val);
    }, value);
};
exports.apply = apply;
/**
 * creates an enum object from a readonly const array so you don't have to
 * ------
 * const taskNames = ["a","b","c"] as const;
 * type TaskNames = typeof taskNames[number];
 * const enummm = createEnum(taskNames);
 * (value of enummm: { a: "a", b: "b", c: "c" })
 */
const createEnum = (array) => array.reduce((previous, current) => {
    return { ...previous, [current]: current };
}, {});
exports.createEnum = createEnum;
/**
 * key should be of type string!
 *
 * input = [{path:"xyz"},{path:"xyz"},{path:"abc"}]
 * groupByKey(input, "path")
 * ouput: { xyz: [{path:"xyz"},{path:"xyz"}], abc: [{path:"abc"}]}
 */
const groupByKey = (array, key) => {
    return array.reduce((all, item) => {
        const newAll = all;
        const keyToUse = item[key];
        const already = newAll[keyToUse];
        if (!already) {
            // create a new parameter in the group-object
            newAll[item[key]] = [item];
        }
        else {
            // push to existing group-object parameter
            newAll[item[key]].push(item);
        }
        return newAll;
    }, {});
};
exports.groupByKey = groupByKey;
/**
 * checks if all items in an array are truthy
 */
const isAllTrue = (array) => {
    const result = array.find((x) => !x);
    //  console.log({ result });
    return result === undefined;
};
exports.isAllTrue = isAllTrue;
/**
 * DEPRECATED: should refactor everything to use onlyUnique2 and call it onlyUnique again
 *
 * to be used as a filter. removes duplicates
 */
function onlyUnique(value, index, self) {
    return self.findIndex((v) => v === value) === index;
}
/**
 * function that returns a filter function that can be used as a filter for any array. removes duplicates.
 *
 * optionally takes a compare function that should return a "true" if two instances are equal. if you use this function, make sure to pass a generic of the type the items will have, in order to make this equality function type safe as well
 *
 *
 */
const onlyUnique2 = (isEqualFn) => (value, index, self) => {
    return (self.findIndex((v) => (isEqualFn ? isEqualFn(v, value) : v === value)) ===
        index);
};
exports.onlyUnique2 = onlyUnique2;
/**
 * Useful function to find duplicates
 */
const onlyDuplicates = (isEqualFn) => (value, index, self) => {
    return (self.findIndex((v) => (isEqualFn ? isEqualFn(v, value) : v === value)) !==
        index);
};
exports.onlyDuplicates = onlyDuplicates;
/**
 * if something is not an array, returns it as the first element of an array
 *
 * if the input is undefined, an empty array will be returned.
 *
 * NB: TODO: find out the workings of the array constructor (`Array("any value")`), because maybe it does something very similar. No need to have a dependency then if it's similar.
 */
const makeArray = (...arrayOrNotArray) => {
    return arrayOrNotArray
        .map((arrayOrNot) => {
        const array = arrayOrNot
            ? Array.isArray(arrayOrNot)
                ? arrayOrNot
                : [arrayOrNot]
            : [];
        return array;
    })
        .flat();
};
exports.makeArray = makeArray;
/**
 * takes any type T or an array of T and returns T or the first of the array (which is T)
 */
const takeFirst = (arrayOrNot) => {
    return (0, exports.makeArray)(arrayOrNot)[0];
};
exports.takeFirst = takeFirst;
/**
 * useful for cli's that only take strings. This creates an object from a string
 *
 * input: "x:a, y:b, z:c"
 * output: { x: "a", y: "b", z: "c" }
 *
 * TODO: would be nice if we can validate this string immediately using a JSON SCHEMA
 */
const getObjectFromParamsString = (paramsString) => (0, mergeObjectsArray_js_1.mergeObjectsArray)(paramsString
    .split(",")
    .map((x) => x.trim().split(":"))
    .map((pair) => pair[0] && pair[1] ? { [pair[0].trim()]: pair[1] } : null)
    .filter(notEmpty));
exports.getObjectFromParamsString = getObjectFromParamsString;
/** sums all parameters in two objects together */
const sumObjectParameters = (object1, object2) => {
    const objectKeys = Object.keys(object1);
    const summedObject = (0, mergeObjectsArray_js_1.mergeObjectsArray)(objectKeys.map((key) => {
        const summedObjectPart = { [key]: object1[key] + object2[key] };
        return summedObjectPart;
    }));
    // NB: too bad we still need `as TObject` here. I would love to learn how to prevent that
    return summedObject;
};
exports.sumObjectParameters = sumObjectParameters;
/**
 * sums all keys of an array of objects, assuming the objects have the same datastructure and assuming the values contain either numbers or undefined
 */
const sumAllKeys = (objectArray, keys) => {
    const sumObject = objectArray.reduce((total, item) => {
        // NB: not needed normally, but there seems to be some corrupt data here and there
        if (!item)
            return total;
        const newTotal = (0, mergeObjectsArray_js_1.mergeObjectsArray)(keys.map((key) => {
            const value1 = total ? total[key] || 0 : 0;
            const value2 = (item === null || item === void 0 ? void 0 : item[key]) || 0;
            const sum = (!total || total[key] === undefined) && item[key] === undefined
                ? undefined
                : value1 + value2;
            return { [key]: sum };
        }));
        return newTotal;
    }, null);
    return sumObject;
};
exports.sumAllKeys = sumAllKeys;
/**
 * Removes empty values (null or undefined) from your arrays in a type-safe way
 */
function notEmpty(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=general.js.map