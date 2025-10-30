"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6f9bebd2-8e6c-5d6b-8471-87d4dce10e2c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchbarManager = void 0;
const electron_1 = require("electron");
const { TouchBarButton, TouchBarSpacer } = electron_1.TouchBar;
class TouchbarManager {
    constructor(actionManager, interopStateManager) {
        this.actionManager = actionManager;
        this.interopStateManager = interopStateManager;
    }
    createTouchBar() {
        if (this.docStateSubscription) {
            this.docStateSubscription.unsubscribe();
        }
        const sendRequestButton = new TouchBarButton({
            label: 'Send Request',
            backgroundColor: '#7EBC59',
            click: () => this.actionManager.sendRequest(),
        });
        const reloadDocsButton = new TouchBarButton({
            label: 'Reload Docs',
            click: () => this.actionManager.reloadDocs(),
        });
        this.docsButton = new TouchBarButton({
            label: 'Show Docs',
            click: () => this.actionManager.showDocs(),
        });
        const spacer = new TouchBarSpacer({
            size: 'flexible',
        });
        const touchBar = new electron_1.TouchBar({
            items: [
                // spin,
                sendRequestButton,
                spacer,
                reloadDocsButton,
                this.docsButton,
            ],
        });
        this.docStateSubscription = this.interopStateManager
            .asActiveWindowStateObservable()
            .subscribe((state) => {
            this.updateDocsButtonState(state.showDocs);
        });
        return touchBar;
    }
    updateDocsButtonState(docsVisible) {
        if (!this.docsButton) {
            return;
        }
        this.docsButton.label = docsVisible ? 'Hide Docs' : 'Show Docs';
    }
}
exports.TouchbarManager = TouchbarManager;
//# sourceMappingURL=touchbar.js.map
//# debugId=6f9bebd2-8e6c-5d6b-8471-87d4dce10e2c
