"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringSizeSummary = void 0;
const byteCount_js_1 = require("./byteCount.js");
/**
 * Takes a string and simply returns the amount of characters, the amount of lines and the amount of bytes
 */
const getStringSizeSummary = (string) => {
    const characters = string.length;
    const lines = string.split("\n").length;
    const bytes = (0, byteCount_js_1.byteCount)(string);
    return {
        characters,
        lines,
        bytes,
        bytesPerCharacter: bytes / characters,
        charactersPerLine: Math.round(characters / lines),
        linesPerFile: lines,
        numberOfFiles: 1,
    };
};
exports.getStringSizeSummary = getStringSizeSummary;
//# sourceMappingURL=getStringSizeSummary.js.map