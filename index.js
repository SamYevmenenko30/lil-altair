"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltairFastify = void 0;
const altair_static_1 = require("altair-static");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const static_1 = __importDefault(require("@fastify/static"));
const fastifyAltairPluginFn = async (fastify, { path = '/altair', ...renderOptions } = {}) => {
    var _a;
    fastify.register(static_1.default, {
        root: (0, altair_static_1.getDistDirectory)(),
        prefix: (_a = renderOptions.baseURL) !== null && _a !== void 0 ? _a : '/altair/',
        setHeaders: (res, path) => {
            if ((0, altair_static_1.isSandboxFrame)(path)) {
                // Disable CSP for the sandbox iframe
                res.setHeader('Content-Security-Policy', '');
            }
        },
    });
    fastify.get(path, (req, res) => {
        const altairPage = (0, altair_static_1.renderAltair)(getRequestRenderOptions(req, res, renderOptions));
        res.type('text/html').send(altairPage);
    });
    if (renderOptions.serveInitialOptionsInSeperateRequest) {
        const initOptPath = path + '/initial_options.js';
        fastify.get(initOptPath, (req, res) => {
            const initialOptions = (0, altair_static_1.renderInitSnippet)(getRequestRenderOptions(req, res, renderOptions));
            res.type('application/javascript').send(initialOptions);
        });
    }
};
exports.AltairFastify = (0, fastify_plugin_1.default)(fastifyAltairPluginFn, {
    fastify: '>= 3.x',
    name: 'altair-fastify-plugin',
});
function getRequestRenderOptions(req, res, opts) {
    const { baseURL, cspNonceGenerator, ...renderOptions } = opts;
    let cspNonce = renderOptions.cspNonce;
    if (!cspNonce && cspNonceGenerator) {
        cspNonce = cspNonceGenerator(req, res);
    }
    return {
        ...opts,
        baseURL: baseURL !== null && baseURL !== void 0 ? baseURL : '/altair/',
        cspNonce,
    };
}
//# sourceMappingURL=index.js.map