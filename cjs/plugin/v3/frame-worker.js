"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFrameWorker = exports.instanceTypes = void 0;
const worker_1 = require("../../evaluator/worker");
exports.instanceTypes = {
    MAIN: 'main',
    PANEL: 'panel',
};
class PluginFrameWorker extends worker_1.EvaluatorWorker {
    constructor() {
        super();
        this.instanceType = exports.instanceTypes.MAIN;
        this.messageListeners = [];
        // Check for params in special params object on the window object first. Using srcdoc, we will set the params on the window object
        const paramFromWindow = window.__ALTAIR_PLUGIN_PARAMS__;
        const paramsFromUrl = Object.fromEntries(new URLSearchParams(window.location.search));
        const params = paramFromWindow ?? paramsFromUrl;
        this.params = params;
        if (!params.sc) {
            console.log('Invalid source provided!', paramFromWindow, paramsFromUrl);
            throw new Error('Invalid source provided!');
        }
        if (!params.id) {
            throw new Error('Invalid plugin ID provided!');
        }
        this.origin = params.sc;
        this.id = params.id;
        this.instanceType = params.instanceType ?? exports.instanceTypes.MAIN;
    }
    getInstanceType() {
        return this.instanceType;
    }
    getParams() {
        return this.params;
    }
    onMessage(handler) {
        const listener = (e) => {
            if (e.origin !== this.origin) {
                return;
            }
            handler(e.data);
        };
        window.addEventListener('message', listener);
        this.messageListeners.push(listener);
    }
    send(type, payload) {
        window.parent.postMessage({ type, payload, frameId: this.id }, this.origin);
    }
    onError(handler) {
        window.addEventListener('error', handler);
        window.addEventListener('unhandledrejection', (e) => {
            e.preventDefault();
            handler(e.reason);
        });
    }
    destroy() {
        // cleanup resources
        this.messageListeners.forEach((listener) => {
            window.removeEventListener('message', listener);
        });
        window.close();
    }
}
exports.PluginFrameWorker = PluginFrameWorker;
//# sourceMappingURL=frame-worker.js.map