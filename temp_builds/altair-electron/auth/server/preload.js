"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8c3a894c-32b8-53ca-bee1-da3d0fdc7730")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const index_1 = require("./index");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    setCustomToken: (token) => electron_1.ipcRenderer.send(index_1.IPC_SET_CUSTOM_TOKEN_EVENT, token),
});
//# sourceMappingURL=preload.js.map
//# debugId=8c3a894c-32b8-53ca-bee1-da3d0fdc7730
