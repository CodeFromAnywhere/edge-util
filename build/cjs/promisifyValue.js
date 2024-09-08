"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyValue = void 0;
/**
 * Nice helper for async reducers!!
 */
const promisifyValue = (value) => {
    const promise = new Promise((resolve) => resolve(value));
    return promise;
};
exports.promisifyValue = promisifyValue;
//# sourceMappingURL=promisifyValue.js.map