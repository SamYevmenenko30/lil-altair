import { InMemoryStore } from '../store';
import { WindowManager } from './window';
export declare class ElectronApp {
    store: InMemoryStore;
    windowManager: WindowManager;
    constructor();
    manageEvents(): Promise<void>;
    private handleOpenUrlEvent;
}
//# sourceMappingURL=index.d.ts.map