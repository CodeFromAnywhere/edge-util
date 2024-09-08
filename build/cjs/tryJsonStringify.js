"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryJsonStringify = void 0;
const tryJsonStringify = (data) => {
    try {
        return JSON.stringify(data, null, 2);
    }
    catch (e) {
        return;
    }
};
exports.tryJsonStringify = tryJsonStringify;
//# sourceMappingURL=tryJsonStringify.js.map