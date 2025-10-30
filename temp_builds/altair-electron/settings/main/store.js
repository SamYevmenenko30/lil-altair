"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2af35ff3-2082-5abd-9aea-ea725c6096e6")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersisedSettingsFromFile = exports.getAltairSettingsFromFile = exports.updateAltairSettingsOnFile = exports.persistedSettingsStore = exports.altairSettingsStore = exports.store = void 0;
const electron_store_1 = __importDefault(require("electron-store"));
const electron_interop_1 = require("@altairgraphql/electron-interop");
const validate_partial_settings_1 = __importDefault(require("altair-graphql-core/build/typegen/validate-partial-settings"));
exports.store = new electron_store_1.default({
    name: electron_interop_1.settingsStoreFileName,
    defaults: {
        settings: {
            proxy_setting: 'none',
        },
        disable_hardware_acceleration: false,
    },
});
exports.altairSettingsStore = new electron_store_1.default({
    name: electron_interop_1.altairSettingsStoreFileName,
});
exports.persistedSettingsStore = new electron_store_1.default({
    name: 'persisted_settings',
});
const updateAltairSettingsOnFile = (data) => {
    exports.altairSettingsStore.store = data;
};
exports.updateAltairSettingsOnFile = updateAltairSettingsOnFile;
const getAltairSettingsFromFile = () => {
    return exports.altairSettingsStore.store;
};
exports.getAltairSettingsFromFile = getAltairSettingsFromFile;
const getPersisedSettingsFromFile = () => {
    const data = exports.persistedSettingsStore.store;
    // Validate settings
    if ((0, validate_partial_settings_1.default)(data)) {
        return data;
    }
};
exports.getPersisedSettingsFromFile = getPersisedSettingsFromFile;
//# sourceMappingURL=store.js.map
//# debugId=2af35ff3-2082-5abd-9aea-ea725c6096e6
