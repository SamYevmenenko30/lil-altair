"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="13eaf8a5-4c92-5ac5-8fc4-a2c797e4c154")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentStore = exports.InMemoryStore = void 0;
const electron_store_1 = __importDefault(require("electron-store"));
class InMemoryStore {
    constructor() {
        this.data = {};
    }
    /**
     * @param {string} key key to search for
     */
    get(key) {
        return this.data[key];
    }
    /**
     * @param {string} key key of item
     * @param {any} val value of item
     */
    set(key, val) {
        this.data[key] = val;
    }
    /**
     * @param {string} key key of item
     */
    delete(key) {
        return Reflect.deleteProperty(this.data, key);
    }
}
exports.InMemoryStore = InMemoryStore;
class PersistentStore extends electron_store_1.default {
}
exports.PersistentStore = PersistentStore;
//# sourceMappingURL=store.js.map
//# debugId=13eaf8a5-4c92-5ac5-8fc4-a2c797e4c154
