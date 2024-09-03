"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbsoluteImport = void 0;
var isAbsoluteImport = function (moduleString) {
    return moduleString ? !moduleString.startsWith(".") : false;
};
exports.isAbsoluteImport = isAbsoluteImport;
//# sourceMappingURL=isAbsoluteImport.js.map