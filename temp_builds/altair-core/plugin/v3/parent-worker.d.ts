import { EvaluatorWorker, EventData } from '../../evaluator/worker';
import { InstanceType } from './frame-worker';
interface BasePluginParentWorkerOptions {
    id: string;
    disableAppend?: boolean;
    instanceType?: InstanceType;
    additionalParams?: Record<string, string>;
    additionalSandboxAttributes?: string[];
    width?: number;
}
interface PluginParentWorkerOptionsWithScripts extends BasePluginParentWorkerOptions {
    type: 'scripts';
    sandboxUrl: string;
    scriptUrls: string[];
    styleUrls: string[];
}
interface PluginParentWorkerOptionsWithUrl extends BasePluginParentWorkerOptions {
    type: 'url';
    pluginEntrypointUrl: string;
}
export type PluginParentWorkerOptions = PluginParentWorkerOptionsWithScripts | PluginParentWorkerOptionsWithUrl;
export declare class PluginParentWorker extends EvaluatorWorker {
    private opts;
    private messageListeners;
    constructor(opts: PluginParentWorkerOptions);
    private iframe;
    private frameReadyPromise;
    private createIframe;
    private frameReady;
    getIframe(): HTMLIFrameElement;
    getInstanceType(): InstanceType;
    onMessage<T extends string, P = unknown>(handler: (e: EventData<T, P>) => void): void;
    send<T extends string>(type: T, payload?: unknown): void;
    onError(handler: (err: unknown) => void): void;
    destroy(): void;
}
export {};
//# sourceMappingURL=parent-worker.d.ts.map