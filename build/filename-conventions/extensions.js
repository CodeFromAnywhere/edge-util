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
exports.codeExtensions = exports.fileTypes = exports.allowedSearchContentExtensions = exports.extensions = exports.getWriterType = exports.jsonExtensions = exports.markdownExtensions = exports.typescriptExtensions = exports.jsonExtensionsConst = exports.markdownExtensionsConst = exports.typescriptExtensionsConst = void 0;
exports.typescriptExtensionsConst = ["ts", "tsx"];
exports.markdownExtensionsConst = ["md", "mdx"];
exports.jsonExtensionsConst = ["json"];
exports.typescriptExtensions = __spreadArray([], __read(exports.typescriptExtensionsConst), false);
exports.markdownExtensions = __spreadArray([], __read(exports.markdownExtensionsConst), false);
exports.jsonExtensions = __spreadArray([], __read(exports.jsonExtensionsConst), false);
/**
 * Gets the writer type based on the extension
 */
var getWriterType = function (extension) {
    if (!extension)
        return "other";
    if (exports.typescriptExtensions.includes(extension))
        return "typescript";
    if (exports.markdownExtensions.includes(extension))
        return "markdown";
    return "other";
};
exports.getWriterType = getWriterType;
exports.extensions = {
    code: exports.typescriptExtensions,
    data: exports.jsonExtensions,
    text: exports.markdownExtensions,
};
exports.allowedSearchContentExtensions = __spreadArray(__spreadArray(__spreadArray([], __read(exports.typescriptExtensions), false), __read(exports.markdownExtensions), false), __read(exports.jsonExtensions), false);
exports.fileTypes = Object.keys(exports.extensions);
exports.codeExtensions = [
    "ts",
    "tsx",
    "js",
    "jsx",
    "php",
    "c",
    "h",
    "swift",
    "map",
];
//# sourceMappingURL=extensions.js.map