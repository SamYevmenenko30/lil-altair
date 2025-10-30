"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionEvent = exports.PLUGIN_GET_APP_STYLE_URL_EVENT = exports.PLUGIN_CREATE_ACTION_EVENT = exports.PLUGIN_SUBSCRIBE_TO_EVENT = exports.PLUGIN_ENGINE_READY = void 0;
exports.PLUGIN_ENGINE_READY = 'plugin-engine::ready';
exports.PLUGIN_SUBSCRIBE_TO_EVENT = 'plugin::subscribe_to_event';
exports.PLUGIN_CREATE_ACTION_EVENT = 'plugin::create_action';
exports.PLUGIN_GET_APP_STYLE_URL_EVENT = 'plugin::get_app_style_url';
const getActionEvent = (actionId) => `action::${actionId}`;
exports.getActionEvent = getActionEvent;
//# sourceMappingURL=events.js.map