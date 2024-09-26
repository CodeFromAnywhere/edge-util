/**
 * Fan out to your own API endpoint.
 *
 * Assumes QSTASH_TOKEN and CRON_SECRET exist.
 */
export declare const qStashFanOut: (destination: string, context: any[], secondDelayPerItem?: number, bearerToken?: string) => Promise<{
    error?: string;
    list?: {
        error?: string;
        data?: any;
    }[];
}>;
export declare const qStashSend: (destination: string, context: any, delaySeconds: number | undefined, bearerToken: string | undefined) => Promise<{
    error: string;
    data?: undefined;
} | {
    error: undefined;
    data: any;
}>;
//# sourceMappingURL=qStashFanOut.d.ts.map