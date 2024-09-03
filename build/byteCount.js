"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteCount = void 0;
/**
 * This function will return the byte size of any UTF-8 string you pass to it.
 */
var byteCount = function (s) {
    return encodeURI(s).split(/%..|./).length - 1;
};
exports.byteCount = byteCount;
//# sourceMappingURL=byteCount.js.map