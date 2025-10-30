"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginV3 = void 0;
const frame_engine_1 = require("./frame-engine");
const frame_worker_1 = require("./frame-worker");
class PluginV3 {
    constructor(options = { panels: {} }) {
        this.options = options;
        const worker = new frame_worker_1.PluginFrameWorker();
        this.engine = new frame_engine_1.PluginFrameEngine(worker, this.options);
        this.initializeWhenReady();
    }
    // TODO: Pass type of keyof panels to context for better type checking
    initializeWhenReady() {
        if (!this.engine.canInitialize()) {
            return;
        }
        this.engine.ready().then(() => {
            this.initialize(this.engine.getContext());
        });
    }
}
exports.PluginV3 = PluginV3;
//# sourceMappingURL=plugin.js.map