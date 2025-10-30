/**
 * Defines the repository of the plugin.
 * Used to know where to get the plugin from.
 */
export declare enum PluginSource {
    NPM = "npm",
    GITHUB = "github",
    URL = "url"
}
/**
 * Specifies the type of the plugin.
 * Determines how the plugin would interact with Altair.
 */
export declare enum PluginType {
    HEADER = "header",
    SIDEBAR = "sidebar",
    ACTION_BUTTON = "action_button"
}
/**
 * Specifies the capabilities (functionalities) available to the plugin.
 * In the future, this would be used to request the necessary permissions from the user.
 */
export type PluginCapabilities = 'query:read' | 'query:write' | 'header:read' | 'header:write' | 'environment:read' | 'environment:write';
/**
 * Plugin Manifest Structure
 */
export interface PluginManifest {
    manifest_version: 1 | 2;
    name: string;
    display_name: string;
    version: string;
    description: string;
    author_email?: string;
    author?: string;
    /**
     * This specifies the type of plugin. This determines how the plugin would interact with Altair. For now there is just the typical plugin type (registered plugin class). In the future, this would include other plugins like themes.
     */
    type?: PluginType;
    /**
     * This specifies the class name of the plugin, for discovery
     */
    plugin_class?: string;
    /**
     * An array containing the list of scripts (relative to the plugin root directory) that need to be loaded for the plugin to function.
     */
    scripts: string[];
    /**
     * An array containing the list of styles (relative to the plugin root directory) that need to be loaded for the plugin to function.
     */
    styles?: string[];
    /**
     * Specifies the capabilities (functionalities) available to the plugin. In the future, this would be used to request the necessary permissions from the user
     */
    capabilities?: PluginCapabilities[];
}
export interface AltairV1Plugin {
    name: string;
    display_name: string;
    capabilities: PluginCapabilities[];
    type?: PluginType;
    plugin_class?: string;
    manifest: PluginManifest;
}
export declare const createV1Plugin: (name: string, manifest: PluginManifest) => AltairV1Plugin;
export interface RemotePluginListItem {
    name: string;
    version: string;
    description: string;
    author: string | null;
    created_at: number;
    updated_at: number;
    homepage: string | null;
    summary: string | null;
    manifest: PluginManifest;
}
export interface RemotePluginListResponse {
    page: number;
    total: number;
    items: RemotePluginListItem[];
}
//# sourceMappingURL=plugin.interfaces.d.ts.map