import { IElectronAPI } from '../api';
export declare class ElectronLocalStorage implements Storage {
    electronApi: IElectronAPI;
    constructor();
    get length(): number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    [Symbol.iterator](): Generator<unknown[], void, unknown>;
}
export declare const electronLocalStorage: ElectronLocalStorage | undefined;
//# sourceMappingURL=electron-local-storage.d.ts.map