"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSpecificSubExtension = void 0;
var general_js_1 = require("../general.js");
/**
 * Returns true if a fileid includes one of the specified subextensions.
 */
var hasSpecificSubExtension = function (srcRelativeFileId, subExtensions, 
/**
 * if true, also returns true if the extension is the complete name of the file
 */
includeRootName) {
    var subExtensionsArray = (0, general_js_1.makeArray)(subExtensions);
    var parts = srcRelativeFileId.split(".");
    var isSinglePart = parts.length === 1;
    var subExtension = parts.pop();
    var includesSubExtension = subExtensionsArray.includes(subExtension);
    var isCounting = includeRootName ? true : !isSinglePart;
    var has = isCounting && includesSubExtension;
    return has;
};
exports.hasSpecificSubExtension = hasSpecificSubExtension;
//# sourceMappingURL=hasSpecificSubExtension.js.map