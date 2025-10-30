import { Observable } from 'rxjs';
import ActionCable from 'actioncable';
export class ActionCableRequestHandler {
    handle(request) {
        return new Observable((subscriber) => {
            const requestStartTimestamp = Date.now();
            const cable = ActionCable.createConsumer(request.url);
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
//# sourceMappingURL=action-cable.js.map