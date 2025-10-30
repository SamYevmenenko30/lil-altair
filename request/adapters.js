import { Observable } from 'rxjs';
import { headerListToMap } from '../utils/headers';
import { simpleResponseObserver } from './utils';
/**
 * Adapter to convert a {@link SubscriptionProvider} to a {@link GraphQLRequestHandler}.
 * For historical context, the {@link SubscriptionProvider} was used to handle subscriptions in Altair,
 * but this was later replaced with the {@link GraphQLRequestHandler} which is more generic and works
 * for all types of GraphQL requests.
 */
export class SubscriptionProviderRequestHandlerAdapter {
    constructor(providerClass) {
        this.providerClass = providerClass;
    }
    handle(request) {
        return new Observable((subscriber) => {
            const requestStartTimestamp = Date.now();
            this.provider = new this.providerClass(request.url, request.additionalParams ?? {}, {
                headers: headerListToMap(request.headers ?? []),
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
                .subscribe(simpleResponseObserver(subscriber, request.url, requestStartTimestamp));
            return () => {
                this.provider?.close();
            };
        });
    }
    generateCurl(request) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=adapters.js.map