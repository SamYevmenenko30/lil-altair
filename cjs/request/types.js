"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_HANDLER_IDS = exports.GRAPHQL_SSE_HANDLER_ID = exports.ACTION_CABLE_HANDLER_ID = exports.APP_SYNC_HANDLER_ID = exports.GRAPHQL_WS_HANDLER_ID = exports.WEBSOCKET_HANDLER_ID = exports.HTTP_HANDLER_ID = exports.MultiResponseStrategy = void 0;
var MultiResponseStrategy;
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
})(MultiResponseStrategy || (exports.MultiResponseStrategy = MultiResponseStrategy = {}));
exports.HTTP_HANDLER_ID = 'http';
exports.WEBSOCKET_HANDLER_ID = 'websocket';
exports.GRAPHQL_WS_HANDLER_ID = 'graphql-ws';
exports.APP_SYNC_HANDLER_ID = 'app-sync';
exports.ACTION_CABLE_HANDLER_ID = 'action-cable';
exports.GRAPHQL_SSE_HANDLER_ID = 'graphql-sse';
exports.REQUEST_HANDLER_IDS = {
    HTTP: exports.HTTP_HANDLER_ID,
    WEBSOCKET: exports.WEBSOCKET_HANDLER_ID,
    GRAPHQL_WS: exports.GRAPHQL_WS_HANDLER_ID,
    APP_SYNC: exports.APP_SYNC_HANDLER_ID,
    ACTION_CABLE: exports.ACTION_CABLE_HANDLER_ID,
    GRAPHQL_SSE: exports.GRAPHQL_SSE_HANDLER_ID,
};
//# sourceMappingURL=types.js.map