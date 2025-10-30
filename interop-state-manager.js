"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="128adbcd-d575-5ac8-9cbc-ff5956f95a4c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.InteropStateManager = void 0;
const rxjs_1 = require("rxjs");
class InteropStateManager {
    constructor(initialState) {
        /** BehaviorSubject that holds the current state */
        this.stateSubject = new rxjs_1.BehaviorSubject({
            windows: {},
        });
        if (initialState) {
            this.stateSubject.next(initialState);
        }
    }
    getState() {
        return this.stateSubject.getValue();
    }
    setState(state) {
        this.stateSubject.next(state);
    }
    getWindowState(windowId) {
        return this.stateSubject.getValue().windows[windowId];
    }
    setWindowState(windowId, windowState) {
        const currentState = this.stateSubject.getValue();
        this.stateSubject.next({
            ...currentState,
            windows: {
                ...currentState.windows,
                [windowId]: windowState,
            },
        });
    }
    asObservable() {
        return this.stateSubject.asObservable();
    }
    asActiveWindowStateObservable() {
        return this.asObservable().pipe((0, rxjs_1.map)((state) => state.activeWindowId
            ? state.windows[state.activeWindowId] ?? this.defaultWindowState()
            : this.defaultWindowState()), (0, rxjs_1.distinctUntilChanged)());
    }
    asWindowStateObservable(windowId) {
        return this.asObservable().pipe((0, rxjs_1.map)((state) => state.windows[windowId] ?? this.defaultWindowState()), (0, rxjs_1.distinctUntilChanged)());
    }
    defaultWindowState() {
        return {
            windowId: '',
            headers: [],
            showDocs: false,
        };
    }
}
exports.InteropStateManager = InteropStateManager;
//# sourceMappingURL=interop-state-manager.js.map
//# debugId=128adbcd-d575-5ac8-9cbc-ff5956f95a4c
