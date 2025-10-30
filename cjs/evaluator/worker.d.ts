export interface EventData<T extends string, P = unknown> {
    type: T;
    payload: P;
}
export declare abstract class EvaluatorWorker {
    abstract onMessage<T extends string, P = unknown>(handler: (e: EventData<T, P>) => void): void;
    abstract send<T extends string>(type: T, payload?: unknown): void;
    abstract onError(handler: (err: unknown) => void): void;
    abstract destroy(): void;
    subscribe<T extends string, P = unknown>(type: T, handler: (type: T, e: EventData<T, P>) => void): void;
    request<T extends string, R = unknown>(type: T, ...args: unknown[]): Promise<R | undefined>;
    respond<T extends string, R = unknown>(type: T, handler: (...args: unknown[]) => Promise<R>): void;
}
//# sourceMappingURL=worker.d.ts.map