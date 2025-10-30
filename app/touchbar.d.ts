import { TouchBar } from 'electron';
import { ActionManager } from './actions';
import { InteropStateManager } from '../interop-state-manager';
export declare class TouchbarManager {
    private actionManager;
    private interopStateManager;
    private docsButton?;
    private docStateSubscription?;
    constructor(actionManager: ActionManager, interopStateManager: InteropStateManager);
    createTouchBar(): TouchBar;
    updateDocsButtonState(docsVisible: boolean): void;
}
//# sourceMappingURL=touchbar.d.ts.map