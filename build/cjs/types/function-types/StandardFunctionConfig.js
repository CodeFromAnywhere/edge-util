"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsFunctionExposed = void 0;
/** Determines if a functino  */
const getIsFunctionExposed = (config) => {
    return (config === null || config === void 0 ? void 0 : config.isPublic) !== undefined || !!(config === null || config === void 0 ? void 0 : config.authorizations);
};
exports.getIsFunctionExposed = getIsFunctionExposed;
//# sourceMappingURL=StandardFunctionConfig.js.map