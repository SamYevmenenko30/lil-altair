"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createV1Plugin = exports.PluginType = exports.PluginSource = void 0;
/**
 * Defines the repository of the plugin.
 * Used to know where to get the plugin from.
 */
var PluginSource;
(function (PluginSource) {
    PluginSource["NPM"] = "npm";
    PluginSource["GITHUB"] = "github";
    PluginSource["URL"] = "url";
})(PluginSource || (exports.PluginSource = PluginSource = {}));
/**
 * Specifies the type of the plugin.
 * Determines how the plugin would interact with Altair.
 */
var PluginType;
(function (PluginType) {
    PluginType["HEADER"] = "header";
    PluginType["SIDEBAR"] = "sidebar";
    PluginType["ACTION_BUTTON"] = "action_button";
})(PluginType || (exports.PluginType = PluginType = {}));
const createV1Plugin = (name, manifest) => {
    return {
        name,
        manifest,
        type: manifest.type,
        display_name: manifest.display_name || name,
        plugin_class: manifest.plugin_class,
        capabilities: Array.from(new Set([
            ...(manifest.capabilities || []),
            ...['query:read', 'query:write'],
        ])),
    };
};
exports.createV1Plugin = createV1Plugin;
//# sourceMappingURL=plugin.interfaces.js.map