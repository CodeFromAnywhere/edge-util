/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export declare const upstashFanOut: (request: Request, endpoint: string, context: any[]) => Promise<{
    error: string;
    data?: undefined;
} | {
    error: undefined;
    data: any;
}>;
//# sourceMappingURL=qstashBatch.d.ts.map