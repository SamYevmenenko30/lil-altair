'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteExplorer = void 0;
const send_1 = require("@koa/send");
const altair_static_1 = require("altair-static");
const createRouteExplorer = ({ router, url, opts, cspNonceGenerator, }) => {
    router.get(url, async (ctx, next) => {
        const cspNonce = opts.cspNonce ?? cspNonceGenerator?.(ctx);
        ctx.body = (0, altair_static_1.renderAltair)({
            baseURL: ctx.url.replace(/\/?$/, '/'),
            ...opts,
            cspNonce,
        });
        await next();
    });
    // Use the main favicon for my API subdomain.
    router.get(`${url}/favicon.ico`, (ctx) => {
        ctx.status = 301;
        ctx.redirect(`/favicon.ico`);
    });
    router.get(`${url}/*path`, async (ctx) => {
        const path = ctx.params.path;
        // Disable CSP for the sandbox iframe
        if (path && (0, altair_static_1.isSandboxFrame)(path)) {
            ctx.set('Content-Security-Policy', '');
        }
        await (0, send_1.send)(ctx, path || '', { root: (0, altair_static_1.getDistDirectory)() });
    });
};
exports.createRouteExplorer = createRouteExplorer;
//# sourceMappingURL=index.js.map