"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1cf12e26-b67b-597f-ac42-1fd1724da437")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
jest.mock('electron-store');
describe('InMemoryStore', () => {
    it('should create', () => {
        const store = new store_1.InMemoryStore();
        expect(store).toBeTruthy();
    });
    describe('.get', () => {
        it('should return undefined if key not found', () => {
            const store = new store_1.InMemoryStore();
            expect(store.get('unknown')).toBeUndefined();
        });
        it('should return value if key is found', () => {
            const store = new store_1.InMemoryStore();
            store.set('key1', 'value1');
            expect(store.get('key1')).toBe('value1');
        });
    });
    describe('.set', () => {
        it('should set the provided value with key', () => {
            const store = new store_1.InMemoryStore();
            store.set('item1', { object: 'value' });
            expect(store.get('item1')).toEqual({ object: 'value' });
        });
    });
    describe('.delete', () => {
        it('should remove the item matching key', () => {
            const store = new store_1.InMemoryStore();
            store.set('item1', { object: 'value' });
            store.delete('item1');
            expect(store.get('item1')).toBeUndefined();
        });
    });
});
//# sourceMappingURL=store.spec.js.map
//# debugId=1cf12e26-b67b-597f-ac42-1fd1724da437
