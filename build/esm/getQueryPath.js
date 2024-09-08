export const getQueryPath = (parsedUrlQuery) => {
    const paths = parsedUrlQuery === null || parsedUrlQuery === void 0 ? void 0 : parsedUrlQuery.paths;
    const queryPath = Array.isArray(paths)
        ? paths.join("/")
        : paths === undefined
            ? ""
            : paths;
    return queryPath;
};
//# sourceMappingURL=getQueryPath.js.map