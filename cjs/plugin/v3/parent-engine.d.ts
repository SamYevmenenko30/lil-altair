import { ICustomTheme } from '../../theme';
import { PluginV3Context } from './context';
import { PluginParentWorker } from './parent-worker';
interface PluginParentEngineOptions {
    theme?: ICustomTheme;
}
export declare class PluginParentEngine {
    private worker;
    private opts?;
    private context?;
    subscribedEvents: string[];
    constructor(worker: PluginParentWorker, opts?: PluginParentEngineOptions | undefined);
    start(context: PluginV3Context): void;
    prepareListeners(): void;
    handleEvents(): void;
    handleActionEvents(): void;
    destroy(): void;
}
export {};
//# sourceMappingURL=parent-engine.d.ts.map