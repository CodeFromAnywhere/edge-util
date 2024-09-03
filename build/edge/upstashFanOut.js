/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export const upstashFanOut = async (request, endpoint, context) => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const CRON_SECRET = process.env.CRON_SECRET;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    if (!QSTASH_TOKEN || !CRON_SECRET) {
        return { error: "Missing required environment variables" };
    }
    const batchMessages = context.map((body) => ({
        destination: `${new URL(request.url).origin}${endpoint}`,
        body: body ? JSON.stringify(body) : undefined,
        headers: { [`Upstash-Forward-Authorization`]: `Bearer ${CRON_SECRET}` },
    }));
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
};
//# sourceMappingURL=upstashFanOut.js.map