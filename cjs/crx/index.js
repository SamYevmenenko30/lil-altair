"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.isFirefoxExtension = exports.isExtension = void 0;
const browser = window.chrome || window.browser;
exports.isExtension = !!browser?.runtime?.id;
exports.isFirefoxExtension = location.protocol === 'moz-extension:';
const sendMessage = (message) => {
    const browser = window.chrome || window.browser;
    if (!exports.isExtension) {
        // eslint-disable-next-line prettier/prettier, no-console
        console.log('Not running in an extension');
        // eslint-disable-next-line prettier/prettier, no-console
        console.log('Message:', message);
        return;
    }
    browser.runtime.sendMessage(message);
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map