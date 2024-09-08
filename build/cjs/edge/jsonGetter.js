"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonGetter = void 0;
const getUrlParams_js_1 = require("./getUrlParams.js");
/** Simple wrapper where parameters are simple enough to fit in GET
 *
 * Please note that it parses query params without a schema, causing it to be a bit flaky.
 *
 * However, it can also reduce LOC a lot! Use wisely.
 */
const jsonGetter = (fn) => async (request) => {
    const context = (0, getUrlParams_js_1.getUrlParams)(request.url);
    const result = await fn(context);
    if (!result) {
        return new Response("No result", { status: 400 });
    }
    if (result.status && result.status !== 200) {
        return new Response(result.message || result.statusText || result.status, {
            status: result.status,
            statusText: result.statusText,
        });
    }
    return new Response(JSON.stringify(result, undefined, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
exports.jsonGetter = jsonGetter;
//# sourceMappingURL=jsonGetter.js.map