"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSpecificSubExtension = void 0;
const general_js_1 = require("../general.js");
/**
 * Returns true if a fileid includes one of the specified subextensions.
 */
const hasSpecificSubExtension = (srcRelativeFileId, subExtensions, 
/**
 * if true, also returns true if the extension is the complete name of the file
 */
includeRootName) => {
    const subExtensionsArray = (0, general_js_1.makeArray)(subExtensions);
    const parts = srcRelativeFileId.split(".");
    const isSinglePart = parts.length === 1;
    const subExtension = parts.pop();
    const includesSubExtension = subExtensionsArray.includes(subExtension);
    const isCounting = includeRootName ? true : !isSinglePart;
    const has = isCounting && includesSubExtension;
    return has;
};
exports.hasSpecificSubExtension = hasSpecificSubExtension;
//# sourceMappingURL=hasSpecificSubExtension.js.map