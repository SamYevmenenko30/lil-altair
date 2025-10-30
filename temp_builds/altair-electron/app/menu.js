"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2bcf0242-b7fb-5d56-b628-f338f1fc5a44")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuManager = void 0;
const electron_1 = require("electron");
const startup_1 = require("../utils/startup");
const utils_1 = require("../utils");
class MenuManager {
    constructor(actionManager) {
        this.actionManager = actionManager;
        electron_1.Menu.setApplicationMenu(this.createMenu());
    }
    createMenu() {
        const isMac = process.platform === 'darwin';
        const template = [
            {
                label: electron_1.app.getName(),
                submenu: [
                    { role: 'about' },
                    {
                        label: 'Check for Updates...',
                        click: (menuItem) => this.actionManager.checkForUpdates(menuItem),
                    },
                    {
                        label: 'Preferences',
                        accelerator: 'Cmd+,',
                        click: () => this.actionManager.showSettings(),
                    },
                    {
                        label: 'Desktop settings...',
                        click: () => this.actionManager.showPreferences(),
                    },
                    ...(isMac
                        ? [
                            { type: 'separator' },
                            { role: 'services', submenu: [] },
                            { type: 'separator' },
                            { role: 'hide' },
                            { role: 'hideothers' },
                            { role: 'unhide' },
                        ]
                        : []),
                    { type: 'separator' },
                    { role: 'quit' },
                ],
            },
            {
                label: 'Edit',
                submenu: [
                    {
                        label: 'New Tab',
                        accelerator: 'CmdOrCtrl+T',
                        click: () => this.actionManager.createTab(),
                    },
                    {
                        label: 'Close Tab',
                        accelerator: 'CmdOrCtrl+W',
                        click: () => this.actionManager.closeTab(),
                    },
                    {
                        label: 'Reopen Closed Tab',
                        accelerator: 'CmdOrCtrl+Shift+T',
                        click: () => this.actionManager.reopenClosedTab(),
                    },
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    ...(isMac
                        ? [
                            { type: 'separator' },
                            {
                                label: 'Speech',
                                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
                            },
                        ]
                        : []),
                ],
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Next Tab',
                        accelerator: 'Ctrl+Tab',
                        click: () => this.actionManager.nextTab(),
                    },
                    {
                        label: 'Previous Tab',
                        accelerator: 'Ctrl+Shift+Tab',
                        click: () => this.actionManager.previousTab(),
                    },
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' },
                ],
            },
            {
                role: 'window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'close' },
                    (0, startup_1.getDisableHardwareAcceleration)()
                        ? {
                            label: 'Enable hardware acceleration (beta)',
                            click: () => {
                                (0, startup_1.setDisableHardwareAcceleration)(false);
                                (0, utils_1.restartApp)(electron_1.app);
                            },
                        }
                        : {
                            label: 'Disable hardware acceleration (beta)',
                            click: () => {
                                (0, startup_1.setDisableHardwareAcceleration)(true);
                                (0, utils_1.restartApp)(electron_1.app);
                            },
                        },
                    ...(isMac
                        ? [
                            { role: 'minimize' },
                            { type: 'separator' },
                            { role: 'front' },
                        ]
                        : [{ role: 'about' }]),
                ],
            },
            {
                label: 'Data',
                submenu: [
                    {
                        label: 'Export backup data...',
                        click: () => this.actionManager.exportAppData(),
                    },
                    {
                        label: 'Import backup data...',
                        click: () => this.actionManager.importAppData(),
                    },
                ],
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Open documentation',
                        click: async () => {
                            await electron_1.shell.openExternal('https://altairgraphql.dev/docs/');
                        },
                    },
                ],
            },
        ];
        return electron_1.Menu.buildFromTemplate(template);
    }
}
exports.MenuManager = MenuManager;
//# sourceMappingURL=menu.js.map
//# debugId=2bcf0242-b7fb-5d56-b628-f338f1fc5a44
