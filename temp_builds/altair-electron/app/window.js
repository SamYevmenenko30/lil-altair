"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="625442b7-4189-5173-9439-ed71cebc322e")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowManager = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const fs_1 = require("fs");
const mime_types_1 = __importDefault(require("mime-types"));
const electron_window_state_1 = __importDefault(require("electron-window-state"));
const altair_static_1 = require("altair-static");
const check_multi_data_versions_1 = require("../utils/check-multi-data-versions");
const csp_hash_1 = require("../utils/csp-hash");
const main_store_events_1 = require("../electron-store-adapter/main-store-events");
const events_1 = require("../settings/main/events");
const menu_1 = require("./menu");
const actions_1 = require("./actions");
const touchbar_1 = require("./touchbar");
const index_1 = require("../utils/index");
const index_2 = require("../auth/server/index");
const backup_1 = require("../utils/backup");
const electron_interop_1 = require("@altairgraphql/electron-interop");
const validate_settings_1 = __importDefault(require("altair-graphql-core/build/typegen/validate-settings"));
const log_1 = require("../utils/log");
const store_1 = require("../settings/main/store");
const csp_1 = require("../utils/csp");
const constants_1 = require("../constants");
const interop_state_manager_1 = require("../interop-state-manager");
class WindowManager {
    constructor(electronApp) {
        this.electronApp = electronApp;
        this.ipcEventsInitialized = false;
        this.sessionEventsInitialized = false;
        this.rendererReady = new Promise((resolve) => {
            electron_1.ipcMain.once(electron_interop_1.IPC_EVENT_NAMES.RENDERER_READY, () => {
                resolve(true);
            });
        });
    }
    getInstance() {
        return this.instance;
    }
    async createWindow() {
        await electron_1.app.whenReady();
        this.registerProtocol();
        // Load the previous state with fallback to defaults
        this.mainWindowState = (0, electron_window_state_1.default)({
            defaultWidth: 1280,
            defaultHeight: 800,
        });
        // Create the browser window.
        this.instance = new electron_1.BrowserWindow({
            show: false, // show when ready
            x: this.mainWindowState.x,
            y: this.mainWindowState.y,
            width: this.mainWindowState.width,
            height: this.mainWindowState.height,
            webPreferences: {
                /**
                 * Disables the same-origin policy.
                 * Altair would be used to make requests to different endpoints, as a developer tool.
                 * Other security measures are put in place, such as CSP to ensure the app content is secure.
                 */
                webSecurity: false,
                allowRunningInsecureContent: false,
                nodeIntegration: false,
                nodeIntegrationInWorker: false,
                contextIsolation: true,
                // enableRemoteModule: process.env.NODE_ENV === "test", // remote required for spectron tests to work
                preload: require.resolve('@altairgraphql/electron-interop/build/preload.js'), // path.join(__dirname, '../preload', 'index.js'),
                sandbox: false,
            },
            // titleBarStyle: 'hidden-inset'
        });
        // Let us register listeners on the window, so we can update the state
        // automatically (the listeners will be removed when the window is closed)
        // and restore the maximized or full screen state
        this.mainWindowState.manage(this.instance);
        this.interopStateManager = new interop_state_manager_1.InteropStateManager();
        // Populate the application menu
        this.actionManager = new actions_1.ActionManager(this);
        this.menuManager = new menu_1.MenuManager(this.actionManager);
        // Set the touchbar
        this.touchbarManager = new touchbar_1.TouchbarManager(this.actionManager, this.interopStateManager);
        this.instance.setTouchBar(this.touchbarManager.createTouchBar());
        // and load the index.html of the app.
        this.instance.loadURL(url_1.default.format({
            pathname: '-',
            protocol: `${electron_interop_1.ALTAIR_CUSTOM_PROTOCOL}:`,
            slashes: true,
        }));
        this.manageEvents();
    }
    sendMessage(channel, ...args) {
        // Listen for the renderer ready event,
        // then perform any pending actions
        this.rendererReady.then(() => {
            const instance = this.getInstance();
            if (instance) {
                instance.webContents.send(channel, ...args);
            }
        });
    }
    manageEvents() {
        (0, main_store_events_1.initMainProcessStoreEvents)();
        (0, events_1.initSettingsStoreEvents)();
        this.initInstanceEvents();
        this.initSessionEvents();
        this.initIpcEvents();
    }
    initIpcEvents() {
        // ipcMain events should only be initialized once
        if (this.ipcEventsInitialized) {
            return;
        }
        this.ipcEventsInitialized = true;
        electron_1.ipcMain.on(electron_interop_1.IPC_EVENT_NAMES.RENDERER_RESTART_APP, () => {
            electron_1.app.relaunch();
            electron_1.app.exit();
        });
        electron_1.ipcMain.handle('reload-window', (e) => {
            e.sender.reload();
        });
        electron_1.ipcMain.on(electron_interop_1.IPC_EVENT_NAMES.RENDERER_SAVE_AUTOBACKUP_DATA, (e, data) => {
            (0, backup_1.setAutobackup)(data);
        });
        electron_1.ipcMain.on(electron_interop_1.IPC_EVENT_NAMES.RENDERER_SET_INTEROP_APP_STATE, (e, interopAppState) => {
            this.interopStateManager?.setState(interopAppState);
        });
        (0, index_1.handleWithCustomErrors)(electron_interop_1.IPC_EVENT_NAMES.RENDERER_GET_AUTH_TOKEN, async (e) => {
            if (!e.sender || e.sender !== this.instance?.webContents) {
                throw new Error('untrusted source trying to get auth token');
            }
            const authServer = new index_2.AuthServer();
            return authServer.getCustomToken();
        });
        (0, index_1.handleWithCustomErrors)(electron_interop_1.IPC_EVENT_NAMES.RENDERER_GET_AUTOBACKUP_DATA, async (e) => {
            if (!e.sender || e.sender !== this.instance?.webContents) {
                throw new Error('untrusted source');
            }
            return (0, backup_1.getAutobackup)();
        });
        (0, index_1.handleWithCustomErrors)(electron_interop_1.SETTINGS_STORE_EVENTS.GET_ALTAIR_APP_SETTINGS, async (e) => {
            if (!e.sender || e.sender !== this.instance?.webContents) {
                throw new Error('untrusted source');
            }
            return (0, store_1.getAltairSettingsFromFile)();
        });
        (0, index_1.handleWithCustomErrors)(electron_interop_1.SETTINGS_STORE_EVENTS.SET_ALTAIR_APP_SETTINGS, async (e, data) => {
            if (!e.sender || e.sender !== this.instance?.webContents) {
                throw new Error('untrusted source');
            }
            // Validate data is a SettingsState
            if ((0, validate_settings_1.default)(data)) {
                return (0, store_1.updateAltairSettingsOnFile)(data);
            }
            (0, log_1.error)('Invalid settings data, not saving to file', data);
        });
    }
    initSessionEvents() {
        // session events should only be initialized once
        if (this.sessionEventsInitialized) {
            return;
        }
        this.sessionEventsInitialized = true;
        if (process.env.NODE_ENV /* === 'test'*/) {
            electron_1.session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
                (0, log_1.log)('Before request:', details);
                if (details.uploadData) {
                    details.uploadData.forEach((uploadData) => {
                        (0, log_1.log)('Data sent:', uploadData.bytes.toString());
                    });
                }
                callback({
                    cancel: false,
                });
            });
        }
        electron_1.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
            // Set defaults
            details.requestHeaders.Origin = 'electron://altair';
            // log(this.requestHeaders);
            (0, log_1.log)('sending headers', details.requestHeaders);
            // Set the request headers
            const windowId = details.requestHeaders[electron_interop_1.ALTAIR_WINDOW_ID_HEADER] ??
                this.interopStateManager?.getState().activeWindowId;
            const headers = windowId
                ? this.interopStateManager?.getWindowState(windowId)?.headers ?? []
                : [];
            // Remove the altair window id header before sending the request
            delete details.requestHeaders[electron_interop_1.ALTAIR_WINDOW_ID_HEADER];
            headers.forEach((header) => {
                if (electron_interop_1.ELECTRON_ALLOWED_FORBIDDEN_HEADERS.includes(header.key.toLowerCase()) &&
                    header.enabled &&
                    header.key &&
                    header.value) {
                    details.requestHeaders[header.key] = header.value;
                }
            });
            (0, log_1.log)('Final request headers', details.requestHeaders);
            callback({
                cancel: false,
                requestHeaders: details.requestHeaders,
            });
        });
        if (process.env.NODE_ENV /* === 'test'*/) {
            electron_1.session.defaultSession.webRequest.onSendHeaders((details) => {
                if (details.requestHeaders) {
                    Object.keys(details.requestHeaders).forEach((headerKey) => {
                        (0, log_1.log)('Header sent:', headerKey, details.requestHeaders[headerKey]);
                    });
                }
            });
        }
        electron_1.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
            try {
                const u = new url_1.default.URL(details.url);
                // we only want to set the CSP for the altair custom protocol
                if (u.protocol !== electron_interop_1.ALTAIR_CUSTOM_PROTOCOL + ':') {
                    return callback({ responseHeaders: details.responseHeaders });
                }
                // Allow iframe-sandbox to load without CSP
                if (u.pathname.includes('/iframe-sandbox')) {
                    return callback({ responseHeaders: details.responseHeaders });
                }
            }
            catch {
                // Do nothing
            }
            if (['mainFrame', 'subFrame'].includes(details.resourceType)) {
                // Set the CSP
                const initialSnippet = (0, altair_static_1.renderInitSnippet)(this.getRenderOptions());
                const scriptSrc = [
                    `'self'`,
                    `'sha256-1Sj1x3xsk3UVwnakQHbO0yQ3Xm904avQIfGThrdrjcc='`,
                    `'${(0, csp_hash_1.createSha256CspHash)(initialSnippet)}'`,
                    `https://cdn.jsdelivr.net`,
                    `localhost:*`,
                    `file:`,
                ];
                const additionalHeaders = {
                    // TODO: Figure out why an error from this breaks devtools
                    'Content-Security-Policy': [
                        (0, csp_1.cspAsString)({
                            'script-src': scriptSrc,
                            'object-src': ["'self'"],
                            'report-uri': [constants_1.SENTRY_CSP_REPORT_URI],
                            'report-to': ['csp-endpoint'],
                        }),
                    ],
                    'Report-To': JSON.stringify({
                        group: 'csp-endpoint',
                        max_age: 10886400, // 3 months
                        endpoints: [
                            {
                                url: constants_1.SENTRY_CSP_REPORT_URI,
                            },
                        ],
                        include_subdomains: true,
                    }),
                    'Reporting-Endpoints': `csp-endpoint="${constants_1.SENTRY_CSP_REPORT_URI}"`,
                };
                return callback({
                    responseHeaders: {
                        ...details.responseHeaders,
                        ...additionalHeaders, // Additional headers
                    },
                });
            }
            callback({ responseHeaders: details.responseHeaders });
        });
    }
    initInstanceEvents() {
        if (!this.instance) {
            throw new Error('Instance must be initialized before attempting to manage events');
        }
        (0, events_1.initUpdateAvailableEvent)(this.instance.webContents);
        // Prevent the app from navigating away from the app
        this.instance.webContents.on('will-navigate', (e) => e.preventDefault());
        // Emitted when the window is closed.
        this.instance.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.instance = undefined;
        });
        this.instance.on('ready-to-show', () => {
            if (!this.instance) {
                throw new Error('instance not created!');
            }
            this.instance.show();
            this.instance.focus();
            (0, check_multi_data_versions_1.checkMultipleDataVersions)(this.instance);
        });
        this.instance.webContents.on('render-process-gone', (e, details) => {
            (0, log_1.error)('render process gone', details);
        });
    }
    registerProtocol() {
        if (electron_1.protocol.isProtocolHandled(electron_interop_1.ALTAIR_CUSTOM_PROTOCOL)) {
            return;
        }
        /**
         * Using a custom buffer protocol, instead of a file protocol because of restrictions with the file protocol.
         */
        electron_1.protocol.handle(electron_interop_1.ALTAIR_CUSTOM_PROTOCOL, async (request) => {
            const requestDirectory = (0, altair_static_1.getDistDirectory)();
            const originalFilePath = path_1.default.join(requestDirectory, new url_1.default.URL(request.url).pathname);
            const indexPath = path_1.default.join(requestDirectory, 'index.html');
            (0, log_1.log)('index path', indexPath);
            const { mimeType, data } = await this.getFileContentData(originalFilePath, indexPath);
            return new Response(new Blob([new Uint8Array(data)]), // Convert Buffer to Uint8Array for Blob
            { headers: { 'content-type': mimeType } });
        });
    }
    async getFilePath(filePath) {
        (0, log_1.log)('file..', filePath);
        if (!filePath) {
            return '';
        }
        if (filePath.endsWith('.map')) {
            return filePath;
        }
        const stats = await fs_1.promises.stat(filePath);
        if (stats.isFile()) {
            return filePath;
        }
        if (stats.isDirectory()) {
            return this.getFilePath(path_1.default.join(filePath, 'index.html'));
        }
        return '';
    }
    /**
     * @param {string} originalFilePath path to file
     * @param {string} fallbackPath usually path to index file
     */
    async getFileContentData(originalFilePath, fallbackPath) {
        let filePath = await this.getFilePath(originalFilePath);
        if (!filePath) {
            filePath = fallbackPath;
        }
        if (filePath?.endsWith('.map')) {
            return {
                mimeType: 'text/plain',
                data: Buffer.from('{"version": 3, "file": "index.module.js", "sources": [], "sourcesContent": [], "names": [], "mappings":""}'),
            };
        }
        // some files are binary files, eg. font, so don't encode utf8
        let data = await fs_1.promises.readFile(filePath);
        if (filePath === fallbackPath) {
            data = Buffer.from((0, altair_static_1.renderAltair)(this.getRenderOptions()), 'utf-8');
        }
        // Load the data from the file into a buffer and pass it to the callback
        // Using the mime package to get the mime type for the file, based on the file name
        return {
            mimeType: mime_types_1.default.lookup(filePath) || '',
            data,
        };
    }
    getRenderOptions() {
        return {
            persistedSettings: (0, store_1.getPersisedSettingsFromFile)(),
        };
    }
}
exports.WindowManager = WindowManager;
//# sourceMappingURL=window.js.map
//# debugId=625442b7-4189-5173-9439-ed71cebc322e
