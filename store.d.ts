import ElectronStore from 'electron-store';
export declare class InMemoryStore {
    data: Record<string, unknown>;
    constructor();
    /**
     * @param {string} key key to search for
     */
    get(key: string): unknown;
    /**
     * @param {string} key key of item
     * @param {any} val value of item
     */
    set(key: string, val: unknown): void;
    /**
     * @param {string} key key of item
     */
    delete(key: string): boolean;
}
export declare class PersistentStore<T extends Record<string, any> = Record<string, unknown>> extends ElectronStore<T> {
}
//# sourceMappingURL=store.d.ts.map