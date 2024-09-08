"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseJson = void 0;
const removeCommentsRegex = /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
/**
 * if text isn't json, returns null
 */
const tryParseJson = (text, logParseError) => {
    try {
        const jsonStringWithoutComments = text.replace(removeCommentsRegex, (m, g) => (g ? "" : m));
        return JSON.parse(jsonStringWithoutComments);
    }
    catch (parseError) {
        if (logParseError)
            console.log("JSON Parse error:", parseError);
        return null;
    }
};
exports.tryParseJson = tryParseJson;
//# sourceMappingURL=tryParseJson.js.map