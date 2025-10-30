"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLWsRequestHandler = void 0;
const rxjs_1 = require("rxjs");
const graphql_ws_1 = require("graphql-ws");
const utils_1 = require("../utils");
class GraphQLWsRequestHandler {
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            this.client = (0, graphql_ws_1.createClient)({
                url: request.url,
                connectionParams: request.additionalParams,
                lazy: false,
                onNonLazyError: (err) => {
                    subscriber.error(err);
                },
                on: {
                    error: (err) => {
                        subscriber.error(err);
                    },
                },
            });
            if (!this.client) {
                throw new Error('Could not create GraphQL WS client!');
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
            // This causes the 'Error: Uncaught (in promise): Event: {"isTrusted":true}' error
            await this.client?.dispose();
            this.client = undefined;
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }
}
exports.GraphQLWsRequestHandler = GraphQLWsRequestHandler;
//# sourceMappingURL=graphql-ws.js.map