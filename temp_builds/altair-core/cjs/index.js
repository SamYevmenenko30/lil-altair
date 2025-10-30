"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPluginClass = void 0;
const registerPluginClass = (pluginClassName, pluginClass) => {
    window['AltairGraphQL'].plugins[pluginClassName] = pluginClass;
};
exports.registerPluginClass = registerPluginClass;
//# sourceMappingURL=index.js.map