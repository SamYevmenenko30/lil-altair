"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b96dd018-385c-5dbc-9559-1f7fb6973c5d")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.initUpdateAvailableEvent = exports.initSettingsStoreEvents = void 0;
const electron_1 = require("electron");
const store_1 = require("./store");
const electron_updater_1 = require("electron-updater");
const electron_interop_1 = require("@altairgraphql/electron-interop");
const initSettingsStoreEvents = () => {
    electron_1.ipcMain.on(electron_interop_1.SETTINGS_STORE_EVENTS.GET_SETTINGS_DATA, e => {
        e.returnValue = store_1.store.get('settings');
    });
    electron_1.ipcMain.on(electron_interop_1.SETTINGS_STORE_EVENTS.UPDATE_SETTINGS_DATA, (e, value) => {
        e.returnValue = store_1.store.set('settings', value);
    });
};
exports.initSettingsStoreEvents = initSettingsStoreEvents;
const initUpdateAvailableEvent = (webContent) => {
    electron_updater_1.autoUpdater.on('update-available', () => {
        webContent.send(electron_interop_1.IPC_EVENT_NAMES.UPDATE_AVAILABLE);
    });
    electron_1.ipcMain.on(electron_interop_1.IPC_EVENT_NAMES.RENDERER_UPDATE_APP, () => {
        electron_updater_1.autoUpdater.downloadUpdate();
    });
};
exports.initUpdateAvailableEvent = initUpdateAvailableEvent;
//# sourceMappingURL=events.js.map
//# debugId=b96dd018-385c-5dbc-9559-1f7fb6973c5d
