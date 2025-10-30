"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAltairConfig = exports.setAltairConfig = exports.AltairConfig = void 0;
const crx_1 = require("../crx");
const types_1 = require("../request/types");
const is_electron_1 = __importDefault(require("../utils/is_electron"));
const urls_1 = require("./urls");
const isTranslateMode = window.__ALTAIR_TRANSLATE__;
const parseUrl = (url) => {
    try {
        return new URL(url);
    }
    catch (e) {
        return;
    }
};
class AltairConfig {
    constructor({ endpointURL, subscriptionsEndpoint, subscriptionsProtocol, initialQuery, initialHeaders, initialEnvironments, initialVariables, initialPreRequestScript, initialPostRequestScript = '', instanceStorageNamespace, initialSettings, persistedSettings, initialRequestHandlerId = types_1.HTTP_HANDLER_ID, initialRequestHandlerAdditionalParams = {}, initialSubscriptionRequestHandlerId = types_1.WEBSOCKET_HANDLER_ID, initialSubscriptionsPayload = {}, initialHttpMethod = 'POST', preserveState = true, initialWindows = [], disableAccount = false, initialAuthorization, cspNonce = '', } = {}) {
        this.useLocalSandboxUrl = false;
        this.donation = {
            url: 'https://opencollective.com/altair/donate',
            action_count_threshold: 50,
        };
        this.ga = 'UA-41432833-6';
        this.add_query_depth_limit = 3;
        this.tab_size = 2;
        this.max_windows = is_electron_1.default ? 50 : 15;
        this.default_language = isTranslateMode ? 'ach-UG' : 'en-US';
        this.languages = {
            'en-US': 'English',
            'fr-FR': 'French',
            'es-ES': 'Español',
            'cs-CZ': 'Czech',
            'de-DE': 'German',
            'pt-BR': 'Brazilian',
            'ru-RU': 'Russian',
            'uk-UA': 'Ukrainian',
            'zh-CN': 'Chinese Simplified',
            'ja-JP': 'Japanese',
            'sr-SP': 'Serbian',
            'it-IT': 'Italian',
            'pl-PL': 'Polish',
            'ko-KR': 'Korean',
            'ro-RO': 'Romanian',
            'vi-VN': 'Vietnamese',
        };
        this.query_history_depth = is_electron_1.default ? 100 : 15;
        this.disableLineNumbers = false;
        this.defaultTheme = 'system';
        this.themes = ['light', 'dark', 'dracula', 'system'];
        this.isTranslateMode = isTranslateMode;
        this.isWebApp = window.__ALTAIR_WEB_APP__;
        this.cspNonce = '';
        this.initialData = {
            url: '',
            subscriptionsEndpoint: '',
            subscriptionsProtocol: '',
            query: '',
            variables: '',
            // Force type of header, since initial value inference is wrong
            headers: null,
            environments: {},
            preRequestScript: '',
            postRequestScript: '',
            instanceStorageNamespace: 'altair_',
            settings: undefined,
            persistedSettings: undefined,
            initialSubscriptionRequestHandlerId: undefined,
            initialSubscriptionsPayload: {},
            initialRequestHandlerId: types_1.HTTP_HANDLER_ID,
            initialRequestHandlerAdditionalParams: {},
            initialHttpMethod: 'POST',
            preserveState: true,
            windows: [],
            disableAccount: false,
            initialAuthorization: undefined,
        };
        this.cspNonce = cspNonce;
        this.initialData.url =
            window.__ALTAIR_ENDPOINT_URL__ ?? endpointURL ?? '';
        this.initialData.subscriptionsEndpoint =
            window.__ALTAIR_SUBSCRIPTIONS_ENDPOINT__ ??
                subscriptionsEndpoint ??
                '';
        this.initialData.subscriptionsProtocol = subscriptionsProtocol ?? '';
        this.initialData.query =
            window.__ALTAIR_INITIAL_QUERY__ ?? initialQuery ?? '';
        this.initialData.variables =
            window.__ALTAIR_INITIAL_VARIABLES__ ?? initialVariables ?? '';
        this.initialData.headers =
            window.__ALTAIR_INITIAL_HEADERS__ ?? initialHeaders ?? '';
        this.initialData.environments = initialEnvironments ?? {};
        this.initialData.preRequestScript =
            window.__ALTAIR_INITIAL_PRE_REQUEST_SCRIPT__ ??
                initialPreRequestScript ??
                '';
        this.initialData.postRequestScript = initialPostRequestScript;
        this.initialData.instanceStorageNamespace =
            window.__ALTAIR_INSTANCE_STORAGE_NAMESPACE__ ??
                instanceStorageNamespace ??
                'altair_';
        this.initialData.settings = initialSettings;
        this.initialData.persistedSettings = persistedSettings;
        this.initialData.initialSubscriptionRequestHandlerId =
            initialSubscriptionRequestHandlerId;
        this.initialData.initialSubscriptionsPayload = initialSubscriptionsPayload;
        this.initialData.initialRequestHandlerId = initialRequestHandlerId;
        this.initialData.initialRequestHandlerAdditionalParams =
            initialRequestHandlerAdditionalParams;
        this.initialData.initialHttpMethod = initialHttpMethod;
        this.initialData.preserveState = preserveState;
        this.initialData.windows = initialWindows;
        this.initialData.disableAccount = disableAccount;
        this.initialData.initialAuthorization = initialAuthorization;
    }
    getPossibleLocalSandBoxRoot() {
        if (crx_1.isExtension) {
            // we only support mv3 extensions now
            // and mv3 extensions doesn't allow using iframe
            // sandbox with allow-same-origin so we have to open up
            // the postMessage without origin verification
            // This doesn't sit well with me, so for now we don't
            // support local sandbox for extensions.
            // We can revisit this later if needed.
            return;
        }
        // check document base url
        if (document.baseURI &&
            parseUrl(document.baseURI)?.origin === window.location.origin) {
            // add iframe-sandbox path to base url
            if (document.baseURI.endsWith('/')) {
                return new URL(document.baseURI + 'iframe-sandbox');
            }
            else {
                // remove the last part of the url
                return new URL(document.baseURI.slice(0, document.baseURI.lastIndexOf('/') + 1) +
                    'iframe-sandbox');
            }
        }
    }
    async getLocalSandBoxUrl() {
        if (typeof this.localSandboxUrl === 'undefined') {
            const localSandboxRoot = this.getPossibleLocalSandBoxRoot()?.href ?? '';
            if (localSandboxRoot) {
                this.localSandboxUrl = localSandboxRoot + '/index.html';
                const localSandboxTestUrl = localSandboxRoot + '/sandbox.png';
                const res = await fetch(localSandboxTestUrl);
                if (res.ok) {
                    this.useLocalSandboxUrl = true;
                }
            }
        }
        if (this.useLocalSandboxUrl) {
            return this.localSandboxUrl;
        }
    }
    getUrlConfig(environment = 'production') {
        return urls_1.urlMap[environment];
    }
    async getUrlConfigWithLocal(environment = 'production') {
        // Check for local sandbox url first
        const localSandboxUrl = await this.getLocalSandBoxUrl();
        const urls = urls_1.urlMap[environment];
        if (localSandboxUrl) {
            urls.sandbox = localSandboxUrl;
        }
        return urls;
    }
    async getUrl(name, environment = 'production') {
        const urlConfig = await this.getUrlConfigWithLocal(environment);
        return urlConfig[name];
    }
}
exports.AltairConfig = AltairConfig;
let config = new AltairConfig();
const setAltairConfig = (_config) => {
    config = _config;
};
exports.setAltairConfig = setAltairConfig;
const getAltairConfig = () => {
    return config;
};
exports.getAltairConfig = getAltairConfig;
window.getAltairConfig = exports.getAltairConfig;
//# sourceMappingURL=index.js.map