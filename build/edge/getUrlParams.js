"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlParams = void 0;
/**
 * loose way of parsing url params into js types, supporting null, boolean, number, string */
var getUrlParams = function (url) {
    var params = new URL(url).searchParams;
    return Object.fromEntries(Array.from(params.entries()).map(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return [
            key,
            value === "null"
                ? null
                : value === "true"
                    ? true
                    : value === "false"
                        ? false
                        : !isNaN(Number(value))
                            ? Number(value)
                            : value,
        ];
    }));
};
exports.getUrlParams = getUrlParams;
//# sourceMappingURL=getUrlParams.js.map