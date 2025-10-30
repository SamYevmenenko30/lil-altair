"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEvaluatorWorker = exports.ScriptEvaluatorClient = exports.RequestType = void 0;
const events_1 = require("./events");
var RequestType;
(function (RequestType) {
    RequestType["INTROSPECTION"] = "introspection";
    RequestType["QUERY"] = "query";
    RequestType["SUBSCRIPTION"] = "subscription";
})(RequestType || (exports.RequestType = RequestType = {}));
class ScriptEvaluatorClient {
    sendResponse(type, payload) {
        this.send((0, events_1.getResponseEvent)(type), payload);
    }
    sendError(type, payload) {
        this.send((0, events_1.getErrorEvent)(type), payload);
    }
}
exports.ScriptEvaluatorClient = ScriptEvaluatorClient;
class ScriptEvaluatorWorker {
}
exports.ScriptEvaluatorWorker = ScriptEvaluatorWorker;
//# sourceMappingURL=types.js.map