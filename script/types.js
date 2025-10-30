import { getErrorEvent, getResponseEvent } from './events';
export var RequestType;
(function (RequestType) {
    RequestType["INTROSPECTION"] = "introspection";
    RequestType["QUERY"] = "query";
    RequestType["SUBSCRIPTION"] = "subscription";
})(RequestType || (RequestType = {}));
export class ScriptEvaluatorClient {
    sendResponse(type, payload) {
        this.send(getResponseEvent(type), payload);
    }
    sendError(type, payload) {
        this.send(getErrorEvent(type), payload);
    }
}
export class ScriptEvaluatorWorker {
}
//# sourceMappingURL=types.js.map