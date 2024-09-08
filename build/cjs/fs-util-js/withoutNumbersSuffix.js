"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutNumbersSuffix = void 0;
/**
 * removes the numbers at the end of a filename. E.g. "picture88" becomes "picture"
 */
const withoutNumbersSuffix = (filename) => {
    const reverse = filename.split("").reverse();
    const firstLetterIndex = reverse.findIndex((letter) => isNaN(Number(letter)));
    if (firstLetterIndex === 0) {
        // no numbers at the end
        return filename;
    }
    const withoutNumbers = reverse.slice(firstLetterIndex).reverse().join("");
    return withoutNumbers;
};
exports.withoutNumbersSuffix = withoutNumbersSuffix;
//# sourceMappingURL=withoutNumbersSuffix.js.map