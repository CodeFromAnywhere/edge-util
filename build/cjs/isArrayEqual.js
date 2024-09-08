"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayEqual = void 0;
const isArrayEqual = (a, b) => {
    return (Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]));
};
exports.isArrayEqual = isArrayEqual;
//# sourceMappingURL=isArrayEqual.js.map