"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapJson = void 0;
var tryParseJson_js_1 = require("./tryParseJson.js");
/** Tries to find JSON in strings in JSON. If it does, parses that JSON and replaces the string with the parsed JSON. */
var unwrapJson = function (json) {
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
        var result = Object.keys(json).map(function (key) {
            var _a;
            var value = json[key];
            return _a = {}, _a[key] = (0, exports.unwrapJson)(value), _a;
        });
        return result;
    }
    if (typeof json === "object" && Array.isArray(json)) {
        return json.map(function (item) { return (0, exports.unwrapJson)(item); });
    }
    if (typeof json === "string") {
        // THE MAGIC
        var parsed = (0, tryParseJson_js_1.tryParseJson)(json);
        return parsed || json;
    }
    //number is left
    return json;
};
exports.unwrapJson = unwrapJson;
//# sourceMappingURL=unwrapJson.js.map