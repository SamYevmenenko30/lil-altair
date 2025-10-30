"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.electronLocalStorage = exports.ElectronLocalStorage = void 0;
class ElectronLocalStorage {
    electronApi;
    constructor() {
        if (!window.electronApi) {
            throw new Error('This can only be used in the electron environment');
        }
        this.electronApi = window.electronApi;
    }
    get length() {
        return this.electronApi.store.getLength() ?? 0;
    }
    clear() {
        return this.electronApi.store.clear();
    }
    getItem(key) {
        return this.electronApi.store.getItem(key);
    }
    key(index) {
        return this.electronApi.store.key(index);
    }
    removeItem(key) {
        return this.electronApi.store.removeItem(key);
    }
    setItem(key, value) {
        return this.electronApi.store.setItem(key, value);
    }
    *[Symbol.iterator]() {
        for (const [key, value] of Object.entries(this.electronApi.store.getStore())) {
            yield [key, value];
        }
    }
}
exports.ElectronLocalStorage = ElectronLocalStorage;
exports.electronLocalStorage = window.electronApi
    ? new ElectronLocalStorage()
    : undefined;
//# sourceMappingURL=electron-local-storage.js.map