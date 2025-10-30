import { v4 as uuid } from 'uuid';
import { getErrorEvent, getResponseEvent } from './events';
export class EvaluatorWorker {
    subscribe(type, handler) {
        this.onMessage((e) => {
            // Handle script events
            if (e.type === type) {
                handler(type, e);
            }
        });
    }
    request(type, ...args) {
        return new Promise((resolve, reject) => {
            const id = uuid();
            // TODO: cleanup listener
            this.onMessage((e) => {
                switch (e.type) {
                    case getResponseEvent(type): {
                        if (e.payload.id !== id) {
                            return;
                        }
                        return resolve(e.payload.response);
                    }
                    case getErrorEvent(type): {
                        if (e.payload.id !== id) {
                            return;
                        }
                        return reject(e.payload.error);
                    }
                }
            });
            this.send(type, { id, args });
        });
    }
    respond(type, handler) {
        this.subscribe(type, async (type, e) => {
            // TODO: handle cancelling requests
            // TODO: allow for multiple responses, or a single response
            const { id, args } = e.payload;
            try {
                const res = await handler(...args);
                this.send(getResponseEvent(type), { id, response: res });
            }
            catch (err) {
                this.send(getErrorEvent(type), {
                    id,
                    error: `${err.message ?? err}`,
                });
            }
        });
    }
}
//# sourceMappingURL=worker.js.map