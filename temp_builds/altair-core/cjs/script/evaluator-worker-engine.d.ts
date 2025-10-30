import { ScriptEvaluatorWorker } from './types';
declare const workerHandlerNames: readonly ["setCookie", "request", "getStorageItem", "setStorageItem"];
export type WorkerHandlerNames = (typeof workerHandlerNames)[number];
export declare class ScriptEvaluatorWorkerEngine {
    private worker;
    constructor(worker: ScriptEvaluatorWorker);
    start(): void;
    private initExecute;
    private makeCall;
}
export {};
//# sourceMappingURL=evaluator-worker-engine.d.ts.map