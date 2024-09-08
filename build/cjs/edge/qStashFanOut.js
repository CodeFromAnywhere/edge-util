"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qStashFanOut = void 0;
/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
const qStashFanOut = async (destination, context, 
/** If the serverless provider gives too many timeouts, try delaying messages to prevent sending them all at once. E.g. if you want to send 100 per second, fill 0.01 here */
secondDelayPerItem) => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const CRON_SECRET = process.env.CRON_SECRET;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    if (!QSTASH_TOKEN || !CRON_SECRET) {
        return { error: "Missing required environment variables" };
    }
    const batchMessages = context.map((body, index) => {
        // NB: add delay if we need
        const delay = secondDelayPerItem
            ? Math.round(index * secondDelayPerItem)
            : undefined;
        const headers = {
            [`Upstash-Forward-Authorization`]: `Bearer ${CRON_SECRET}`,
        };
        if (delay) {
            headers["Upstash-Delay"] = `${delay}s`;
        }
        return {
            destination,
            body: body ? JSON.stringify(body) : undefined,
            headers,
        };
    });
    const totalSize = JSON.stringify(batchMessages).length;
    if (totalSize / batchMessages.length > 500000) {
        return { error: "payload too big, max 500kb per message" };
    }
    // Another issue with fan-out is the max request size must remain under 1MB. This is a simplified implementation that works if all requests are sized equally, to prevent it going over 1mb.
    // A later potential improvement could be to actually slice the batches on size and provide the max request size as param.
    const neededRequests = 2 * (totalSize / 1000000);
    const maxPerRequest = Math.ceil(batchMessages.length / neededRequests);
    // console.log({ totalSize, neededRequests, maxPerRequest });
    const batchMessagesBatches = batchMessages.length > maxPerRequest
        ? new Array(Math.ceil(batchMessages.length / maxPerRequest))
            .fill(null)
            .map((_, index) => batchMessages.slice(index * maxPerRequest, index * maxPerRequest + maxPerRequest))
        : [batchMessages];
    // console.log(
    //   "msgs",
    //   batchMessages.length,
    //   "batches",
    //   batchMessagesBatches.length,
    //   "max",
    //   maxPerRequest,
    // );
    const list = await Promise.all(batchMessagesBatches.map(async (batch) => {
        try {
            const response = await fetch(`${QSTASH_BASE_URL}/v2/batch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${QSTASH_TOKEN}`,
                },
                body: JSON.stringify(batch),
            });
            if (!response.ok) {
                return {
                    error: `HTTP error! status: ${response.status} - ${response.statusText} - ${await response.text()}`,
                };
            }
            const data = await response.json();
            return { error: undefined, data };
        }
        catch (e) {
            return { error: String(e) };
        }
    }));
    const errorCount = list.filter((x) => !!x.error).length;
    if (errorCount > 0) {
        return { error: `${errorCount} errors`, list };
    }
    return { error: undefined, list };
};
exports.qStashFanOut = qStashFanOut;
//# sourceMappingURL=qStashFanOut.js.map