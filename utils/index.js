"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a96312ab-2cd0-5c43-ba63-f3562c326516")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWithCustomErrors = exports.getStaticDirectory = exports.deleteFolderRecursive = exports.getDirectoriesInDirectory = void 0;
exports.findCustomProtocolUrlInArgv = findCustomProtocolUrlInArgv;
exports.restartApp = restartApp;
/* eslint-disable no-sync */
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const path_1 = require("path");
const electron_1 = require("electron");
const electron_interop_1 = require("@altairgraphql/electron-interop");
const getDirectoriesInDirectory = (path) => {
    return new Promise((resolve, reject) => {
        (0, fs_1.readdir)(path, { withFileTypes: true }, (err, dirents) => err
            ? reject(err)
            : resolve(dirents
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)));
    });
};
exports.getDirectoriesInDirectory = getDirectoriesInDirectory;
const deleteFolderRecursive = (path) => {
    if (fs_2.default.existsSync(path)) {
        fs_2.default.readdirSync(path).forEach((file) => {
            const curPath = (0, path_1.join)(path, file);
            if (fs_2.default.lstatSync(curPath).isDirectory()) {
                // recurse
                (0, exports.deleteFolderRecursive)(curPath);
            }
            else {
                // delete file
                fs_2.default.unlinkSync(curPath);
            }
        });
        fs_2.default.rmdirSync(path);
    }
};
exports.deleteFolderRecursive = deleteFolderRecursive;
const getStaticDirectory = () => {
    return (0, path_1.join)(__dirname, '../../static');
};
exports.getStaticDirectory = getStaticDirectory;
const encodeError = (e) => {
    return { name: e.name, message: e.message, extra: { ...e } };
};
const handleWithCustomErrors = (channel, handler) => {
    electron_1.ipcMain.handle(channel, async (...args) => {
        try {
            return { result: await Promise.resolve(handler(...args)) };
        }
        catch (e) {
            if (e instanceof Error) {
                return { error: encodeError(e) };
            }
            return { error: { name: 'unknown error', message: 'unknown error' } };
        }
    });
};
exports.handleWithCustomErrors = handleWithCustomErrors;
// We don't know the exact position of the URL is in argv. Chromium might inject its own arguments
// into argv. See https://www.electronjs.org/docs/latest/api/app#event-second-instance.
function findCustomProtocolUrlInArgv(argv) {
    return argv.find((arg) => arg.startsWith(`${electron_interop_1.ALTAIR_CUSTOM_PROTOCOL}://`));
}
function restartApp(app) {
    app.relaunch();
    app.exit();
}
//# sourceMappingURL=index.js.map
//# debugId=a96312ab-2cd0-5c43-ba63-f3562c326516
