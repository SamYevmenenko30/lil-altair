export interface SettingStore {
    settings: {
        proxy_setting: 'none' | 'autodetect' | 'system' | 'pac' | 'proxy_server';
        pac_address?: string;
        proxy_host?: string;
        proxy_port?: string;
    };
    disable_hardware_acceleration: boolean;
}
export declare const settingsStoreFileName = "desktop_settings";
export declare const SETTINGS_STORE_EVENTS: {
    GET_SETTINGS_DATA: string;
    UPDATE_SETTINGS_DATA: string;
    GET_ALTAIR_APP_SETTINGS: string;
    SET_ALTAIR_APP_SETTINGS: string;
};
export declare const altairSettingsStoreFileName = "altair_settings";
//# sourceMappingURL=settings.d.ts.map