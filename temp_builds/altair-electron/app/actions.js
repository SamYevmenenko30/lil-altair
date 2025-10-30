"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e8fc9cb1-a20a-5ebf-8719-65959126602d")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionManager = void 0;
const backup_1 = require("../utils/backup");
const updates_1 = require("../updates");
const electron_1 = require("electron");
const url_1 = __importDefault(require("url"));
const path_1 = __importDefault(require("path"));
const electron_settings_static_1 = require("@altairgraphql/electron-settings-static");
class ActionManager {
    constructor(windowManager) {
        this.windowManager = windowManager;
    }
    createTab() {
        this.windowManager.getInstance()?.webContents.send('create-tab', true);
    }
    closeTab() {
        this.windowManager.getInstance()?.webContents.send('close-tab', true);
    }
    nextTab() {
        this.windowManager.getInstance()?.webContents.send('next-tab', true);
    }
    previousTab() {
        this.windowManager.getInstance()?.webContents.send('previous-tab', true);
    }
    reopenClosedTab() {
        this.windowManager
            .getInstance()
            ?.webContents.send('reopen-closed-tab', true);
    }
    sendRequest() {
        this.windowManager.getInstance()?.webContents.send('send-request', true);
    }
    reloadDocs() {
        this.windowManager.getInstance()?.webContents.send('reload-docs', true);
    }
    showDocs() {
        this.windowManager.getInstance()?.webContents.send('show-docs', true);
    }
    showSettings() {
        this.windowManager.getInstance()?.webContents.send('show-settings', true);
    }
    importAppData() {
        const windowInstance = this.windowManager.getInstance();
        if (windowInstance) {
            (0, backup_1.importBackupData)(windowInstance);
        }
    }
    exportAppData() {
        this.windowManager.getInstance()?.webContents.send('export-app-data', true);
    }
    checkForUpdates(menuItem) {
        return (0, updates_1.checkForUpdates)(menuItem);
    }
    async showPreferences() {
        const prefWindow = new electron_1.BrowserWindow({
            width: 600,
            height: 600,
            minWidth: 500,
            minHeight: 200,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            // acceptFirstMouse: true,
            // titleBarStyle: 'hidden',
        });
        // and load the index.html of the app.
        try {
            return prefWindow.loadURL(url_1.default.format({
                // pathname: path.resolve(
                //   require.resolve('@altairgraphql/electron-settings')
                // ),
                pathname: path_1.default.resolve((0, electron_settings_static_1.getDistDirectory)(), 'index.html'),
                protocol: 'file:',
                slashes: true,
            }));
        }
        catch (err) {
            console.log('Error loading settings window', err);
        }
    }
}
exports.ActionManager = ActionManager;
//# sourceMappingURL=actions.js.map
//# debugId=e8fc9cb1-a20a-5ebf-8719-65959126602d
