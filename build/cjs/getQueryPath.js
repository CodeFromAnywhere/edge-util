"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryPath = void 0;
const getQueryPath = (parsedUrlQuery) => {
    const paths = parsedUrlQuery === null || parsedUrlQuery === void 0 ? void 0 : parsedUrlQuery.paths;
    const queryPath = Array.isArray(paths)
        ? paths.join("/")
        : paths === undefined
            ? ""
            : paths;
    return queryPath;
};
exports.getQueryPath = getQueryPath;
//# sourceMappingURL=getQueryPath.js.map