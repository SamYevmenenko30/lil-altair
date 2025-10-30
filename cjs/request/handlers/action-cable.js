"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCableRequestHandler = void 0;
const rxjs_1 = require("rxjs");
const actioncable_1 = __importDefault(require("actioncable"));
class ActionCableRequestHandler {
    handle(request) {
        return new rxjs_1.Observable((subscriber) => {
            const requestStartTimestamp = Date.now();
            const cable = actioncable_1.default.createConsumer(request.url);
            this.subscription = cable.subscriptions.create({
                channel: typeof request.additionalParams?.channel === 'string'
                    ? request.additionalParams.channel
                    : 'GraphqlChannel',
                channelId: Math.round(Date.now() + Math.random() * 100000).toString(16),
            }, {
                connected: function () {
                    this.perform('execute', request);
                },
                received: function (payload) {
                    if (payload.result.data || payload.result.errors) {
                        const requestEndTimestamp = Date.now();
                        subscriber.next({
                            ok: true,
                            data: JSON.stringify(payload.result),
                            headers: new Headers(),
                            status: 200,
                            statusText: 'OK',
                            url: request.url,
                            requestStartTimestamp,
                            requestEndTimestamp,
                            resopnseTimeMs: requestEndTimestamp - requestStartTimestamp,
                        });
                    }
                    if (!payload.more) {
                        subscriber.complete();
                    }
                },
            });
            return () => {
                this.destroy();
            };
        });
    }
    generateCurl(request) {
        throw new Error('Method not implemented.');
    }
    destroy() {
        this.subscription?.unsubscribe();
    }
}
exports.ActionCableRequestHandler = ActionCableRequestHandler;
//# sourceMappingURL=action-cable.js.map