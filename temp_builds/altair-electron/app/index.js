"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="75178f76-97b0-54d7-b617-afd32721c7b2")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronApp = void 0;
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const updates_1 = require("../updates");
const store_1 = require("../store");
const window_1 = require("./window");
const store_2 = require("../settings/main/store");
const electron_interop_1 = require("@altairgraphql/electron-interop");
const log_1 = require("../utils/log");
const utils_1 = require("../utils");
class ElectronApp {
    constructor() {
        this.store = new store_1.InMemoryStore();
        this.windowManager = new window_1.WindowManager(this);
        const gotTheLock = electron_1.app.requestSingleInstanceLock();
        if (!gotTheLock) {
            (0, log_1.log)('An instance already exists.');
            electron_1.app.quit();
            return process.exit(0);
        }
        // https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app
        if (process.defaultApp) {
            if (process.argv.length >= 2) {
                electron_1.app.setAsDefaultProtocolClient(electron_interop_1.ALTAIR_CUSTOM_PROTOCOL, process.execPath, [
                    path_1.default.resolve(process.argv[1] ?? ''),
                ]);
            }
        }
        else {
            electron_1.app.setAsDefaultProtocolClient(electron_interop_1.ALTAIR_CUSTOM_PROTOCOL);
        }
        electron_1.protocol.registerSchemesAsPrivileged([
            {
                scheme: electron_interop_1.ALTAIR_CUSTOM_PROTOCOL,
                privileges: {
                    standard: true,
                    secure: true,
                    corsEnabled: true,
                    supportFetchAPI: true,
                },
            },
        ]);
        this.manageEvents();
    }
    async manageEvents() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        electron_1.app.whenReady().then(async () => {
            const settings = store_2.store.get('settings');
            (0, log_1.log)(settings);
            if (settings) {
                /**
                 * @type Electron.Config
                 */
                const proxyConfig = {
                    mode: 'direct',
                };
                switch (settings.proxy_setting) {
                    case 'none':
                        proxyConfig.mode = 'direct';
                        break;
                    case 'autodetect':
                        proxyConfig.mode = 'auto_detect';
                        break;
                    case 'system':
                        proxyConfig.mode = 'system';
                        break;
                    case 'pac':
                        proxyConfig.mode = 'pac_script';
                        proxyConfig.pacScript = settings.pac_address;
                        break;
                    case 'proxy_server':
                        proxyConfig.mode = 'fixed_servers';
                        proxyConfig.proxyRules = `${settings.proxy_host}:${settings.proxy_port}`;
                        break;
                    default:
                }
                await electron_1.session.defaultSession.setProxy(proxyConfig);
                const proxy = await electron_1.session.defaultSession.resolveProxy('http://localhost');
                (0, log_1.log)(proxy, proxyConfig);
            }
            try {
                await this.windowManager.createWindow();
            }
            catch (err) {
                (0, log_1.log)('Error creating window', err);
                electron_1.dialog.showErrorBox('Error creating window. Do you know what the issue is? Feel free to create a github issue', err);
                throw err;
            }
            if (!electron_is_dev_1.default) {
                (0, updates_1.setupAutoUpdates)();
            }
        });
        // Quit when all windows are closed.
        electron_1.app.on('window-all-closed', () => {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
        electron_1.app.on('activate', () => {
            if (!this.windowManager) {
                throw new Error('App not started');
            }
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (!this.windowManager.getInstance()) {
                this.windowManager.createWindow();
            }
        });
        // Handle the protocol. In this case, we choose to show an Error Box.
        electron_1.app.on('open-url', (event, url) => {
            this.handleOpenUrlEvent(url);
        });
        electron_1.app.on('second-instance', (event, argv) => {
            // Someone tried to run a second instance, we should focus our window.
            const windowInstance = this.windowManager.getInstance();
            if (windowInstance) {
                if (windowInstance.isMinimized()) {
                    windowInstance.restore();
                }
                windowInstance.focus();
            }
            const url = (0, utils_1.findCustomProtocolUrlInArgv)(argv);
            if (url) {
                this.handleOpenUrlEvent(url);
            }
        });
        electron_1.app.on('will-finish-launching', () => {
            electron_1.app.on('open-file', (ev, path) => {
                (0, fs_1.readFile)(path, 'utf8', (err, data) => {
                    if (err) {
                        return;
                    }
                    this.windowManager.sendMessage(electron_interop_1.IPC_EVENT_NAMES.FILE_OPENED, data);
                });
            });
        });
        electron_1.app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
            event.preventDefault();
            // Inform user of invalid certificate
            webContents.send('certificate-error', error);
            electron_1.dialog
                .showMessageBox({
                type: 'question',
                title: 'Invalid Certificate',
                message: `You are making a request with an invalid certificate. Do you want to continue? (URL: ${url}, Issuer: ${certificate.issuerName}, Subject: ${certificate.subjectName}, Error: ${error})`,
                buttons: ['Yes', 'No'],
            })
                .then((result) => {
                if (result.response === 0) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            });
        });
        electron_1.app.on('web-contents-created', (event, contents) => {
            contents.setWindowOpenHandler((details) => {
                try {
                    (0, log_1.log)('Opening url', details.url);
                    // Ask the operating system to open this event's url in the default browser.
                    const url = new URL(details.url);
                    const supportedProtocols = ['http:', 'https:', 'mailto:'];
                    if (!supportedProtocols.includes(url.protocol)) {
                        (0, log_1.log)('Unsupported protocol', url.protocol);
                        return { action: 'deny' };
                    }
                    // Allow popups to be opened in the app
                    if (details.features.includes('popup')) {
                        // session cache should be cleared for popup windows
                        return {
                            action: 'allow',
                            overrideBrowserWindowOptions: {
                                webPreferences: {
                                    partition: 'popup',
                                },
                            },
                        };
                    }
                    electron_1.shell.openExternal(url.href);
                }
                catch (err) {
                    (0, log_1.log)('Error opening url', err);
                }
                return { action: 'deny' };
            });
        });
        electron_1.app.on('render-process-gone', (event, webContents, details) => {
            (0, log_1.error)('Render process gone', details);
        });
        electron_1.app.on('child-process-gone', (event, details) => {
            (0, log_1.error)('Child process gone', details);
        });
    }
    handleOpenUrlEvent(url) {
        (0, log_1.log)('App opened from url', url);
        this.windowManager.sendMessage(electron_interop_1.IPC_EVENT_NAMES.URL_OPENED, url);
    }
}
exports.ElectronApp = ElectronApp;
//# sourceMappingURL=index.js.map
//# debugId=75178f76-97b0-54d7-b617-afd32721c7b2
