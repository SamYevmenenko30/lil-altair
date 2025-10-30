export const urlWithParams = (url, params) => {
    const urlParams = new URLSearchParams(params);
    const u = new URL(url);
    return new URL(`${u.origin}${u.pathname}?${urlParams.toString()}`).toString();
};
//# sourceMappingURL=url.js.map