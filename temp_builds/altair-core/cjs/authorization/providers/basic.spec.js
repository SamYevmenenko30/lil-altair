"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const basic_1 = __importDefault(require("./basic"));
(0, globals_1.describe)('basic', () => {
    (0, globals_1.it)('should return basic auth header', async () => {
        const authProvider = new basic_1.default((x) => x);
        const res = await authProvider.execute({
            data: {
                username: 'username',
                password: 'password',
            },
        });
        (0, globals_1.expect)(res).toEqual({
            headers: {
                Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
            },
        });
    });
    (0, globals_1.it)('should return basic auth header with environment variables', async () => {
        const authProvider = new basic_1.default((x) => x.replace(/(^{{)|(}}$)/g, ''));
        const res = await authProvider.execute({
            data: {
                username: '{{username}}',
                password: '{{password}}',
            },
        });
        (0, globals_1.expect)(res).toEqual({
            headers: {
                Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
            },
        });
    });
    (0, globals_1.it)('should not return headers if username or password is missing', async () => {
        const authProvider = new basic_1.default((x) => x);
        const res = await authProvider.execute({
            data: {
                username: '',
                password: '',
            },
        });
        (0, globals_1.expect)(res).toEqual({
            headers: {},
        });
    });
});
//# sourceMappingURL=basic.spec.js.map