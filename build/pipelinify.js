"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelinify = void 0;
var general_js_1 = require("./general.js");
var general_js_2 = require("./general.js");
var promisifyValue_js_1 = require("./promisifyValue.js");
/**
 * Helper for `pipelinify`
 */
var pipelinifyOne = function (input, functions, context, config) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, finalOutput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = [];
                return [4 /*yield*/, functions.reduce(function (inputPromise, fn) { return __awaiter(void 0, void 0, void 0, function () {
                        var rawInputs, _a, inputs, rawOutput, errorInputValues, output;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = general_js_1.makeArray;
                                    return [4 /*yield*/, inputPromise];
                                case 1:
                                    rawInputs = _a.apply(void 0, [_b.sent()]);
                                    inputs = rawInputs.filter(general_js_2.notEmpty);
                                    if (inputs.length === 0) {
                                        // should never happen
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, Promise.all(inputs.map(function (input) { return fn(input, context); }))];
                                case 2:
                                    rawOutput = _b.sent();
                                    if (config === null || config === void 0 ? void 0 : config.showErrors) {
                                        errorInputValues = rawOutput
                                            .map(function (output, index) { return (!output ? inputs[index] : undefined); })
                                            .filter(general_js_2.notEmpty);
                                        //console.log({ errorInputValues });
                                        errors = errors.concat(errorInputValues.map(function (inputValue) { return ({
                                            functionName: fn.name,
                                            inputValue: inputValue,
                                        }); }));
                                    }
                                    output = rawOutput.filter(general_js_2.notEmpty).flat();
                                    return [2 /*return*/, output];
                            }
                        });
                    }); }, (0, promisifyValue_js_1.promisifyValue)(input))];
            case 1:
                finalOutput = _a.sent();
                return [2 /*return*/, { output: finalOutput, errors: errors }];
        }
    });
}); };
/**
 * Chain functions more easily with **pipelinify**!
 *
 * Works as long as output type is the input type for the next function.
 *
 * If you ask for errors, all things returning falsy will be shown in the errors array!
 *
 * Rules:
 * - chain-functions can never take an array as input
 * - second argument must be a context object, if taken
 * - nested arrays are always flattened at every step
 * - falsy (empty) results in the array are filtered out
 *
 * TODO:
 * - make this compatible with StandardResponse functions too so we also know the reason for an error (isSuccessful:false, message:string)
 * - might be interesting too to chain standardresponse functions as well, but that is basically the same as middleware and don't do well in typescript
 *
 * GOTCHA:
 * - This doesn't verify the types, so make sure you go over the types. Maybe i can once make an extra config parameter `isTest` that looks up the type-spec and confirms the typespec is validated. This can then be ran as test
 *
 *
 */
var pipelinify = function (input, functions, context, config) { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, result, output, errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!input) {
                    return [2 /*return*/];
                }
                inputs = (0, general_js_1.makeArray)(input);
                return [4 /*yield*/, Promise.all(inputs.map(function (input) { return pipelinifyOne(input, functions, context, config); }))];
            case 1:
                result = _a.sent();
                output = result.map(function (x) { return x.output; }).flat();
                errors = result.map(function (x) { return x.errors; }).flat();
                return [2 /*return*/, { output: output, errors: errors }];
        }
    });
}); };
exports.pipelinify = pipelinify;
//# sourceMappingURL=pipelinify.js.map