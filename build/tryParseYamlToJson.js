"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseYamlToJson = void 0;
var js_yaml_1 = require("js-yaml");
var load = js_yaml_1.default.load;
/**
 * try-catches js-yaml to turn the yamlString into JSON
 */
var tryParseYamlToJson = function (yamlString) {
    // Get document, or throw exception on error
    try {
        var document_1 = load(yamlString);
        return document_1;
    }
    catch (e) {
        // console.log("failed parsing yaml", e?.message);
        return null;
    }
};
exports.tryParseYamlToJson = tryParseYamlToJson;
//# sourceMappingURL=tryParseYamlToJson.js.map