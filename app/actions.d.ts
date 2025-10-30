import { MenuItem } from 'electron';
import { WindowManager } from './window';
export declare class ActionManager {
    private windowManager;
    constructor(windowManager: WindowManager);
    createTab(): void;
    closeTab(): void;
    nextTab(): void;
    previousTab(): void;
    reopenClosedTab(): void;
    sendRequest(): void;
    reloadDocs(): void;
    showDocs(): void;
    showSettings(): void;
    importAppData(): void;
    exportAppData(): void;
    checkForUpdates(menuItem: MenuItem): void;
    showPreferences(): Promise<void>;
}
//# sourceMappingURL=actions.d.ts.map