"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluatorWorker = void 0;
const uuid_1 = require("uuid");
const events_1 = require("./events");
class EvaluatorWorker {
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
            const id = (0, uuid_1.v4)();
            // TODO: cleanup listener
            this.onMessage((e) => {
                switch (e.type) {
                    case (0, events_1.getResponseEvent)(type): {
                        if (e.payload.id !== id) {
                            return;
                        }
                        return resolve(e.payload.response);
                    }
                    case (0, events_1.getErrorEvent)(type): {
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
                this.send((0, events_1.getResponseEvent)(type), { id, response: res });
            }
            catch (err) {
                this.send((0, events_1.getErrorEvent)(type), {
                    id,
                    error: `${err.message ?? err}`,
                });
            }
        });
    }
}
exports.EvaluatorWorker = EvaluatorWorker;
//# sourceMappingURL=worker.js.map