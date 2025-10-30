"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalContext = exports.importModuleHelper = exports.buildContextResponse = exports.ModuleImports = void 0;
const types_1 = require("./types");
const object_path_1 = require("object-path");
exports.ModuleImports = {
    atob: {
        async exec() {
            return (await Promise.resolve().then(() => __importStar(require('abab')))).atob;
        },
    },
    btoa: {
        async exec() {
            return (await Promise.resolve().then(() => __importStar(require('abab')))).btoa;
        },
    },
    'crypto-js': {
        async exec() {
            return (await Promise.resolve().then(() => __importStar(require('crypto-js')))).default;
        },
    },
};
const buildContextResponse = (data) => {
    if (data.response) {
        return {
            body: data.response.body,
            requestType: data.requestType ?? types_1.RequestType.QUERY,
            responseTime: data.response.responseTime,
            statusCode: data.response.status,
            headers: data.response.headers,
        };
    }
};
exports.buildContextResponse = buildContextResponse;
const importModuleHelper = async (moduleName) => {
    const mod = exports.ModuleImports[moduleName];
    if (!mod) {
        throw new Error(`No request script module found matching "${moduleName}"`);
    }
    return mod.exec();
};
exports.importModuleHelper = importModuleHelper;
const getGlobalContext = (data, handlers) => {
    return {
        data,
        helpers: {
            getEnvironment: (key) => {
                // Support nested environment variable access using dot notation (e.g., 'user.name')
                return (0, object_path_1.get)(data.environment, key);
            },
            /**
             * @param key environment key (supports nested paths using dot notation, e.g., 'user.name')
             * @param val value to set
             * @param activeEnvironment if the value should be replaced in the currently active environment after execution
             */
            setEnvironment: (key, val, activeEnvironment = false) => {
                // Support nested environment variable setting using dot notation (e.g., 'user.name')
                (0, object_path_1.set)(data.environment, key, val);
                if (activeEnvironment) {
                    data.__toSetActiveEnvironment = data.__toSetActiveEnvironment ?? {};
                    (0, object_path_1.set)(data.__toSetActiveEnvironment, key, val);
                }
            },
            getCookie: (key) => {
                return data.__cookieJar?.[key] ?? '';
            },
            setCookie: (key, value, options) => {
                handlers.setCookie(key, value, options);
            },
            request: async (arg1, arg2, arg3) => {
                return handlers.request(arg1, arg2, arg3);
            },
        },
        storage: {
            get: (key) => {
                return handlers.getStorageItem(key);
            },
            set: (key, value) => {
                return handlers.setStorageItem(key, value);
            },
        },
        importModule: (moduleName) => (0, exports.importModuleHelper)(moduleName),
        response: (0, exports.buildContextResponse)(data),
        log: (d) => {
            data.requestScriptLogs = data.requestScriptLogs ?? [];
            data.requestScriptLogs.push({
                id: crypto.randomUUID(),
                time: Date.now(),
                text: JSON.stringify(d, null, 2),
                source: 'Request script',
            });
        },
    };
};
exports.getGlobalContext = getGlobalContext;
//# sourceMappingURL=context.js.map