"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5acb48c0-2bf7-50bd-b200-d25297e615e3")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.initMainProcessStoreEvents = void 0;
const electron_interop_1 = require("@altairgraphql/electron-interop");
const electron_1 = require("electron");
const store_1 = require("../store");
const initMainProcessStoreEvents = () => {
    const store = new store_1.PersistentStore();
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.LENGTH, e => {
        e.returnValue = store.size;
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.CLEAR, e => {
        e.returnValue = store.clear();
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.GET_ITEM, (e, key) => {
        e.returnValue = store.get(key);
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.KEY_BY_INDEX, (e, index) => {
        const key = Object.keys(store.store)[index];
        e.returnValue = key || null;
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.REMOVE_ITEM, (e, key) => {
        e.returnValue = store.delete(key);
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.SET_ITEM, (e, key, value) => {
        e.returnValue = store.set(key, value);
    });
    electron_1.ipcMain.on(electron_interop_1.STORE_EVENTS.GET_STORE_OBJECT, e => {
        e.returnValue = store.store;
    });
};
exports.initMainProcessStoreEvents = initMainProcessStoreEvents;
//# sourceMappingURL=main-store-events.js.map
//# debugId=5acb48c0-2bf7-50bd-b200-d25297e615e3
