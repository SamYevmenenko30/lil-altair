export const headerListToMap = (headers) => {
    return headers.reduce((res, cur) => {
        if (cur.key && cur.value && cur.enabled) {
            res[cur.key] = cur.value;
        }
        return res;
    }, {});
};
export const headerMapToList = (headers) => {
    return Object.keys(headers).map((key) => ({
        key,
        value: headers[key] ? '' + headers[key] : '',
        enabled: true,
    }));
};
//# sourceMappingURL=headers.js.map