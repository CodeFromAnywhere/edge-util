import { getUrlParams } from "./getUrlParams.js";
type GetParamsType = {
  [key: string]: string | number | boolean | null | undefined;
};
/** Simple wrapper where parameters are simple enough to fit in GET
 *
 * Please note that it parses query params without a schema, causing it to be a bit flaky.
 *
 * However, it can also reduce LOC a lot! Use wisely.
 */
export const jsonGetter =
  (fn: (context: any) => any) => async (request: Request) => {
    const context = getUrlParams(request.url);
    const result = await fn(context);

    if (!result) {
      return new Response("No result", { status: 400 });
    }

    if (result.status && result.status !== 200) {
      return new Response(
        result.message || result.statusText || result.status,
        {
          status: result.status,
          statusText: result.statusText,
        },
      );
    }

    return new Response(JSON.stringify(result, undefined, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
