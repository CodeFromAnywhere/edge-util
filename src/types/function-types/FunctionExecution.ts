import { DefaultModelType } from "../model-types/index.js";
import { Id } from "../model-types/index.js";
import { PerformanceItem } from "../../measure-performance/index.js";
import { TsFunction } from "./TsFunction.js";
/**
 * Model for tests, examples, cache, and recent executions of any function
 *
 * Requirement for **tifo-stitching**

Example: 

const someFunction = (inputA: string, inputB:string):string => {

  return `${inputA} != ${inputB}`
}


// find this in the database after executing the function

const functionExecution1 = {
  ....
  functionName: "someFunction",
  inputParameters: ["hello", "world"],
  output: "hello != world",
  isTest: false,
  isExample: false,
  isResultFromCache: false,
  performance: [....],
}

*/

export interface FunctionExecution extends DefaultModelType {
  functionName: string;
  tsFunctionId: Id;
  tsFunction?: TsFunction;
  inputParameters: any[] | undefined;
  output: any;
  isTest: boolean;
  isExample: boolean;
  /**
   * test description or example description or anything
   */
  description?: string;
  isResultFromCache: boolean;
  /**
   * if true, the api of the function (input/output interface) has changed in bewteen, so the re-execution would probably fail or return a different result
   */
  hasApiChanged?: boolean;
  performance: PerformanceItem[];
  /**
   * If given, this is the amount of credit that was paid for executing this function.
   */
  cost?: number;
  /**
   * should be given when cost is given if `groupSlug` is not given
   */
  personSlug?: string;
  /**
   * should be given when cost is given if `groupSlug` is not given
   */
  groupSlug?: string;
}

const getExamples = async (functionName: string) => {
  // const examples = (await db.get("FunctionExecution")).filter(x=>x.isExample && x.functionName === functionName)
};

export const getFunctionExersize = async (
  functionId: string,
): Promise<string> => {
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
