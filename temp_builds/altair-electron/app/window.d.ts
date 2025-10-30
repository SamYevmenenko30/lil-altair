import { BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import { MenuManager } from './menu';
import { ActionManager } from './actions';
import { TouchbarManager } from './touchbar';
import { ElectronApp } from './index';
import { InteropStateManager } from '../interop-state-manager';
export declare class WindowManager {
    private electronApp;
    private instance?;
    mainWindowState?: windowStateKeeper.State;
    actionManager?: ActionManager;
    menuManager?: MenuManager;
    touchbarManager?: TouchbarManager;
    interopStateManager?: InteropStateManager;
    private ipcEventsInitialized;
    private sessionEventsInitialized;
    private rendererReady;
    constructor(electronApp: ElectronApp);
    getInstance(): BrowserWindow | undefined;
    createWindow(): Promise<void>;
    sendMessage(channel: string, ...args: unknown[]): void;
    private manageEvents;
    private initIpcEvents;
    private initSessionEvents;
    private initInstanceEvents;
    private registerProtocol;
    private getFilePath;
    /**
     * @param {string} originalFilePath path to file
     * @param {string} fallbackPath usually path to index file
     */
    private getFileContentData;
    private getRenderOptions;
}
//# sourceMappingURL=window.d.ts.map