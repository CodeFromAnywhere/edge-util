"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyOpenapi = void 0;
const object_maps_js_1 = require("./object-maps.js");
/**
 * Turns an openapi document into an array.
 * CURRENTLY DOES NOT SUPPORT REFERENCED DATA!
 *
 * TODO:
 *
 * Question: is there a way to turn any schema that contains object-maps or heavily nested datastructures (like openapi) into a more flat JSONSchema that contains only arrays of objects, in a more general way?
 *
 * Get nerdy on this and make a way to bi-directionally flatten and re-construct object-maps inside of JSON Schemas. If I can represent an openapi as an array of operations, it's going to be very useful.
 */
const simplifyOpenapi = (openapi) => {
    const pathsArray = (0, object_maps_js_1.objectMapToArray)(
    //@ts-ignore
    openapi.paths || {}, "path");
    // The method must be done in the map of the array of the first, then putting the path back on and do a flat. Harder
    const pathArrayWithMethods = pathsArray
        .map(({ path, description, summary, $ref, ...methodObject }) => {
        const result = (0, object_maps_js_1.objectMapToArray)(methodObject, "method");
        return result.map((x) => ({
            path,
            description,
            summary,
            $ref,
            ...x,
        }));
    })
        .flat();
    // In this one I'm doing multiple simplifications at once, and it seems hard to generalise but it's doing the same as above
    const simplified = pathArrayWithMethods.map(({ requestBody, responses, ...item }) => {
        //NB: we're loosing potentially some information here! But if the convention is that we don't have these, its ok.
        var _a, _b, _c, _d;
        const forcedRequestBody = requestBody;
        const forcedResponses = responses === null || responses === void 0 ? void 0 : responses["200"];
        //However, the golden egg would be to do this without information loss and bi-directionally, automatically flattening a nested monster, so I can use it as an ActionSchema
        // I think this must be possible if we just list the locations of the objectmaps that nestify things
        const newItem = {
            ...item,
            // Response stuff
            responsesStatusCode: 200,
            responseDescription: forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.description,
            responseMediaType: "application/json",
            responseContentSchema: (_b = (_a = forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.content) === null || _a === void 0 ? void 0 : _a["application/json"]) === null || _b === void 0 ? void 0 : _b.schema,
            // Body stuff
            requestBodyRequired: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.required,
            requestBodyDescription: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.description,
            requestBodySchema: (_d = (_c = forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.content) === null || _c === void 0 ? void 0 : _c["application/json"]) === null || _d === void 0 ? void 0 : _d.schema,
        };
        return newItem;
    });
    return simplified;
};
exports.simplifyOpenapi = simplifyOpenapi;
//# sourceMappingURL=simplifyOpenapi.js.map