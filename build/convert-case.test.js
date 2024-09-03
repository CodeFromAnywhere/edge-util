"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
var convert_case_js_1 = require("./convert-case.js");
var convert_case_js_2 = require("./convert-case.js");
var convert_case_js_3 = require("./convert-case.js");
var convert_case_js_4 = require("./convert-case.js");
var convert_case_js_5 = require("./convert-case.js");
var convert_case_js_6 = require("./convert-case.js");
var test = function () {
    var testCases = [
        "Handige harry",
        "handigeHarry",
        "HandigeHarry",
        "handige-harry",
        "handige_harry",
        "HANDIGE_HARRY",
    ];
    var results = testCases.map(function (word) {
        return {
            word: word,
            camel: (0, convert_case_js_1.camelCase)(word),
            snake: (0, convert_case_js_6.snakeCase)(word),
            kebab: (0, convert_case_js_4.kebabCase)(word),
            pascal: (0, convert_case_js_5.pascalCase)(word),
            capital: (0, convert_case_js_2.capitalCase)(word),
            human: (0, convert_case_js_3.humanCase)(word),
        };
    });
    return results;
};
exports.test = test;
var expectedResult = JSON.stringify([
    {
        word: "Handige harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handigeHarry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "HandigeHarry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handige-harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "handige_harry",
        camel: "handigeHarry",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HandigeHarry",
        capital: "HANDIGE_HARRY",
        human: "Handige harry",
    },
    {
        word: "HANDIGE_HARRY",
        camel: "handigeHARRY",
        snake: "handige_harry",
        kebab: "handige-harry",
        pascal: "HANDIGEHARRY",
        capital: "HANDIGE_HARRY",
        human: "HANDIGE harry",
    },
]);
//# sourceMappingURL=convert-case.test.js.map