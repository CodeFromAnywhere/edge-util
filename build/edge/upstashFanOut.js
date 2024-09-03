/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export const upstashFanOut = async (destination, context) => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const CRON_SECRET = process.env.CRON_SECRET;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    if (!QSTASH_TOKEN || !CRON_SECRET) {
        return { error: "Missing required environment variables" };
    }
    const batchMessages = context.map((body) => ({
        destination,
        body: body ? JSON.stringify(body) : undefined,
        headers: { [`Upstash-Forward-Authorization`]: `Bearer ${CRON_SECRET}` },
    }));
    const totalSize = JSON.stringify(batchMessages).length;
    if (totalSize / batchMessages.length > 500000) {
        return { error: "payload too big, max 500kb per message" };
    }
    const neededRequests = 2 * (totalSize / 1000000);
    const maxPerRequest = Math.ceil(batchMessages.length / neededRequests);
    console.log({ totalSize, neededRequests, maxPerRequest });
    const batchMessagesBatches = batchMessages.length > maxPerRequest
        ? new Array(Math.ceil(batchMessages.length / maxPerRequest))
            .fill(null)
            .map((_, index) => batchMessages.slice(index * maxPerRequest, index * maxPerRequest + maxPerRequest))
        : [batchMessages];
    console.log("msgs", batchMessages.length, "batches", batchMessagesBatches.length, "max", maxPerRequest);
    const list = await Promise.all(batchMessagesBatches.map(async (keys) => {
        //
        const response = await fetch(`${QSTASH_BASE_URL}/v2/batch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${QSTASH_TOKEN}`,
            },
            body: JSON.stringify(batchMessages),
        });
        if (!response.ok) {
            return {
                error: `HTTP error! status: ${response.status} - ${response.statusText} - ${await response.text()}`,
            };
        }
        const data = await response.json();
        return { error: undefined, data };
    }));
    return list;
};
//# sourceMappingURL=upstashFanOut.js.map