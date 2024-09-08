"use strict";
/**
 * Trims a slash on both sides in any path
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimSlashes = void 0;
const trimSlashes = (absoluteOrRelativePath) => {
    const isFirstCharacterSlash = absoluteOrRelativePath.charAt(0) === "/";
    const isLastCharacterSlash = absoluteOrRelativePath.charAt(absoluteOrRelativePath.length - 1) === "/";
    const withoutSlashPrefix = isFirstCharacterSlash
        ? absoluteOrRelativePath.slice(1)
        : absoluteOrRelativePath;
    const withoutSlashSuffix = isLastCharacterSlash
        ? withoutSlashPrefix.slice(0, withoutSlashPrefix.length - 1)
        : withoutSlashPrefix;
    return withoutSlashSuffix;
};
exports.trimSlashes = trimSlashes;
//# sourceMappingURL=trimSlashes.js.map