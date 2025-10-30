"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.electronApi = void 0;
const electron_1 = require("electron");
const constants_1 = require("./constants");
const settings_1 = require("./settings");
const decodeError = (errObj) => {
    const e = new Error(errObj.message);
    e.name = errObj.name;
    Object.assign(e, errObj.extra);
    return e;
};
const invokeWithCustomErrors = async (channel, ...args) => {
    const { error, result } = await electron_1.ipcRenderer.invoke(channel, ...args);
    if (error) {
        throw decodeError(error);
    }
    return result;
};
exports.electronApi = {
    events: {
        onFileOpened(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.FILE_OPENED, (evt, data) => cb(data));
        },
        onUrlOpened(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.URL_OPENED, (evt, url) => cb(url));
        },
        onCertificateError(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.CERTIFICATE_ERROR, (evt, err) => cb(err));
        },
        onImportAppData(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.IMPORT_APP_DATA, (evt, data) => cb(data));
        },
        onExportAppData(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.EXPORT_APP_DATA, () => cb());
        },
        onCreateTab(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.CREATE_TAB, () => cb());
        },
        onCloseTab(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.CLOSE_TAB, () => cb());
        },
        onNextTab(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.NEXT_TAB, () => cb());
        },
        onPreviousTab(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.PREVIOUS_TAB, () => cb());
        },
        onReopenClosedTab(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.REOPEN_CLOSED_TAB, () => cb());
        },
        onSendRequest(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.SEND_REQUEST, () => cb());
        },
        onReloadDocs(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.RELOAD_DOCS, () => cb());
        },
        onShowDocs(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.SHOW_DOCS, () => cb());
        },
        onShowSettings(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.SHOW_SETTINGS, () => cb());
        },
        onUpdateAvailable(cb) {
            return electron_1.ipcRenderer.on(constants_1.IPC_EVENT_NAMES.UPDATE_AVAILABLE, () => cb());
        },
    },
    store: {
        clear() {
            electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.CLEAR);
        },
        getItem(key) {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.GET_ITEM, key);
        },
        key(index) {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.KEY_BY_INDEX, index);
        },
        removeItem(key) {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.REMOVE_ITEM, key);
        },
        setItem(key, value) {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.SET_ITEM, key, value);
        },
        getLength() {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.LENGTH);
        },
        getStore() {
            return electron_1.ipcRenderer.sendSync(constants_1.STORE_EVENTS.GET_STORE_OBJECT);
        },
    },
    actions: {
        rendererReady() {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_READY);
        },
        performAppUpdate() {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_UPDATE_APP);
        },
        restartApp() {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_RESTART_APP);
        },
        getAuthToken() {
            return invokeWithCustomErrors(constants_1.IPC_EVENT_NAMES.RENDERER_GET_AUTH_TOKEN);
        },
        getAutobackupData() {
            return invokeWithCustomErrors(constants_1.IPC_EVENT_NAMES.RENDERER_GET_AUTOBACKUP_DATA);
        },
        saveAutobackupData(data) {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_SAVE_AUTOBACKUP_DATA, data);
        },
        updateInteropState(state) {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_SET_INTEROP_APP_STATE, state);
        },
        updateInteropWindowState(windowId, state) {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_SET_INTEROP_WINDOW_STATE, windowId, state);
        },
        updateInteropActiveWindowIdState(windowId) {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_SET_INTEROP_ACTIVE_WINDOW_ID_STATE, windowId);
        },
        removeInteropWindowState(windowId) {
            return electron_1.ipcRenderer.send(constants_1.IPC_EVENT_NAMES.RENDERER_REMOVE_INTEROP_WINDOW_STATE, windowId);
        },
        getAltairAppSettingsFromFile() {
            return invokeWithCustomErrors(settings_1.SETTINGS_STORE_EVENTS.GET_ALTAIR_APP_SETTINGS);
        },
        updateAltairAppSettingsOnFile(settings) {
            return invokeWithCustomErrors(settings_1.SETTINGS_STORE_EVENTS.SET_ALTAIR_APP_SETTINGS, settings);
        },
    },
};
//# sourceMappingURL=api.js.map