"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseYamlToJson = void 0;
const js_yaml_1 = require("js-yaml");
/**
 * try-catches js-yaml to turn the yamlString into JSON
 */
const tryParseYamlToJson = (yamlString) => {
    // Get document, or throw exception on error
    try {
        const document = (0, js_yaml_1.load)(yamlString);
        return document;
    }
    catch (e) {
        // console.log("failed parsing yaml", e?.message);
        return null;
    }
};
exports.tryParseYamlToJson = tryParseYamlToJson;
//# sourceMappingURL=tryParseYamlToJson.js.map