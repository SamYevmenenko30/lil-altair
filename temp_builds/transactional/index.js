"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWelcomeEmail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var components_1 = require("@react-email/components");
var Welcome_1 = require("./emails/Welcome");
var renderWelcomeEmail = function (props, options) {
    return (0, components_1.render)((0, jsx_runtime_1.jsx)(Welcome_1.WelcomeEmail, __assign({}, props)), options);
};
exports.renderWelcomeEmail = renderWelcomeEmail;
//# sourceMappingURL=index.js.map