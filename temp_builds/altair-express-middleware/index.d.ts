import * as express from 'express';
import { RenderOptions } from 'altair-static';
export type ExpressRenderOptions = RenderOptions & {
    /**
     * Generates a Content Security Policy (CSP) nonce for the request.
     * @param req The Express request object.
     * @param res The Express response object.
     * @returns The generated CSP nonce.
     */
    cspNonceGenerator?: (req: express.Request, res: express.Response) => string;
};
export declare const altairExpress: (opts: ExpressRenderOptions) => express.Express;
//# sourceMappingURL=index.d.ts.map