"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorEvent = exports.getResponseEvent = exports.SCRIPT_INIT_EXECUTE = void 0;
exports.SCRIPT_INIT_EXECUTE = 'init_execute';
const getResponseEvent = (type) => `${type}_response`;
exports.getResponseEvent = getResponseEvent;
const getErrorEvent = (type) => `${type}_error`;
exports.getErrorEvent = getErrorEvent;
//# sourceMappingURL=events.js.map