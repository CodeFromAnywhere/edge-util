/** Simple wrapper where parameters are simple enough to fit in GET
 *
 * Please note that it parses query params without a schema, causing it to be a bit flaky.
 *
 * However, it can also reduce LOC a lot! Use wisely.
 */
export declare const jsonGetter: (fn: (context: any) => any) => (request: Request) => Promise<Response>;
//# sourceMappingURL=jsonGetter.d.ts.map