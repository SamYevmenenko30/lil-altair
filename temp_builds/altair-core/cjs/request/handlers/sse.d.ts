import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
import { Client } from 'graphql-sse';
export declare class SSERequestHandler implements GraphQLRequestHandler {
    client?: Client;
    cleanup?: () => void;
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=sse.d.ts.map