import { Observable, Subscriber } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
import { SubscriptionClient } from 'subscriptions-transport-ws';
export declare class WebsocketRequestHandler implements GraphQLRequestHandler {
    client?: SubscriptionClient;
    cleanup?: () => void;
    onConnected(subscriber: Subscriber<GraphQLResponseData>, error: unknown, data: unknown): void;
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=ws.d.ts.map