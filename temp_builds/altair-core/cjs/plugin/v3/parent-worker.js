"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginParentWorker = void 0;
const worker_1 = require("../../evaluator/worker");
const url_1 = require("../../utils/url");
const frame_worker_1 = require("./frame-worker");
class PluginParentWorker extends worker_1.EvaluatorWorker {
    constructor(opts) {
        super();
        this.opts = opts;
        this.messageListeners = [];
        this.iframe = this.createIframe();
        this.frameReadyPromise = new Promise((resolve) => {
            this.iframe.addEventListener('load', () => {
                resolve();
            });
        });
    }
    createIframe() {
        const iframe = document.createElement('iframe');
        iframe.id = this.opts.id;
        if (this.opts.instanceType === frame_worker_1.instanceTypes.PANEL) {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.display = 'block'; // fixes issue with vertical scrollbar appearing https://stackoverflow.com/a/9131632/3929126
            if ('width' in this.opts && this.opts.width) {
                iframe.style.minWidth = `${this.opts.width}px`;
            }
        }
        else {
            iframe.style.display = 'none';
        }
        const params = {
            ...this.opts.additionalParams,
            sc: window.location.origin,
            id: this.opts.id,
            instanceType: this.getInstanceType(),
        };
        // NOTE: Don't add allow-same-origin to the sandbox attribute!
        iframe.sandbox.add('allow-scripts');
        if (this.opts.additionalSandboxAttributes) {
            this.opts.additionalSandboxAttributes.forEach((attr) => {
                iframe.sandbox.add(attr);
            });
        }
        iframe.referrerPolicy = 'no-referrer';
        if (this.opts.type === 'scripts') {
            const url = (0, url_1.urlWithParams)(this.opts.sandboxUrl, {
                ...params,
                sandbox_type: 'plugin',
                plugin_sandbox_opts: JSON.stringify(this.opts),
            });
            iframe.src = url;
        }
        else if (this.opts.type === 'url') {
            const url = (0, url_1.urlWithParams)(this.opts.pluginEntrypointUrl, params);
            iframe.src = url;
        }
        if (!this.opts.disableAppend) {
            document.body.appendChild(iframe);
        }
        return iframe;
    }
    async frameReady() {
        await this.frameReadyPromise;
    }
    getIframe() {
        return this.iframe;
    }
    getInstanceType() {
        return this.opts.instanceType ?? frame_worker_1.instanceTypes.MAIN;
    }
    onMessage(handler) {
        const listener = (e) => {
            if (e.origin !== 'null' || e.source !== this.iframe.contentWindow) {
                return;
            }
            if (e.data.frameId !== this.opts.id) {
                // eslint-disable-next-line no-console
                console.error('Invalid frameId in data', e.data.frameId, this.opts.id);
                return;
            }
            handler(e.data);
        };
        window.addEventListener('message', listener, false);
        this.messageListeners.push(listener);
    }
    send(type, payload) {
        this.frameReady().then(() => {
            this.iframe.contentWindow?.postMessage({ type, payload }, 
            // https://web.dev/articles/sandboxed-iframes#safely_sandboxing_eval
            // Note that we're sending the message to "*", rather than some specific
            // origin. Sandboxed iframes which lack the 'allow-same-origin' header
            // don't have an origin which you can target: you'll have to send to any
            // origin, which might alow some esoteric attacks. Validate your output!
            '*');
        });
    }
    onError(handler) {
        this.iframe.addEventListener('error', handler);
    }
    destroy() {
        // cleanup resources
        this.messageListeners.forEach((listener) => {
            window.removeEventListener('message', listener);
        });
        this.iframe.remove();
    }
}
exports.PluginParentWorker = PluginParentWorker;
//# sourceMappingURL=parent-worker.js.map