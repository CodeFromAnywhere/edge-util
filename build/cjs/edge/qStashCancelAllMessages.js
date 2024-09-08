"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qStashCancelAllMessages = void 0;
/** Resets all upstash Qstash events for qstash defined in env*/
const qStashCancelAllMessages = async () => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    const response = await fetch(`${QSTASH_BASE_URL}/v2/messages`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${QSTASH_TOKEN}`,
        },
    });
    if (!response.ok) {
        return {
            error: `HTTP error! status: ${response.status} - ${response.statusText} - ${await response.text()}`,
        };
    }
    const data = await response.json();
    return { error: undefined, data };
};
exports.qStashCancelAllMessages = qStashCancelAllMessages;
//# sourceMappingURL=qStashCancelAllMessages.js.map