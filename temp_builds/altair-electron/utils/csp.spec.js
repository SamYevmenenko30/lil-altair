"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7ef2fd31-f9b8-5eaf-a434-c85ed7cd0651")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const csp_1 = require("./csp");
describe('cspAsString', () => {
    it('should return a valid CSP string', () => {
        const csp = {
            'default-src': ["'self'", "'unsafe-inline'"],
            'script-src': [
                "'self'",
                'sha256-abc123',
                'https://example.com',
                "'nonce-xyz789'",
                'unsafe-eval',
            ],
            'style-src': ["'self'", "'nonce-xyz789'"],
        };
        const result = (0, csp_1.cspAsString)(csp);
        expect(result).toBe("default-src 'self' 'unsafe-inline'; script-src 'self' 'sha256-abc123' https://example.com 'nonce-xyz789' 'unsafe-eval'; style-src 'self' 'nonce-xyz789'");
    });
});
//# sourceMappingURL=csp.spec.js.map
//# debugId=7ef2fd31-f9b8-5eaf-a434-c85ed7cd0651
