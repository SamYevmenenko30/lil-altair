"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_provider_1 = require("../authorization-provider");
class BearerAuthorizationProvider extends authorization_provider_1.AuthorizationProvider {
    async execute(options) {
        if (!options.data?.token) {
            return {
                headers: {},
            };
        }
        return {
            headers: {
                Authorization: `Bearer ${this.hydrate(options.data.token)}`,
            },
        };
    }
}
exports.default = BearerAuthorizationProvider;
//# sourceMappingURL=bearer.js.map