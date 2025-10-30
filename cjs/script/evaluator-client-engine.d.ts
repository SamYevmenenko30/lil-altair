import { ScriptContextData, ScriptEvaluatorClientFactory, ScriptEventHandlers, ScriptTransformResult } from './types';
export declare class ScriptEvaluatorClientEngine {
    private engineFactory;
    private timeout;
    private client?;
    constructor(engineFactory: ScriptEvaluatorClientFactory, timeout?: number);
    private getClient;
    executeScript(script: string, data: ScriptContextData, userAvailableHandlers: ScriptEventHandlers): Promise<ScriptTransformResult>;
    private killClient;
}
//# sourceMappingURL=evaluator-client-engine.d.ts.map