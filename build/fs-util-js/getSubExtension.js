"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubExtension = void 0;
/**
 * Provide a filename including its extension, to get the subextension.
 */
var getSubExtension = function (filename) {
    var parts = filename.split(".");
    //removes extension
    parts.pop();
    //returns extension that's left (the sub-extension)
    var subExtension = parts.pop();
    return subExtension;
};
exports.getSubExtension = getSubExtension;
//# sourceMappingURL=getSubExtension.js.map