"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const json_1 = require("./json");
(0, globals_1.describe)('json utils', () => {
    (0, globals_1.describe)('parseJson', () => {
        (0, globals_1.it)('should parse a JSON string into an object', () => {
            const obj = (0, json_1.parseJson)('{"a": 1}');
            (0, globals_1.expect)(obj).toEqual({ a: 1 });
        });
        (0, globals_1.it)('should return a default value if parsing fails', () => {
            const obj = (0, json_1.parseJson)('{"a": 1');
            (0, globals_1.expect)(obj).toEqual({});
        });
        (0, globals_1.it)('should return a specified default value if parsing fails', () => {
            const obj = (0, json_1.parseJson)('{"a": 1', { defaultValue: { a: 1 } });
            (0, globals_1.expect)(obj).toEqual({ a: 1 });
        });
        (0, globals_1.it)('should return a specified default value if parsing fails', () => {
            const obj = (0, json_1.parseJson)('{"a": 1', { defaultValue: null });
            (0, globals_1.expect)(obj).toBeNull();
        });
        (0, globals_1.it)('should parse a JSON string with BigInt', () => {
            const obj = (0, json_1.parseJson)('{"a": 1011111111111111111111111111111111111111111111111111111 }');
            (0, globals_1.expect)(obj.a.toString()).toEqual('1.011111111111111111111111111111111111111111111111111111e+54');
        });
    });
});
//# sourceMappingURL=json.spec.js.map