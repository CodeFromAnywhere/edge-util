/**
 * Simple wrapper to make a JSON function
 */
export const jsonPost = (fn) => async (request) => {
    const context = await request.json();
    const result = await fn(context);
    if (!result) {
        return new Response("No result", { status: 400 });
    }
    if (result.status && result.status !== 200) {
        return new Response(result.message || result.statusText || result.status, {
            status: result.status,
            statusText: result.statusText,
        });
    }
    return new Response(JSON.stringify(result, undefined, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
//# sourceMappingURL=jsonPost.js.map