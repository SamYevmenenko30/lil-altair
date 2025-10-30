"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="00dab832-7692-5b31-9d93-07c59434abc1")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMultipleDataVersions = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
const fs_1 = require("fs");
const index_1 = require("./index");
const getUserDataParentPath = () => (0, path_1.resolve)(electron_1.app.getPath('userData'), '..');
const DIR_2_3_7 = 'altair';
const DIR_2_3_6 = 'altair-electron';
const DIR_ALL = 'Altair GraphQL Client';
const userDataVersions = [
    DIR_2_3_6, // v2.3.6
    DIR_2_3_7, // v2.3.7
    DIR_ALL, // all others
];
const checkMultipleDataVersions = (win) => {
    (0, index_1.getDirectoriesInDirectory)(getUserDataParentPath()).then(async (directories) => {
        const foundVersions = directories.filter((dir) => userDataVersions.includes(dir));
        if (foundVersions.length > 1) {
            console.log(foundVersions);
            const response = await electron_1.dialog.showMessageBox(win, {
                type: 'info',
                buttons: [
                    'This is the correct version',
                    'Clear this version',
                    'Remind me later',
                ],
                defaultId: 0,
                cancelId: 2,
                title: 'Multiple versions found',
                message: 'We found multiple versions of your Altair data',
                detail: `Due to some misconfiguration that happened in some of the recent versions of Altair, there are several versions of your data. We want to help you keep the right data.\n\nTo do that, check if the current data is correct, and we will clear out the rest.\n\nTip: You can click the 'Remind me later' and we'll ask again when you restart.`,
            });
            switch (response.response) {
                case 0: // Correct version
                    // Clear other data
                    foundVersions
                        .filter((v) => v !== DIR_ALL)
                        .forEach((version) => {
                        console.log('removing version', version);
                        // Delete DIR_2_3_6 and DIR_2_3_7
                        (0, index_1.deleteFolderRecursive)((0, path_1.resolve)(getUserDataParentPath(), version));
                    });
                    electron_1.app.relaunch();
                    electron_1.app.exit(0);
                    return;
                case 1: // clear THIS version
                    // Clear THIS data
                    const nextVersion = foundVersions.find((v) => v !== DIR_ALL);
                    if (nextVersion) {
                        console.log('next version', nextVersion);
                        // Delete DIR_ALL
                        (0, index_1.deleteFolderRecursive)((0, path_1.resolve)(getUserDataParentPath(), DIR_ALL));
                        // Move the next version (DIR_2_3_6 or DIR_2_3_7) to DIR_ALL
                        (0, fs_1.renameSync)((0, path_1.resolve)(getUserDataParentPath(), nextVersion), (0, path_1.resolve)(getUserDataParentPath(), DIR_ALL));
                        electron_1.app.relaunch();
                        electron_1.app.exit(0);
                    }
                    return;
                default:
                    // do nothing
                    console.log('Doing nothing.');
            }
        }
    });
};
exports.checkMultipleDataVersions = checkMultipleDataVersions;
//# sourceMappingURL=check-multi-data-versions.js.map
//# debugId=00dab832-7692-5b31-9d93-07c59434abc1
