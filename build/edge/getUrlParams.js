/**
 * loose way of parsing url params into js types, supporting null, boolean, number, string */
export const getUrlParams = (url) => {
    const params = new URL(url).searchParams;
    return Object.fromEntries(Array.from(params.entries()).map(([key, value]) => [
        key,
        value === "null"
            ? null
            : value === "true"
                ? true
                : value === "false"
                    ? false
                    : !isNaN(Number(value))
                        ? Number(value)
                        : value,
    ]));
};
//# sourceMappingURL=getUrlParams.js.map