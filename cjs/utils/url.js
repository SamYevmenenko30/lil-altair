"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlWithParams = void 0;
const urlWithParams = (url, params) => {
    const urlParams = new URLSearchParams(params);
    const u = new URL(url);
    return new URL(`${u.origin}${u.pathname}?${urlParams.toString()}`).toString();
};
exports.urlWithParams = urlWithParams;
//# sourceMappingURL=url.js.map