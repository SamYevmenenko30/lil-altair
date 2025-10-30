import { PluginFrameEngine } from './frame-engine';
import { PluginFrameWorker } from './frame-worker';
export class PluginV3 {
    constructor(options = { panels: {} }) {
        this.options = options;
        const worker = new PluginFrameWorker();
        this.engine = new PluginFrameEngine(worker, this.options);
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
//# sourceMappingURL=plugin.js.map