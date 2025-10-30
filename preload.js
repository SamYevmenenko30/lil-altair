"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const api_1 = require("./api");
const constants_1 = require("./constants");
electron_1.contextBridge.exposeInMainWorld(constants_1.electronApiKey, api_1.electronApi);
//# sourceMappingURL=preload.js.map