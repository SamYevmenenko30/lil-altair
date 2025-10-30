import { RequestType, } from './types';
import { get, set } from 'object-path';
export const ModuleImports = {
    atob: {
        async exec() {
            return (await import('abab')).atob;
        },
    },
    btoa: {
        async exec() {
            return (await import('abab')).btoa;
        },
    },
    'crypto-js': {
        async exec() {
            return (await import('crypto-js')).default;
        },
    },
};
export const buildContextResponse = (data) => {
    if (data.response) {
        return {
            body: data.response.body,
            requestType: data.requestType ?? RequestType.QUERY,
            responseTime: data.response.responseTime,
            statusCode: data.response.status,
            headers: data.response.headers,
        };
    }
};
export const importModuleHelper = async (moduleName) => {
    const mod = ModuleImports[moduleName];
    if (!mod) {
        throw new Error(`No request script module found matching "${moduleName}"`);
    }
    return mod.exec();
};
export const getGlobalContext = (data, handlers) => {
    return {
        data,
        helpers: {
            getEnvironment: (key) => {
                // Support nested environment variable access using dot notation (e.g., 'user.name')
                return get(data.environment, key);
            },
            /**
             * @param key environment key (supports nested paths using dot notation, e.g., 'user.name')
             * @param val value to set
             * @param activeEnvironment if the value should be replaced in the currently active environment after execution
             */
            setEnvironment: (key, val, activeEnvironment = false) => {
                // Support nested environment variable setting using dot notation (e.g., 'user.name')
                set(data.environment, key, val);
                if (activeEnvironment) {
                    data.__toSetActiveEnvironment = data.__toSetActiveEnvironment ?? {};
                    set(data.__toSetActiveEnvironment, key, val);
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
        importModule: (moduleName) => importModuleHelper(moduleName),
        response: buildContextResponse(data),
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
//# sourceMappingURL=context.js.map