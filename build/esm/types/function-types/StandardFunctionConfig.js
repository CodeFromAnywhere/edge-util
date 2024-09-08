/** Determines if a functino  */
export const getIsFunctionExposed = (config) => {
    return (config === null || config === void 0 ? void 0 : config.isPublic) !== undefined || !!(config === null || config === void 0 ? void 0 : config.authorizations);
};
//# sourceMappingURL=StandardFunctionConfig.js.map