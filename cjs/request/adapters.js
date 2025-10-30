"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionProviderRequestHandlerAdapter = void 0;
const rxjs_1 = require("rxjs");
const headers_1 = require("../utils/headers");
const utils_1 = require("./utils");
/**
 * Adapter to convert a {@link SubscriptionProvider} to a {@link GraphQLRequestHandler}.
 * For historical context, the {@link SubscriptionProvider} was used to handle subscriptions in Altair,
 * but this was later replaced with the {@link GraphQLRequestHandler} which is more generic and works
 * for all types of GraphQL requests.
 */
class SubscriptionProviderRequestHandlerAdapter {
    constructor(providerClass) {
        this.providerClass = providerClass;
    }
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            const requestStartTimestamp = Date.now();
            this.provider = new this.providerClass(request.url, request.additionalParams ?? {}, {
                headers: (0, headers_1.headerListToMap)(request.headers ?? []),
                onConnected(error, data) {
                    if (error) {
                        subscriber.error(error);
                    }
                },
            });
            this.provider
                .execute({
                query: request.query,
                variables: request.variables,
                operationName: request.selectedOperation ?? undefined,
            })
                .subscribe((0, utils_1.simpleResponseObserver)(subscriber, request.url, requestStartTimestamp));
            return () => {
                this.provider?.close();
            };
        });
    }
    generateCurl(request) {
        throw new Error('Method not implemented.');
    }
}
exports.SubscriptionProviderRequestHandlerAdapter = SubscriptionProviderRequestHandlerAdapter;
//# sourceMappingURL=adapters.js.map