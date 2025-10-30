export * from '../types';
export declare const electronAPI: {
    events: {
        onFileOpened(cb: (content: string) => void): Electron.IpcRenderer;
        onUrlOpened(cb: (url: string) => void): Electron.IpcRenderer;
        onCertificateError(cb: (err: Error) => void): Electron.IpcRenderer;
        onImportAppData(cb: (content: string) => void): Electron.IpcRenderer;
        onExportAppData(cb: () => void): Electron.IpcRenderer;
        onCreateTab(cb: () => void): Electron.IpcRenderer;
        onCloseTab(cb: () => void): Electron.IpcRenderer;
        onNextTab(cb: () => void): Electron.IpcRenderer;
        onPreviousTab(cb: () => void): Electron.IpcRenderer;
        onReopenClosedTab(cb: () => void): Electron.IpcRenderer;
        onSendRequest(cb: () => void): Electron.IpcRenderer;
        onReloadDocs(cb: () => void): Electron.IpcRenderer;
        onShowDocs(cb: () => void): Electron.IpcRenderer;
        onShowSettings(cb: () => void): Electron.IpcRenderer;
        onUpdateAvailable(cb: () => void): Electron.IpcRenderer;
    };
    store: {
        clear(): void;
        getItem(key: string): string | null;
        key(index: number): string | null;
        removeItem(key: string): void;
        setItem(key: string, value: string): void;
        getLength(): number;
        getStore(): Record<string, unknown>;
    };
    actions: {
        rendererReady(): void;
        performAppUpdate(): void;
        restartApp(): void;
        getAuthToken(): Promise<any>;
        getAutobackupData(): Promise<any>;
        saveAutobackupData(data: string): void;
        updateInteropState(state: import("../types").InteropAppState): void;
        updateInteropWindowState(windowId: string, state: Partial<import("../types").InteropAppState["windows"][string]>): void;
        updateInteropActiveWindowIdState(windowId: string): void;
        removeInteropWindowState(windowId: string): void;
        getAltairAppSettingsFromFile(): Promise<import("altair-graphql-core/build/types/state/settings.interfaces").SettingsState | undefined>;
        updateAltairAppSettingsOnFile(settings: import("altair-graphql-core/build/types/state/settings.interfaces").SettingsState): Promise<any>;
    };
} | undefined;
//# sourceMappingURL=index.d.ts.map