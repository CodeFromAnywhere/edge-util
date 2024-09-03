"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDbModelFolders = exports.indexDbModels = exports.typescriptIndexModels = void 0;
// NB: I'm creating circular imports if I start using any k-type things in convert-case, so be careful.
var convert_case_js_1 = require("../../convert-case.js");
exports.typescriptIndexModels = [
    "TsBuildError",
    "TsLintWarning",
    "TsExport",
    "TsImport",
    "TsComment",
    "TsInterface",
    "TsFunction",
    "TsVariable",
];
/**
 * All type interfaces that are used to index stuff, which are added to the database
 *
 * NB: It's not handy to get this from the database because this is used to generate the database xD
 */
exports.indexDbModels = __spreadArray([], __read(exports.typescriptIndexModels), false);
exports.indexDbModelFolders = exports.indexDbModels
    .map(convert_case_js_1.kebabCase)
    .map(function (f) { return "".concat(f, "s"); });
//# sourceMappingURL=TypescriptIndex.js.map