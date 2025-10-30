import { PluginV3Context } from './context';
import { AltairV3Panel } from './panel';
export interface PluginV3Options {
    panels: Record<string, AltairV3Panel>;
}
export declare abstract class PluginV3 {
    private options;
    private engine;
    constructor(options?: PluginV3Options);
    private initializeWhenReady;
    abstract initialize(ctx: PluginV3Context): void;
    abstract destroy(): void;
}
//# sourceMappingURL=plugin.d.ts.map