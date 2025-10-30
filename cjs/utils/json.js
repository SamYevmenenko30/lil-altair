"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const json_bigint_1 = __importDefault(require("json-bigint"));
/**
 * Parses a JSON string into an object. Has support for BigInt and falls back to a default value if parsing fails.
 */
const parseJson = (str, { defaultValue = {} } = {}) => {
    try {
        return json_bigint_1.default.parse(str);
    }
    catch {
        console.error('Could not parse JSON. Using default instead.');
        return defaultValue;
    }
};
exports.parseJson = parseJson;
//# sourceMappingURL=json.js.map