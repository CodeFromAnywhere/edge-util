"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapJson = void 0;
const tryParseJson_js_1 = require("./tryParseJson.js");
/** Tries to find JSON in strings in JSON. If it does, parses that JSON and replaces the string with the parsed JSON. */
const unwrapJson = (json) => {
    if (json === null) {
        return null;
    }
    if (json === undefined) {
        return null;
    }
    if (typeof json === "boolean") {
        return json;
    }
    if (typeof json === "object" && !Array.isArray(json)) {
        const result = Object.keys(json).map((key) => {
            const value = json[key];
            return { [key]: (0, exports.unwrapJson)(value) };
        });
        return result;
    }
    if (typeof json === "object" && Array.isArray(json)) {
        return json.map((item) => (0, exports.unwrapJson)(item));
    }
    if (typeof json === "string") {
        // THE MAGIC
        const parsed = (0, tryParseJson_js_1.tryParseJson)(json);
        return parsed || json;
    }
    //number is left
    return json;
};
exports.unwrapJson = unwrapJson;
//# sourceMappingURL=unwrapJson.js.map