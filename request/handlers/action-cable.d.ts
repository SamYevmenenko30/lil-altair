import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
export declare class ActionCableRequestHandler implements GraphQLRequestHandler {
    subscription?: any;
    channel?: string;
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    generateCurl(request: GraphQLRequestOptions): string;
    destroy(): void;
}
//# sourceMappingURL=action-cable.d.ts.map