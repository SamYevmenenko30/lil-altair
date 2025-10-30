"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_provider_1 = require("../authorization-provider");
class ApiKeyAuthorizationProvider extends authorization_provider_1.AuthorizationProvider {
    async execute(options) {
        if (!options.data?.headerName || !options.data?.headerValue) {
            return {
                headers: {},
            };
        }
        return {
            headers: {
                [options.data.headerName]: this.hydrate(options.data.headerValue),
            },
        };
    }
}
exports.default = ApiKeyAuthorizationProvider;
//# sourceMappingURL=api-key.js.map