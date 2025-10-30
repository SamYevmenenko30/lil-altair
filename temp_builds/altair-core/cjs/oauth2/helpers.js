"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeChallenge = exports.hex = exports.sha256 = exports.base64UrlEncode = exports.base64EncodeSafe = exports.secureRandomString = void 0;
const secureRandomString = (length = 16) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues)
        .map((x) => charset[x % charset.length])
        .join('');
};
exports.secureRandomString = secureRandomString;
const base64EncodeSafe = (str) => {
    const bytes = new TextEncoder().encode(str);
    const binStr = Array.from(bytes, (b) => String.fromCodePoint(b)).join('');
    return btoa(binStr);
};
exports.base64EncodeSafe = base64EncodeSafe;
// https://thewoods.blog/base64url/
const base64UrlEncode = (buffer) => {
    return btoa(Array.from(new Uint8Array(buffer), (b) => String.fromCharCode(b)).join(''))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/={1,4}$/, '');
};
exports.base64UrlEncode = base64UrlEncode;
const sha256 = async (str) => {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    return hashBuffer;
};
exports.sha256 = sha256;
const hex = (buffer) => {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join('');
};
exports.hex = hex;
const getCodeChallenge = async (codeVerifier) => {
    return (0, exports.base64UrlEncode)(await (0, exports.sha256)(codeVerifier));
};
exports.getCodeChallenge = getCodeChallenge;
//# sourceMappingURL=helpers.js.map