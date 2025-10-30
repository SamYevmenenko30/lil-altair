"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSyncRequestHandler = void 0;
const rxjs_1 = require("rxjs");
const graphql_1 = require("graphql");
const aws_appsync_auth_link_1 = require("aws-appsync-auth-link");
const aws_appsync_subscription_link_1 = require("aws-appsync-subscription-link");
const core_1 = require("@apollo/client/core");
const utils_1 = require("../utils");
class AppSyncRequestHandler {
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
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            const url = typeof request.additionalParams?.aws_appsync_graphqlEndpoint === 'string'
                ? request.additionalParams.aws_appsync_graphqlEndpoint
                : '';
            const region = typeof request.additionalParams?.aws_appsync_region === 'string'
                ? request.additionalParams.aws_appsync_region
                : '';
            const auth = {
                type: typeof request.additionalParams?.aws_appsync_authenticationType ===
                    'string'
                    ? request.additionalParams.aws_appsync_authenticationType
                    : '',
                apiKey: typeof request.additionalParams?.aws_appsync_apiKey === 'string'
                    ? request.additionalParams.aws_appsync_apiKey
                    : '',
                jwtToken: typeof request.additionalParams?.aws_appsync_jwtToken === 'string'
                    ? request.additionalParams.aws_appsync_jwtToken
                    : '',
                token: typeof request.additionalParams?.aws_appsync_token === 'string'
                    ? request.additionalParams.aws_appsync_token
                    : '',
            };
            const link = core_1.ApolloLink.from([
                (0, aws_appsync_auth_link_1.createAuthLink)({ url, region, auth }),
                (0, aws_appsync_subscription_link_1.createSubscriptionHandshakeLink)({ url, region, auth }),
            ]);
            const client = new core_1.ApolloClient({
                link,
                cache: new core_1.InMemoryCache(),
            });
            const requestStartTimestamp = Date.now();
            this.subscription = client
                .subscribe({
                query: (0, graphql_1.parse)(request.query),
                variables: request.variables,
            })
                .subscribe((0, utils_1.simpleResponseObserver)(subscriber, request.url, requestStartTimestamp));
            return () => {
                this.destroy();
            };
        });
    }
    destroy() {
        if (this.subscription?.closed) {
            this.subscription?.unsubscribe();
        }
    }
}
exports.AppSyncRequestHandler = AppSyncRequestHandler;
//# sourceMappingURL=app-sync.js.map