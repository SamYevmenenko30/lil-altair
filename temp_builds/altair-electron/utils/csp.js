"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="821779cd-e0fe-5cd0-bb9d-a10bdc32ce64")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.cspAsString = void 0;
const QUOTED_VALUES = [
    'self',
    'unsafe-inline',
    'unsafe-eval',
    'none',
    'strict-dynamic',
    'report-sample',
    'wasm-unsafe-eval',
];
const QUOTED_PREFIXES = ['sha256-', 'sha384-', 'sha512-', 'nonce-'];
const cspAsString = (csp) => {
    return Object.entries(csp)
        .map(([key, values]) => {
        const mappedValues = values.map((value) => {
            if (QUOTED_VALUES.includes(value)) {
                return `'${value}'`;
            }
            if (QUOTED_PREFIXES.some((prefix) => value.startsWith(prefix))) {
                return `'${value}'`;
            }
            return value;
        });
        return `${key} ${mappedValues.join(' ')}`;
    })
        .join('; ');
};
exports.cspAsString = cspAsString;
//# sourceMappingURL=csp.js.map
//# debugId=821779cd-e0fe-5cd0-bb9d-a10bdc32ce64
