"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlParams = void 0;
/**
 * loose way of parsing url params into js types, supporting null, boolean, number, string */
const getUrlParams = (url) => {
    const params = new URL(url).searchParams;
    return Object.fromEntries(Array.from(params.entries()).map(([key, value]) => [
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
    ]));
};
exports.getUrlParams = getUrlParams;
//# sourceMappingURL=getUrlParams.js.map