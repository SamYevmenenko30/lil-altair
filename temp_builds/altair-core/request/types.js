export var MultiResponseStrategy;
(function (MultiResponseStrategy) {
    /**
     * Automatically determine the strategy based on the response
     */
    MultiResponseStrategy["AUTO"] = "auto";
    /**
     * Concatenate all responses
     */
    MultiResponseStrategy["CONCATENATE"] = "concatenate";
    /**
     * Append responses as a list
     */
    MultiResponseStrategy["APPEND"] = "append";
    /**
     * Patch the responses together following the GraphQL spec
     */
    MultiResponseStrategy["PATCH"] = "patch";
})(MultiResponseStrategy || (MultiResponseStrategy = {}));
export const HTTP_HANDLER_ID = 'http';
export const WEBSOCKET_HANDLER_ID = 'websocket';
export const GRAPHQL_WS_HANDLER_ID = 'graphql-ws';
export const APP_SYNC_HANDLER_ID = 'app-sync';
export const ACTION_CABLE_HANDLER_ID = 'action-cable';
export const GRAPHQL_SSE_HANDLER_ID = 'graphql-sse';
export const REQUEST_HANDLER_IDS = {
    HTTP: HTTP_HANDLER_ID,
    WEBSOCKET: WEBSOCKET_HANDLER_ID,
    GRAPHQL_WS: GRAPHQL_WS_HANDLER_ID,
    APP_SYNC: APP_SYNC_HANDLER_ID,
    ACTION_CABLE: ACTION_CABLE_HANDLER_ID,
    GRAPHQL_SSE: GRAPHQL_SSE_HANDLER_ID,
};
//# sourceMappingURL=types.js.map