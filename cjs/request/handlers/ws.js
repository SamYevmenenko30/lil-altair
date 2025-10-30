"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketRequestHandler = void 0;
const rxjs_1 = require("rxjs");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const utils_1 = require("../utils");
class WebsocketRequestHandler {
    onConnected(subscriber, error, data) {
        if (error) {
            console.log('Subscription connection error', error);
            subscriber.error(error);
            return;
        }
        console.log('Connected subscription.');
    }
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            this.client = new subscriptions_transport_ws_1.SubscriptionClient(request.url, {
                reconnect: true,
                connectionParams: request.additionalParams,
                connectionCallback: (error, result) => {
                    this.onConnected(subscriber, error, result);
                },
            });
            if (!this.client) {
                throw new Error('Could not create WS client!');
            }
            const requestStartTimestamp = Date.now();
            const res = this.client
                .request({
                query: request.query,
                variables: request.variables,
                operationName: request.selectedOperation ?? undefined,
            })
                .subscribe((0, utils_1.simpleResponseObserver)(subscriber, request.url, requestStartTimestamp));
            this.cleanup = res.unsubscribe;
            return () => {
                this.destroy();
            };
        });
    }
    async destroy() {
        this.cleanup?.();
        this.cleanup = undefined;
        this.client?.unsubscribeAll();
        this.client?.close();
        this.client = undefined;
    }
}
exports.WebsocketRequestHandler = WebsocketRequestHandler;
//# sourceMappingURL=ws.js.map