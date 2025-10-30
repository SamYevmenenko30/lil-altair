"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerMapToList = exports.headerListToMap = void 0;
const headerListToMap = (headers) => {
    return headers.reduce((res, cur) => {
        if (cur.key && cur.value && cur.enabled) {
            res[cur.key] = cur.value;
        }
        return res;
    }, {});
};
exports.headerListToMap = headerListToMap;
const headerMapToList = (headers) => {
    return Object.keys(headers).map((key) => ({
        key,
        value: headers[key] ? '' + headers[key] : '',
        enabled: true,
    }));
};
exports.headerMapToList = headerMapToList;
//# sourceMappingURL=headers.js.map