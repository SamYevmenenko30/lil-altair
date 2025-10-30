"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFrameEngine = void 0;
const events_1 = require("./events");
const frame_worker_1 = require("./frame-worker");
class PluginFrameEngine {
    constructor(worker, options) {
        this.worker = worker;
        this.options = options;
        // eslint-disable-next-line @typescript-eslint/ban-types
        this.eventListeners = {};
        this.readyPromise = new Promise((resolve) => {
            this.worker.subscribe(events_1.PLUGIN_ENGINE_READY, () => {
                resolve();
            });
        });
        // check if this is a panel frame so we can handle the panel logic specially
        const panelName = worker.getParams().panelName;
        if (worker.getInstanceType() === frame_worker_1.instanceTypes.PANEL && panelName) {
            this.handlePanelSetup(panelName);
        }
        // TODO: Pass the panels list to the parent engine for validation, in case the plugin tries to create a panel that doesn't exist
        // TODO: skip the main frame only events if the frame is not the main frame
    }
    async ready() {
        await this.readyPromise;
    }
    canInitialize() {
        return this.worker.getInstanceType() === frame_worker_1.instanceTypes.MAIN;
    }
    createContext() {
        const ctx = {
            getWindowState: (...args) => {
                return this.worker.request('getWindowState', ...args);
            },
            getCurrentWindowState: (...args) => {
                return this.worker.request('getCurrentWindowState', ...args);
            },
            createPanel: async (...args) => {
                return this.worker.request('createPanel', ...args);
            },
            destroyPanel: async (...args) => {
                return this.worker.request('destroyPanel', ...args);
            },
            createAction: async (opts) => {
                // send action event to the parent engine without callback
                // subscribe to the action event from the parent engine
                const optsWithoutExecute = { ...opts, execute: undefined };
                const idPromise = this.worker.request(events_1.PLUGIN_CREATE_ACTION_EVENT, optsWithoutExecute);
                const id = await idPromise;
                if (id) {
                    this.worker.respond((0, events_1.getActionEvent)(id), async (data) => {
                        opts.execute(data);
                    });
                }
                return id;
            },
            destroyAction: async (...args) => {
                return this.worker.request('destroyAction', ...args);
            },
            isElectron: async (...args) => {
                return !!(await this.worker.request('isElectron', ...args));
            },
            createWindow: (...args) => {
                return this.worker.request('createWindow', ...args);
            },
            setQuery: (...args) => {
                return this.worker.request('setQuery', ...args);
            },
            setVariables: (...args) => {
                return this.worker.request('setVariables', ...args);
            },
            setHeader: (...args) => {
                return this.worker.request('setHeader', ...args);
            },
            setEndpoint: (...args) => {
                return this.worker.request('setEndpoint', ...args);
            },
            on: (event, callback) => {
                this.worker.request(events_1.PLUGIN_SUBSCRIBE_TO_EVENT, event);
                this.eventListeners[event] = this.eventListeners[event] || [];
                const listeners = this.eventListeners[event];
                if (listeners) {
                    listeners.push(callback);
                }
                this.worker.respond(event, async (...args) => {
                    const listeners = this.eventListeners[event];
                    if (!listeners) {
                        return;
                    }
                    listeners.forEach((listener) => listener(...args));
                });
                return {
                    unsubscribe: () => {
                        this.eventListeners[event] = (this.eventListeners[event] ?? []).filter((listener) => listener !== callback);
                    },
                };
            },
            off: () => {
                this.eventListeners = {};
                this.worker.request('off');
            },
            addTheme: (...args) => {
                return this.worker.request('addTheme', ...args);
            },
            enableTheme: (...args) => {
                return this.worker.request('enableTheme', ...args);
            },
            getUserInfo: async () => {
                return this.worker.request('getUserInfo');
            },
            getAvailableCredits: async () => {
                return this.worker.request('getAvailableCredits');
            },
            createAiSession: async (...args) => {
                return this.worker.request('createAiSession', ...args);
            },
            getActiveAiSession: async (...args) => {
                return this.worker.request('getActiveAiSession', ...args);
            },
            getAiSessionMessages: async (...args) => {
                return this.worker.request('getAiSessionMessages', ...args);
            },
            sendMessageToAiSession: async (...args) => {
                return this.worker.request('sendMessageToAiSession', ...args);
            },
            rateAiSessionMessage: async (...args) => {
                return this.worker.request('rateAiSessionMessage', ...args);
            },
        };
        this.ctx = ctx;
        return ctx;
    }
    getContext() {
        if (!this.ctx) {
            return this.createContext();
        }
        return this.ctx;
    }
    async handlePanelSetup(panelName) {
        const panel = this.options.panels[panelName];
        if (panel) {
            // setup styles in the panel
            panel.initialize(this.getContext(), await this.worker.request(events_1.PLUGIN_GET_APP_STYLE_URL_EVENT));
        }
    }
}
exports.PluginFrameEngine = PluginFrameEngine;
//# sourceMappingURL=frame-engine.js.map