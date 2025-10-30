export interface ILogger {
    log(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare const createLogger: (environment: {
    production: boolean;
    version: string;
}) => ILogger;
//# sourceMappingURL=logger.d.ts.map