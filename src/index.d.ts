import { ParameterizedContext } from 'koa';
import * as KoaRouter from '@koa/router';
import { RenderOptions } from 'altair-static';
export interface AltairKoaMiddlewareOptions {
    router: KoaRouter;
    url: string;
    opts: RenderOptions;
    /**
     * Generates a Content Security Policy (CSP) nonce for the request.
     * @param ctx The Koa context.
     * @returns The generated CSP nonce.
     */
    cspNonceGenerator?: (ctx: ParameterizedContext) => string;
}
export declare const createRouteExplorer: ({ router, url, opts, cspNonceGenerator, }: AltairKoaMiddlewareOptions) => void;
//# sourceMappingURL=index.d.ts.map