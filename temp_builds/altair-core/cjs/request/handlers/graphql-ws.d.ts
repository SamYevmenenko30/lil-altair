import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
import { Client } from 'graphql-ws';
export declare class GraphQLWsRequestHandler implements GraphQLRequestHandler {
    client?: Client;
    cleanup?: () => void;
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=graphql-ws.d.ts.map