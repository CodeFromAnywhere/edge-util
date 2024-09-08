"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceLastOccurence = exports.reverseString = void 0;
const reverseString = (string) => {
    return string.split("").reverse().join("");
};
exports.reverseString = reverseString;
/**
 * Replaces the last occerence of something in a string by something else
 *
 * Example:
 *
 * ```ts
 * const result = replaceLastOccurence("theBestSlugSlugSlug", "Slug", "Slack");
 * console.log(result); // returns theBestSlugSlugSlack
 * ```
 *
 * NB: this is not the most efficient method, as it reverses the string by making it an array, twice. It can probably be done more efficiently by using `String.lastIndexOf`
 */
const replaceLastOccurence = (string, searchValue, replaceValue) => {
    const [reversedString, reversedSearchValue, reversedReplaceValue] = [
        string,
        searchValue,
        replaceValue,
    ].map(exports.reverseString);
    const replacedReversedString = reversedString.replace(reversedSearchValue, reversedReplaceValue);
    const replacedString = (0, exports.reverseString)(replacedReversedString);
    return replacedString;
};
exports.replaceLastOccurence = replaceLastOccurence;
//# sourceMappingURL=replaceLastOccurence.js.map