"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjects = exports.mergeObjectParameters = void 0;
const omitUndefinedValues_js_1 = require("./omitUndefinedValues.js");
/**
 * merges two objects: a config object and a defaults object. If the config object has something missing, a default will be used from the defaults object.
 *
 * In short: merges two objects, for every parameter, use the default as a fallback
 *
 * DEPRECATED: in favor of mergeObjects
 */
const mergeObjectParameters = (config, defaults) => {
    const parameters = Object.keys({
        ...config,
        ...defaults,
    });
    const mergedConfig = parameters.reduce((getConfig, p) => ({ ...getConfig, [p]: (config === null || config === void 0 ? void 0 : config[p]) || (defaults === null || defaults === void 0 ? void 0 : defaults[p]) }), {});
    return mergedConfig;
};
exports.mergeObjectParameters = mergeObjectParameters;
/**
 * merges multiple objects, overwriting the previous one with the next. Can be useful for configs where there are multiple layers of configs that overwrite each other.
 *
 * Please note though, that only the root keys of the object are overwriting each other, so if there is nested datastructures, the last one with a specific key overwrites the previous ones copletely
 *
 * Please note that you can provide partial objects as well, as long as you are sure that the final object is full, the type interface is correct.
 *
 * Please note that if a latter object has a key which holds "undefined", it will NOT overwrite it. Anything else WILL
 */
const mergeObjects = (...objects) => {
    if (objects.length === 0)
        return;
    const firstObject = objects[0];
    const mergedObject = objects.reduce((previous, current) => {
        if (!current)
            return previous;
        const currentWithoutUndefined = (0, omitUndefinedValues_js_1.omitUndefinedValues)(current);
        const newObject = !previous
            ? current
            : { ...previous, ...currentWithoutUndefined };
        return newObject;
        // NB: we cannot guarantee this based on the input!
    }, firstObject);
    return mergedObject;
};
exports.mergeObjects = mergeObjects;
//# sourceMappingURL=object-merge.js.map