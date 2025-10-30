import { SCRIPT_INIT_EXECUTE } from './events';
const DEFAULT_TIMEOUT = 1000 * 60 * 5; // 5 minutes
export class ScriptEvaluatorClientEngine {
    constructor(engineFactory, timeout = DEFAULT_TIMEOUT) {
        this.engineFactory = engineFactory;
        this.timeout = timeout;
    }
    async getClient() {
        const client = this.client ?? (await this.engineFactory.create());
        this.client = client;
        return client;
    }
    async executeScript(script, data, userAvailableHandlers) {
        try {
            const engine = await this.getClient();
            const result = await new Promise((resolve, reject) => {
                // Handle timeout
                const handle = setTimeout(() => {
                    this.killClient();
                    reject(new Error('script timeout'));
                }, this.timeout);
                const allHandlers = {
                    ...userAvailableHandlers,
                    executeComplete: (data) => {
                        clearTimeout(handle);
                        resolve({
                            environment: data.environment,
                            requestScriptLogs: data.requestScriptLogs || [],
                        });
                    },
                    scriptError: (err) => {
                        clearTimeout(handle);
                        reject(err);
                    },
                };
                // loop over all the script event handlers and create a listener for each
                // TODO: fn is of any type here. Figure out the typing
                Object.entries(allHandlers).forEach(([k, fn]) => {
                    engine.subscribe(k, (key, event) => {
                        // TODO: handle cancelling requests
                        const { id, args } = event.payload;
                        (async () => {
                            try {
                                const res = await fn(...args);
                                engine.sendResponse(key, { id, response: res });
                            }
                            catch (err) {
                                engine.sendError(key, {
                                    id,
                                    error: `${err.message ?? err}`,
                                });
                            }
                        })();
                    });
                });
                engine.onError((e) => {
                    clearTimeout(handle);
                    reject(e);
                });
                engine.send(SCRIPT_INIT_EXECUTE, [script, data]);
            });
            return result;
        }
        finally {
            this.killClient();
        }
    }
    killClient() {
        this.client?.destroy();
        this.client = undefined;
    }
}
//# sourceMappingURL=evaluator-client-engine.js.map