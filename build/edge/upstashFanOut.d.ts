/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export declare const upstashFanOut: (destination: string, context: any[]) => Promise<({
    error: string;
    data?: undefined;
} | {
    error: undefined;
    data: any;
})[] | {
    error: string;
}>;
//# sourceMappingURL=upstashFanOut.d.ts.map