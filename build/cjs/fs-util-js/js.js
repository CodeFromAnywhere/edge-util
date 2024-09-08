"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.withoutExtension = exports.removeTrailingSlash = exports.isPathRelative = exports.getFileOrFolderName = exports.getFolderJs = void 0;
const getFolderJs = (filePath) => {
    if (filePath === undefined)
        return undefined;
    const chunks = filePath.split("/");
    chunks.pop();
    const allWithoutFile = chunks.join("/");
    return allWithoutFile;
};
exports.getFolderJs = getFolderJs;
const getFileOrFolderName = (fileOrFolderPath) => {
    if (!fileOrFolderPath)
        return undefined;
    const last = fileOrFolderPath.split("/").pop();
    return last;
};
exports.getFileOrFolderName = getFileOrFolderName;
const isPathRelative = (path) => path.startsWith("./") || path.startsWith("../");
exports.isPathRelative = isPathRelative;
const removeTrailingSlash = (p) => p.charAt(0) === "/" ? p.slice(1) : p;
exports.removeTrailingSlash = removeTrailingSlash;
/**
 * removes extension from the filename
 *
 */
const withoutExtension = (fileName) => {
    const pieces = fileName.split(".");
    pieces.pop();
    return pieces.join(".");
};
exports.withoutExtension = withoutExtension;
/**
 * returns the extension of the filename or path WITHOUT dot
 *
 * NB: not sure, but could be nice to replace this with path.extname(pathString)
 */
const getExtension = (fileNameOrPath) => {
    const pieces = fileNameOrPath.split(".");
    return pieces.pop();
};
exports.getExtension = getExtension;
//# sourceMappingURL=js.js.map