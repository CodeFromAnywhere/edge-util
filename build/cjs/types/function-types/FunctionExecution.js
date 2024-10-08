"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionExersize = void 0;
const getExamples = async (functionName) => {
    // const examples = (await db.get("FunctionExecution")).filter(x=>x.isExample && x.functionName === functionName)
};
const getFunctionExersize = async (functionId) => {
    //1) get the function, make the description, input, and output string
    const descriptionString = "";
    const inputString = "";
    const outputString = "";
    //2) get all it's examples from `FunctionExecution`, make the example string
    const examplesString = 'Input `x, y, z`. Output should be "a"';
    return `
Write a function that can do this:

${descriptionString}

It should take this as its inputs:

${inputString}

It should return this:

${outputString}

Some examples:

${examplesString}
`;
};
exports.getFunctionExersize = getFunctionExersize;
//# sourceMappingURL=FunctionExecution.js.map