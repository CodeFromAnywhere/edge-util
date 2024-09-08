"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGeneratedOperationName = exports.isGeneratedOperation = void 0;
const isGeneratedOperation = (operationBasePath) => {
    return operationBasePath.includes("/generated/");
};
exports.isGeneratedOperation = isGeneratedOperation;
const isGeneratedOperationName = (operationName) => {
    if (!operationName)
        return false;
    return operationName === "sdk" || operationName.startsWith("sdk-");
};
exports.isGeneratedOperationName = isGeneratedOperationName;
//# sourceMappingURL=isGeneratedOperation.js.map