"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeExtensions = exports.fileTypes = exports.allowedSearchContentExtensions = exports.extensions = exports.getWriterType = exports.jsonExtensions = exports.markdownExtensions = exports.typescriptExtensions = exports.jsonExtensionsConst = exports.markdownExtensionsConst = exports.typescriptExtensionsConst = void 0;
exports.typescriptExtensionsConst = ["ts", "tsx"];
exports.markdownExtensionsConst = ["md", "mdx"];
exports.jsonExtensionsConst = ["json"];
exports.typescriptExtensions = [...exports.typescriptExtensionsConst];
exports.markdownExtensions = [...exports.markdownExtensionsConst];
exports.jsonExtensions = [...exports.jsonExtensionsConst];
/**
 * Gets the writer type based on the extension
 */
const getWriterType = (extension) => {
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
exports.allowedSearchContentExtensions = [
    ...exports.typescriptExtensions,
    ...exports.markdownExtensions,
    ...exports.jsonExtensions,
];
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