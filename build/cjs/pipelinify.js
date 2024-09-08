"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelinify = void 0;
const general_js_1 = require("./general.js");
const general_js_2 = require("./general.js");
const promisifyValue_js_1 = require("./promisifyValue.js");
/**
 * Helper for `pipelinify`
 */
const pipelinifyOne = async (input, functions, context, config) => {
    let errors = [];
    const finalOutput = await functions.reduce(async (inputPromise, fn) => {
        const rawInputs = (0, general_js_1.makeArray)(await inputPromise);
        const inputs = rawInputs.filter(general_js_2.notEmpty);
        if (inputs.length === 0) {
            // should never happen
            return;
        }
        const rawOutput = await Promise.all(inputs.map((input) => fn(input, context)));
        if (config === null || config === void 0 ? void 0 : config.showErrors) {
            const errorInputValues = rawOutput
                .map((output, index) => (!output ? inputs[index] : undefined))
                .filter(general_js_2.notEmpty);
            //console.log({ errorInputValues });
            errors = errors.concat(errorInputValues.map((inputValue) => ({
                functionName: fn.name,
                inputValue,
            })));
        }
        const output = rawOutput.filter(general_js_2.notEmpty).flat();
        return output;
    }, (0, promisifyValue_js_1.promisifyValue)(input));
    return { output: finalOutput, errors };
};
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
const pipelinify = async (input, functions, context, config) => {
    if (!input) {
        return;
    }
    const inputs = (0, general_js_1.makeArray)(input);
    const result = await Promise.all(inputs.map((input) => pipelinifyOne(input, functions, context, config)));
    const output = result.map((x) => x.output).flat();
    const errors = result.map((x) => x.errors).flat();
    return { output, errors };
};
exports.pipelinify = pipelinify;
//# sourceMappingURL=pipelinify.js.map