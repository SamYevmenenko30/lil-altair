"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const api_key_1 = __importDefault(require("./api-key"));
(0, globals_1.describe)('basic', () => {
    (0, globals_1.it)('should return basic auth header', async () => {
        const authProvider = new api_key_1.default((x) => x);
        const res = await authProvider.execute({
            data: {
                headerName: 'X-API-Key',
                headerValue: 'api_1a2s3d4f5g6h7j8k9l0',
            },
        });
        (0, globals_1.expect)(res).toEqual({
            headers: {
                'X-API-Key': 'api_1a2s3d4f5g6h7j8k9l0',
            },
        });
    });
    (0, globals_1.it)('should return basic auth header with environment variables', async () => {
        const authProvider = new api_key_1.default((x) => x.replace(/(^{{)|(}}$)/g, ''));
        const res = await authProvider.execute({
            data: {
                headerName: 'X-API-Key',
                headerValue: '{{api_1a2s3d4f5g6h7j8k9l0}}',
            },
        });
        (0, globals_1.expect)(res).toEqual({
            headers: {
                'X-API-Key': 'api_1a2s3d4f5g6h7j8k9l0',
            },
        });
    });
});
//# sourceMappingURL=api-key.spec.js.map