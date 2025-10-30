import { Observable } from 'rxjs';
import { GraphQLRequestHandler, GraphQLRequestOptions, GraphQLResponseData } from '../types';
export declare class AppSyncRequestHandler implements GraphQLRequestHandler {
    subscription?: ZenObservable.Subscription;
    /**
    {
      "aws_project_region": "us-west-2",
      "aws_appsync_graphqlEndpoint": "https://....appsync-api.us-west-2.amazonaws.com/graphql",
      "aws_appsync_region": "us-west-2",
      "aws_appsync_authenticationType": "API_KEY",
      "aws_appsync_apiKey": "...",
      "aws_appsync_jwtToken" "...",
      "aws_appsync_token" "..."
    }
     */
    handle(request: GraphQLRequestOptions): Observable<GraphQLResponseData>;
    destroy(): void;
}
//# sourceMappingURL=app-sync.d.ts.map