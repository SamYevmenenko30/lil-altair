'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.altairExpress = void 0;
const express = require("express");
const altair_static_1 = require("altair-static");
const altairExpress = (opts) => {
    const app = express();
    // Disable strict routing since we *need* to make sure the route does not end with a trailing slash
    app.disable('strict routing');
    app.get('/', (req, res) => {
        // Redirect all trailing slash
        const path = req.originalUrl.replace(/\?.*/, '');
        if (!path.endsWith('/')) {
            const query = req.originalUrl.slice(path.length);
            return res.redirect(301, path + '/' + query);
        }
        return res.send((0, altair_static_1.renderAltair)(getRequestRenderOptions(req, res, opts)));
    });
    app.get('/initial_options.js', (req, res) => {
        res.set('Content-Type', 'text/javascript');
        return res.send((0, altair_static_1.renderInitSnippet)(getRequestRenderOptions(req, res, opts)));
    });
    app.use(express.static((0, altair_static_1.getDistDirectory)(), {
        setHeaders: (res, path) => {
            if ((0, altair_static_1.isSandboxFrame)(path)) {
                // Disable CSP for the sandbox iframe
                res.setHeader('Content-Security-Policy', '');
            }
        },
    }));
    /**
     * Catch-all route
     */
    app.get('*', (req, res) => {
        return res.send('404.');
    });
    return app;
};
exports.altairExpress = altairExpress;
function getRequestRenderOptions(req, res, opts) {
    let cspNonce = opts.cspNonce;
    if (!cspNonce && opts.cspNonceGenerator) {
        cspNonce = opts.cspNonceGenerator(req, res);
    }
    return {
        ...opts,
        cspNonce,
    };
}
//# sourceMappingURL=index.js.map