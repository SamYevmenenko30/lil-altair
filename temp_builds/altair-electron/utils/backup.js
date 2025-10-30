"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="93be8615-c7da-568b-a42c-e61848f81468")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBackupData = exports.getAutobackup = exports.setAutobackup = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const fs_1 = __importDefault(require("fs"));
const setAutobackup = (data) => {
    const backupStore = new electron_store_1.default({ name: 'autobackup' });
    backupStore.set('autobackup', data);
};
exports.setAutobackup = setAutobackup;
const getAutobackup = () => {
    const backupStore = new electron_store_1.default({ name: 'autobackup' });
    return backupStore.get('autobackup');
};
exports.getAutobackup = getAutobackup;
const importBackupData = (instance) => {
    // const store = new PersistentStore();
    electron_1.dialog
        .showOpenDialog(instance, {
        title: 'Import application data',
        message: 'Only import a valid Altair backup file',
        properties: ['openFile'],
        filters: [{ name: 'Altair GraphQL Backup Files', extensions: ['agbkp'] }],
    })
        .then(({ canceled, filePaths: [filePath] }) => {
        if (canceled) {
            return;
        }
        if (filePath) {
            const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
            try {
                instance.webContents.send('import-app-data', fileContent);
            }
            catch (error) {
                electron_1.dialog.showErrorBox('Invalid file', 'The selected file is either invalid or corrupted. Please check the file and try again.');
            }
        }
    });
};
exports.importBackupData = importBackupData;
//# sourceMappingURL=backup.js.map
//# debugId=93be8615-c7da-568b-a42c-e61848f81468
