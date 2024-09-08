"use strict";
/**
 * TODO: find a way to return the correct type interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjectsArray = void 0;
const mergeObjectsArray = (objectsArray) => {
    const result = objectsArray.reduce((previous, current) => {
        return { ...previous, ...current };
    }, {});
    return result;
};
exports.mergeObjectsArray = mergeObjectsArray;
//# sourceMappingURL=mergeObjectsArray.js.map