import { v4 as uuid } from 'uuid';
import { SCRIPT_INIT_EXECUTE } from './events';
import { getGlobalContext } from './context';
const workerHandlerNames = [
    'setCookie',
    'request',
    'getStorageItem',
    'setStorageItem',
];
export class ScriptEvaluatorWorkerEngine {
    constructor(worker) {
        this.worker = worker;
    }
    start() {
        this.worker.onMessage(async (e) => {
            switch (e.type) {
                case SCRIPT_INIT_EXECUTE:
                    try {
                        await this.initExecute(e.payload);
                    }
                    catch (err) {
                        await this.makeCall('scriptError', err);
                    }
                    break;
            }
        });
    }
    async initExecute(payload) {
        const [script, data] = payload;
        const res = await new Promise((resolve, reject) => {
            this.worker.onError((err) => {
                reject(err);
            });
            const clonedMutableData = JSON.parse(JSON.stringify(data));
            // build handlers
            const handlers = workerHandlerNames.reduce((acc, key) => {
                acc[key] = ((...args) => {
                    return this.makeCall(key, ...args);
                }); // TODO: Look into this typing issue.
                return acc;
            }, {});
            const context = {
                altair: getGlobalContext(clonedMutableData, handlers),
                alert: (msg) => this.makeCall('alert', msg),
            };
            const contextEntries = Object.entries(context);
            try {
                const res = function () {
                    return eval(`
          (async(${contextEntries.map((e) => e[0]).join(',')}) => {
            ${script};
            return altair.data;
          })(...this.__ctxE.map(e => e[1]));
        `);
                }.call({ __ctxE: contextEntries });
                return resolve(res);
            }
            catch (e) {
                return reject(e);
            }
        });
        if (res.__toSetActiveEnvironment) {
            // update active environment
            this.makeCall('updateActiveEnvironment', res.__toSetActiveEnvironment);
        }
        this.makeCall('executeComplete', res);
    }
    makeCall(type, ...args) {
        return new Promise((resolve, reject) => {
            const id = uuid();
            // TODO: cleanup listener
            this.worker.onMessage((e) => {
                switch (e.type) {
                    case `${type}_response`:
                        if (e.payload.id !== id) {
                            return;
                        }
                        return resolve(e.payload.response);
                    case `${type}_error`:
                        if (e.payload.id !== id) {
                            return;
                        }
                        return reject(e.payload.error);
                }
            });
            this.worker.send(type, { id, args });
        });
    }
}
//# sourceMappingURL=evaluator-worker-engine.js.map