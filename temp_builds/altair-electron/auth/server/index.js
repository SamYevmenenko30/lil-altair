"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="42cd270a-319a-52c3-8665-99dede3cd18d")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServer = exports.IPC_SET_CUSTOM_TOKEN_EVENT = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const events_1 = require("events");
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const electron_1 = require("electron");
const csp_header_1 = require("csp-header");
const get_port_1 = __importDefault(require("get-port"));
exports.IPC_SET_CUSTOM_TOKEN_EVENT = 'auth:set-custom-token';
const newNonce = () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = (0, crypto_1.randomBytes)(40).map(x => validChars.charCodeAt(x % validChars.length));
    return String.fromCharCode(...array);
};
const authClientStaticDirectory = () => path_1.default.resolve(require.resolve('@altairgraphql/login-redirect'), '..', 'dist');
class AuthServer {
    constructor() {
        this.port = 3000; // default port. Might be different at runtime.
        this.sessionPartition = 'persist:auth';
        this.nonce = newNonce();
        this.emitter = new events_1.EventEmitter();
        this.ttlSeconds = 10 * 60; // 10m
    }
    async start() {
        const app = (0, express_1.default)();
        app.use(express_1.default.static(authClientStaticDirectory()));
        app.use(body_parser_1.default.json());
        app.use('/login', (req, res) => {
            return res.sendFile(path_1.default.resolve(authClientStaticDirectory(), 'index.html'));
        });
        app.use('/callback', (req, res) => {
            // TODO: Verify ttl
            if (req.body.nonce !== this.nonce) {
                return res
                    .status(400)
                    .send({ status: 'error', message: 'invalid request' });
            }
            this.emitter.emit('token', req.body.token);
            return res.send({ status: 'success' });
        });
        this.port = await this.getAvailablePort();
        this.server = app.listen(this.port, () => {
            // console.log(`auth server listening at port ${this.port}`);
        });
    }
    terminate() {
        this.emitter.removeAllListeners('token');
        if (this.server) {
            this.server.close();
        }
    }
    async getCustomToken() {
        if (!this.server) {
            await this.start();
        }
        // TODO: Use a hosted domain instead
        await electron_1.shell.openExternal(`http://localhost:${this.port}/login?nonce=${this.nonce}`);
        const token = await this.listenForToken();
        this.terminate();
        return token;
    }
    listenForToken() {
        return new Promise((resolve, reject) => {
            this.emitter.once('token', (token) => {
                if (!token) {
                    return reject(new Error('Could not get token'));
                }
                return resolve(token);
            });
        });
    }
    getSession() {
        const authSession = electron_1.session.fromPartition(this.sessionPartition);
        authSession.webRequest.onHeadersReceived((details, callback) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                    'Content-Security-Policy': [
                        (0, csp_header_1.getCSP)({
                            directives: {
                                // "default-src": ["none"],
                                'script-src': [
                                    csp_header_1.SELF,
                                    csp_header_1.INLINE,
                                    'strict-dynamic',
                                    'https://www.gstatic.com',
                                    'https://apis.google.com',
                                ],
                            },
                        }),
                    ],
                },
            });
        });
        return authSession;
    }
    async getAvailablePort() {
        return (0, get_port_1.default)({ port: this.port });
    }
}
exports.AuthServer = AuthServer;
//# sourceMappingURL=index.js.map
//# debugId=42cd270a-319a-52c3-8665-99dede3cd18d
