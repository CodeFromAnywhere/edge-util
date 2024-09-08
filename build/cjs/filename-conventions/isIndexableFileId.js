"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIndexableFileId = void 0;
const filename_conventions_js_1 = require("./filename-conventions.js");
const filename_conventions_js_2 = require("./filename-conventions.js");
const hasSpecificSubExtension_js_1 = require("./hasSpecificSubExtension.js");
/**
 * Used to ensure the file can be put in the indexfile (things like .test and .cli should not)
 * Also used to determine what is in the index file and thus what should be in the SDK
 */
const isIndexableFileId = (fileId) => {
    const isOperationName = (0, hasSpecificSubExtension_js_1.hasSpecificSubExtension)(fileId, filename_conventions_js_2.operationUnindexableNamesOrSubExtensions, true);
    const isFrontendOptionalName = (0, hasSpecificSubExtension_js_1.hasSpecificSubExtension)(fileId, filename_conventions_js_1.frontendOptionalFileSubExtensions, false);
    const isTypescriptDeclarationFile = (0, hasSpecificSubExtension_js_1.hasSpecificSubExtension)(fileId, ["d"], false);
    const isIndex = fileId === "index";
    const isIndexable = !isIndex &&
        !isTypescriptDeclarationFile &&
        !isFrontendOptionalName &&
        !isOperationName;
    return isIndexable;
};
exports.isIndexableFileId = isIndexableFileId;
//# sourceMappingURL=isIndexableFileId.js.map