import ElectronStore from 'electron-store';
import { SettingStore } from '@altairgraphql/electron-interop';
import { SettingsState } from 'altair-static';
export declare const store: ElectronStore<SettingStore>;
export declare const altairSettingsStore: ElectronStore<SettingsState>;
export declare const persistedSettingsStore: ElectronStore<Record<string, unknown>>;
export declare const updateAltairSettingsOnFile: (data: SettingsState) => void;
export declare const getAltairSettingsFromFile: () => SettingsState | undefined;
export declare const getPersisedSettingsFromFile: () => Partial<import("altair-graphql-core/build/types/state/settings.interfaces").SettingsState> | undefined;
//# sourceMappingURL=store.d.ts.map