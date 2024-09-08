#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneByOne = void 0;
/**
 * for every item in an array, executes an async callback, one by one.
 * promises an array of the results of every callback once it's done
 */
const oneByOne = async (array, callback, timeBetweenCallbacksMs) => {
    const getResults = async (results, instance, index, array) => {
        const awaitedResults = await results;
        // NB: as U is not really correct but we're solving that later
        const result = timeBetweenCallbacksMs
            ? callback(instance, index, awaitedResults)
            : (await callback(instance, index, awaitedResults));
        if (timeBetweenCallbacksMs) {
            await new Promise((resolve) => setTimeout(() => resolve(), timeBetweenCallbacksMs));
        }
        const newResults = [...awaitedResults, result];
        return newResults;
    };
    const result = await array.reduce(getResults, new Promise((resolve) => resolve([])));
    // NB: here we're solving the fact that it returns promises in case of `timeBetweenCallbackMs`
    const realResult = await Promise.all(result);
    return realResult;
};
exports.oneByOne = oneByOne;
//# sourceMappingURL=oneByOne.js.map