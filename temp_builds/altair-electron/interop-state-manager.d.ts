import { InteropAppState } from '@altairgraphql/electron-interop';
import { Observable } from 'rxjs';
export declare class InteropStateManager {
    /** BehaviorSubject that holds the current state */
    private readonly stateSubject;
    constructor(initialState?: InteropAppState);
    getState(): InteropAppState;
    setState(state: InteropAppState): void;
    getWindowState(windowId: string): InteropAppState['windows'][string] | undefined;
    setWindowState(windowId: string, windowState: InteropAppState['windows'][string]): void;
    asObservable(): Observable<InteropAppState>;
    asActiveWindowStateObservable(): Observable<InteropAppState['windows'][string]>;
    asWindowStateObservable(windowId: string): Observable<InteropAppState['windows'][string]>;
    private defaultWindowState;
}
//# sourceMappingURL=interop-state-manager.d.ts.map