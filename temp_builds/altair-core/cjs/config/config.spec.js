"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _1 = require(".");
(0, globals_1.describe)('config', () => {
    (0, globals_1.it)('creates config object with expected properties', () => {
        const config = new _1.AltairConfig();
        (0, globals_1.expect)(config).toMatchSnapshot();
    });
});
//# sourceMappingURL=config.spec.js.map