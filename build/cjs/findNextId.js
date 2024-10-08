"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNextId = exports.charCodesToString = exports.getNextCharacter = void 0;
const general_js_1 = require("./general.js");
const getNextCharacter = (charCode) => {
    if (charCode < 48) {
        return 48;
    }
    if (charCode < 57) {
        return charCode + 1;
    }
    if (charCode < 65) {
        return 65;
    }
    if (charCode < 90) {
        return charCode + 1;
    }
    if (charCode < 97) {
        return 97;
    }
    if (charCode < 122) {
        return charCode + 1;
    }
    // > 122
    return null;
};
exports.getNextCharacter = getNextCharacter;
const charCodesToString = (charCodes) => {
    return charCodes.map((charCode) => String.fromCharCode(charCode)).join("");
};
exports.charCodesToString = charCodesToString;
/**
 * Function that finds the first next alphabetical available id in a list of ids
 * Needed for lmdb
 *
 * https://chat.openai.com/share/253a17ed-154b-4028-99bb-8769d2fa2f91
 */
const findNextId = (ids) => {
    const sorted = (0, general_js_1.makeArray)(ids).sort();
    const lastId = sorted.pop() || "0";
    const charCodes = lastId.split("").map((letter) => letter.charCodeAt(0));
    const zeroCharcode = 48;
    const zCharCode = 122;
    if (charCodes.length < 6) {
        // Base case 1: always add a 0 if its shorter than 6
        const newCharcodes = charCodes.concat(zeroCharcode);
        return (0, exports.charCodesToString)(newCharcodes);
    }
    const nonZIndex = charCodes.findLastIndex((c) => c < zCharCode);
    const newCharCodes = nonZIndex < 5 ? charCodes.slice(0, nonZIndex + 1) : charCodes;
    //console.log({ newCharCodes });
    if (charCodes.length === 6 && nonZIndex !== -1) {
        // Base case 2: if theres 6 and there's a nonZ index, just up that last one
        newCharCodes[nonZIndex] = (0, exports.getNextCharacter)(newCharCodes[nonZIndex]);
        const newId = (0, exports.charCodesToString)(newCharCodes);
        return newId;
    }
    // Rest case: not sure but it works :D
    const indexToIncrease = charCodes
        .map((charCode) => (0, exports.getNextCharacter)(charCode))
        .findIndex((charCode) => charCode !== null);
    const otherCharCodes = indexToIncrease === -1
        ? charCodes.concat(zeroCharcode)
        : charCodes
            .slice(0, indexToIncrease + 1)
            .map((c, i) => i === indexToIncrease ? (0, exports.getNextCharacter)(c) : c);
    const newId = (0, exports.charCodesToString)(otherCharCodes);
    return newId;
};
exports.findNextId = findNextId;
//# sourceMappingURL=findNextId.js.map