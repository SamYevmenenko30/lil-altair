export declare const IPC_SET_CUSTOM_TOKEN_EVENT = "auth:set-custom-token";
export declare class AuthServer {
    private port;
    private server?;
    private sessionPartition;
    private nonce;
    private emitter;
    private ttlSeconds;
    start(): Promise<void>;
    terminate(): void;
    getCustomToken(): Promise<string>;
    private listenForToken;
    private getSession;
    private getAvailablePort;
}
//# sourceMappingURL=index.d.ts.map