"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTextWithTimeout = exports.fetchWithTimeout = void 0;
const tryParseJson_js_1 = require("./tryParseJson.js");
const tryParseYamlToJson_js_1 = require("./tryParseYamlToJson.js");
/**
 * Sets timeout to 5 minutes by default
 *
 * Better fetch that also returns status and statusText along with the raw text result and JSON.
 */
const fetchWithTimeout = async (input, init, timeoutMs, isNoJson, isNoText) => {
    const { status, statusText, text, response } = await (0, exports.fetchTextWithTimeout)(input, init, timeoutMs, isNoText);
    const json = text && !isNoJson
        ? (0, tryParseJson_js_1.tryParseJson)(text) || (0, tryParseYamlToJson_js_1.tryParseYamlToJson)(text)
        : null;
    return { text, json, status, statusText, response };
};
exports.fetchWithTimeout = fetchWithTimeout;
const fetchTextWithTimeout = async (input, init, timeoutMs, isNoText) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs || 300000);
        const response = await fetch(input, {
            ...init,
            signal: controller.signal,
        }).catch((err) => {
            // console.log({ err });
            console.log(Object.keys(err.cause));
            return err.cause.code; // Error caused by fetch
        });
        clearTimeout(timeoutId);
        if (typeof response === "string") {
            return { statusText: response };
        }
        const status = response === null || response === void 0 ? void 0 : response.status;
        const statusText = response === null || response === void 0 ? void 0 : response.statusText;
        // console.log({ status, statusText });
        const text = isNoText ? undefined : await response.text();
        return { text, status, statusText, response };
    }
    catch (e) {
        return { text: undefined, status: 500, statusText: "Catched fetch" };
    }
};
exports.fetchTextWithTimeout = fetchTextWithTimeout;
//# sourceMappingURL=fetchWithTimeout.js.map