"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSERequestHandler = void 0;
const rxjs_1 = require("rxjs");
const graphql_sse_1 = require("graphql-sse");
const utils_1 = require("../utils");
class SSERequestHandler {
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            this.client = (0, graphql_sse_1.createClient)({
                url: request.url,
                credentials: request.withCredentials ? 'include' : 'same-origin',
                headers: request.headers?.reduce((acc, { key, value }) => {
                    acc[key] = value;
                    return acc;
                }, {}),
            });
            if (!this.client) {
                throw new Error('Could not create SSE client!');
            }
            const requestStartTimestamp = Date.now();
            this.cleanup = this.client.subscribe({
                query: request.query,
                variables: request.variables,
                operationName: request.selectedOperation ?? undefined,
                extensions: request.extensions,
            }, (0, utils_1.simpleResponseObserver)(subscriber, request.url, requestStartTimestamp));
            return () => {
                this.destroy();
            };
        });
    }
    async destroy() {
        try {
            this.cleanup?.();
            this.cleanup = undefined;
            await this.client?.dispose();
            this.client = undefined;
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.SSERequestHandler = SSERequestHandler;
//# sourceMappingURL=sse.js.map