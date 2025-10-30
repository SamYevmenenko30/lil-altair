import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
export declare class HttpRequestHandler implements GraphQLRequestHandler {
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    destroy(): void;
    private emitChunk;
    private isGETRequest;
    private getParamsFromData;
    private getHeaders;
    private getUrl;
    private getData;
    private getBody;
}
//# sourceMappingURL=http.d.ts.map