import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from './types';
import { SubscriptionProvider, SubscriptionProviderConstructor } from '../subscriptions/subscription-provider';
/**
 * Adapter to convert a {@link SubscriptionProvider} to a {@link GraphQLRequestHandler}.
 * For historical context, the {@link SubscriptionProvider} was used to handle subscriptions in Altair,
 * but this was later replaced with the {@link GraphQLRequestHandler} which is more generic and works
 * for all types of GraphQL requests.
 */
export declare class SubscriptionProviderRequestHandlerAdapter implements GraphQLRequestHandler {
    private providerClass;
    provider?: SubscriptionProvider;
    constructor(providerClass: SubscriptionProviderConstructor);
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    generateCurl(request: GraphQLRequestOptions): string;
}
//# sourceMappingURL=adapters.d.ts.map