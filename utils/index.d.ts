import { App } from 'electron';
export declare const getDirectoriesInDirectory: (path: string) => Promise<string[]>;
export declare const deleteFolderRecursive: (path: string) => void;
export declare const getStaticDirectory: () => string;
export declare const handleWithCustomErrors: (channel: string, handler: (event: Electron.IpcMainInvokeEvent, ...args: unknown[]) => unknown) => void;
export declare function findCustomProtocolUrlInArgv(argv: string[]): string | undefined;
export declare function restartApp(app: App): void;
//# sourceMappingURL=index.d.ts.map