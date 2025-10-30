export interface StreamState {
    url: string;
    type: 'event' | '';
    client?: EventSource;
    isConnected: boolean;
    failed?: Event;
}
//# sourceMappingURL=stream.interfaces.d.ts.map