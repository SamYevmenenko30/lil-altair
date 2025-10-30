import { RenderOptions } from 'altair-static';
import type { FastifyInstance } from 'fastify';
export interface AltairFastifyPluginOptions extends RenderOptions {
    /**
     * Path in which Altair will be accesible.
     *
     * By default is `/altair`
     */
    path?: string;
    /**
     * Generates a Content Security Policy (CSP) nonce for the request.
     * @param req The Fastify request object.
     * @param res The Fastify response object.
     * @returns The generated CSP nonce.
     */
    cspNonceGenerator?: (req: unknown, res: unknown) => string;
}
export declare const AltairFastify: (fastify: FastifyInstance, { path, ...renderOptions }?: AltairFastifyPluginOptions) => Promise<void>;
//# sourceMappingURL=index.d.ts.map