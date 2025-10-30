"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const headers_1 = require("./headers");
(0, globals_1.describe)('headers utils', () => {
    (0, globals_1.describe)('headerListToMap', () => {
        (0, globals_1.it)('should convert header list to map', () => {
            const headerMap = (0, headers_1.headerListToMap)([
                { key: 'key1', value: 'value1', enabled: true },
                { key: 'key2', value: 'value2', enabled: true },
                { key: 'key3', value: 'value3', enabled: false },
            ]);
            (0, globals_1.expect)(headerMap).toEqual({
                key1: 'value1',
                key2: 'value2',
            });
        });
    });
    (0, globals_1.describe)('headerMapToList', () => {
        (0, globals_1.it)('should convert header map to list', () => {
            const headerList = (0, headers_1.headerMapToList)({
                key1: 'value1',
                key2: 'value2',
            });
            (0, globals_1.expect)(headerList).toEqual([
                { key: 'key1', value: 'value1', enabled: true },
                { key: 'key2', value: 'value2', enabled: true },
            ]);
        });
    });
});
//# sourceMappingURL=headers.spec.js.map