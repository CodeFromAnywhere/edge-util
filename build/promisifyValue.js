"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyValue = void 0;
/**
 * Nice helper for async reducers!!
 */
var promisifyValue = function (value) {
    var promise = new Promise(function (resolve) { return resolve(value); });
    return promise;
};
exports.promisifyValue = promisifyValue;
//# sourceMappingURL=promisifyValue.js.map