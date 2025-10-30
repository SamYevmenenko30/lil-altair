"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f0de7dc3-5a3e-5306-8c58-009cb9f240a2")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisableHardwareAcceleration = getDisableHardwareAcceleration;
exports.setDisableHardwareAcceleration = setDisableHardwareAcceleration;
exports.configureAppOnStartup = configureAppOnStartup;
const store_1 = require("../settings/main/store");
function disableHardwareAcceleration(app) {
    app.commandLine.appendSwitch('ignore-gpu-blacklist');
    app.commandLine.appendSwitch('disable-gpu');
    app.commandLine.appendSwitch('disable-gpu-compositing');
    app.disableHardwareAcceleration();
}
function getDisableHardwareAcceleration() {
    return store_1.store.get('disable_hardware_acceleration');
}
function setDisableHardwareAcceleration(value) {
    store_1.store.set('disable_hardware_acceleration', value);
}
function configureAppOnStartup(app) {
    if (store_1.store.get('disable_hardware_acceleration')) {
        disableHardwareAcceleration(app);
    }
}
//# sourceMappingURL=startup.js.map
//# debugId=f0de7dc3-5a3e-5306-8c58-009cb9f240a2
