"use strict";
/**
 * KISS; fuck grammar
 *
 * If we are going to apply grammar here, it becomes impossible to create typescript rules that can detect and convert plural/singular parameter names.
 *
 * To pluralize any word we simply attach an "s" at the end
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSingular = exports.isPlural = exports.singularize = exports.pluralize = void 0;
const pluralize = (parameterName) => {
    return parameterName.concat("s");
};
exports.pluralize = pluralize;
/**
 * Removes the 's' if it is found at the end of the parameter name
 */
const singularize = (parameterName) => {
    return parameterName.endsWith("s")
        ? parameterName.substring(0, parameterName.length - 1)
        : parameterName;
};
exports.singularize = singularize;
const isPlural = (parameterName) => {
    return parameterName.endsWith("s");
};
exports.isPlural = isPlural;
const isSingular = (parameterName) => {
    return !(0, exports.isPlural)(parameterName);
};
exports.isSingular = isSingular;
//# sourceMappingURL=pluralize.js.map