import { EvaluatorWorker, EventData } from '../../evaluator/worker';
export declare const instanceTypes: {
    readonly MAIN: "main";
    readonly PANEL: "panel";
};
export type InstanceType = (typeof instanceTypes)[keyof typeof instanceTypes];
export interface FrameOptions {
    /**
     * Source origin of the parent window
     */
    sc: string;
    /**
     * Plugin ID
     */
    id: string;
    /**
     * Instance type of the plugin
     */
    instanceType: InstanceType;
    /**
     * Additional parameters
     */
    [key: string]: string;
}
export declare class PluginFrameWorker extends EvaluatorWorker {
    private origin;
    private id;
    private instanceType;
    private params;
    private messageListeners;
    constructor();
    getInstanceType(): InstanceType;
    getParams(): FrameOptions;
    onMessage<T extends string, P = unknown>(handler: (e: EventData<T, P>) => void): void;
    send(type: string, payload: any): void;
    onError(handler: (err: any) => void): void;
    destroy(): void;
}
//# sourceMappingURL=frame-worker.d.ts.map