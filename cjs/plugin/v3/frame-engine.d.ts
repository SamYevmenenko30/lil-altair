import { PluginV3Context } from './context';
import { PluginFrameWorker } from './frame-worker';
import { PluginV3Options } from './plugin';
export declare class PluginFrameEngine {
    private worker;
    private options;
    private readyPromise;
    private eventListeners;
    private ctx?;
    constructor(worker: PluginFrameWorker, options: PluginV3Options);
    ready(): Promise<void>;
    canInitialize(): boolean;
    private createContext;
    getContext(): PluginV3Context;
    private handlePanelSetup;
}
//# sourceMappingURL=frame-engine.d.ts.map