"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyOpenapi = void 0;
var object_maps_js_1 = require("./object-maps.js");
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
var simplifyOpenapi = function (openapi) {
    var pathsArray = (0, object_maps_js_1.objectMapToArray)(
    //@ts-ignore
    openapi.paths || {}, "path");
    // The method must be done in the map of the array of the first, then putting the path back on and do a flat. Harder
    var pathArrayWithMethods = pathsArray
        .map(function (_a) {
        var path = _a.path, description = _a.description, summary = _a.summary, $ref = _a.$ref, methodObject = __rest(_a, ["path", "description", "summary", "$ref"]);
        var result = (0, object_maps_js_1.objectMapToArray)(methodObject, "method");
        return result.map(function (x) { return (__assign({ path: path, description: description, summary: summary, $ref: $ref }, x)); });
    })
        .flat();
    // In this one I'm doing multiple simplifications at once, and it seems hard to generalise but it's doing the same as above
    var simplified = pathArrayWithMethods.map(function (_a) {
        //NB: we're loosing potentially some information here! But if the convention is that we don't have these, its ok.
        var _b, _c, _d, _e;
        var requestBody = _a.requestBody, responses = _a.responses, item = __rest(_a, ["requestBody", "responses"]);
        var forcedRequestBody = requestBody;
        var forcedResponses = responses === null || responses === void 0 ? void 0 : responses["200"];
        //However, the golden egg would be to do this without information loss and bi-directionally, automatically flattening a nested monster, so I can use it as an ActionSchema
        // I think this must be possible if we just list the locations of the objectmaps that nestify things
        var newItem = __assign(__assign({}, item), { 
            // Response stuff
            responsesStatusCode: 200, responseDescription: forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.description, responseMediaType: "application/json", responseContentSchema: (_c = (_b = forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.content) === null || _b === void 0 ? void 0 : _b["application/json"]) === null || _c === void 0 ? void 0 : _c.schema, 
            // Body stuff
            requestBodyRequired: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.required, requestBodyDescription: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.description, requestBodySchema: (_e = (_d = forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.content) === null || _d === void 0 ? void 0 : _d["application/json"]) === null || _e === void 0 ? void 0 : _e.schema });
        return newItem;
    });
    return simplified;
};
exports.simplifyOpenapi = simplifyOpenapi;
//# sourceMappingURL=simplifyOpenapi.js.map