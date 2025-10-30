export const secureRandomString = (length = 16) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues)
        .map((x) => charset[x % charset.length])
        .join('');
};
export const base64EncodeSafe = (str) => {
    const bytes = new TextEncoder().encode(str);
    const binStr = Array.from(bytes, (b) => String.fromCodePoint(b)).join('');
    return btoa(binStr);
};
// https://thewoods.blog/base64url/
export const base64UrlEncode = (buffer) => {
    return btoa(Array.from(new Uint8Array(buffer), (b) => String.fromCharCode(b)).join(''))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/={1,4}$/, '');
};
export const sha256 = async (str) => {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    return hashBuffer;
};
export const hex = (buffer) => {
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
export const getCodeChallenge = async (codeVerifier) => {
    return base64UrlEncode(await sha256(codeVerifier));
};
//# sourceMappingURL=helpers.js.map