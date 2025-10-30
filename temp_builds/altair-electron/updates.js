"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ac9f2f64-27fb-56da-9c06-3f106ed80039")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUpdates = exports.setupAutoUpdates = void 0;
const fs_1 = __importDefault(require("fs"));
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const electron_log_1 = __importDefault(require("electron-log"));
// const server = 'https://hazel-server-gufzwmrois.now.sh';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
// const CHECK_UPDATE_INTERVAL = 1000 * 60 * 15; // every 15 mins
let updater;
let isSilentCheck = true;
electron_updater_1.autoUpdater.autoDownload = false;
electron_updater_1.autoUpdater.on('error', (error) => {
    electron_1.dialog.showErrorBox('Error: ', !!error === null ? 'unknown' : (error.stack || error).toString());
});
electron_updater_1.autoUpdater.on('update-not-available', () => {
    if (!isSilentCheck) {
        electron_1.dialog.showMessageBox({
            title: 'No Updates',
            message: 'Current version is up-to-date.',
        });
    }
    if (updater) {
        updater.enabled = true;
        updater = undefined;
    }
});
electron_updater_1.autoUpdater.on('update-downloaded', () => {
    electron_1.dialog
        .showMessageBox({
        title: 'Install Updates',
        message: 'Updates downloaded, application will now exit to update.',
    })
        .then(() => {
        setImmediate(() => electron_updater_1.autoUpdater.quitAndInstall());
    });
});
const canUpdate = () => {
    // app.isPackaged does not work well (see #2114)
    // TODO: Figure out how to resolve the protected app access error
    const _au = electron_updater_1.autoUpdater;
    // Don't check for updates if update config is not found (auto-update via electron is not supported)
    return (_au.app &&
        _au.app.appUpdateConfigPath &&
        fs_1.default.existsSync(_au.app.appUpdateConfigPath));
};
const setupAutoUpdates = () => {
    if (!canUpdate()) {
        return;
    }
    electron_log_1.default.transports.file.level = 'info';
    electron_updater_1.autoUpdater.logger = electron_log_1.default;
    // autoUpdater.checkForUpdatesAndNotify();
    electron_updater_1.autoUpdater.checkForUpdates().catch((err) => console.error(err));
};
exports.setupAutoUpdates = setupAutoUpdates;
// autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Restart', 'Later'],
//     title: 'Install Updates',
//     message: process.platform === 'win32' ? releaseNotes : releaseName,
//     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//   };
//   dialog.showMessageBox(dialogOpts, (response) => {
//     if (response === 0) {
//       autoUpdater.quitAndInstall();
//     }
//   });
// });
const checkForUpdates = (menuItem) => {
    if (!canUpdate()) {
        return;
    }
    if (menuItem) {
        updater = menuItem;
        updater.enabled = false;
    }
    isSilentCheck = false;
    electron_updater_1.autoUpdater.checkForUpdates().catch((err) => console.error(err));
};
exports.checkForUpdates = checkForUpdates;
//# sourceMappingURL=updates.js.map
//# debugId=ac9f2f64-27fb-56da-9c06-3f106ed80039
