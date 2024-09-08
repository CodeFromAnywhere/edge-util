/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export declare const qStashFanOut: (destination: string, context: any[], secondDelayPerItem?: number) => Promise<{
    error?: string;
    list?: {
        error?: string;
        data?: any;
    }[];
}>;
//# sourceMappingURL=qStashFanOut.d.ts.map