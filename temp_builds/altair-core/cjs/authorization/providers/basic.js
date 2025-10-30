"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_provider_1 = require("../authorization-provider");
class BasicAuthorizationProvider extends authorization_provider_1.AuthorizationProvider {
    async execute(options) {
        if (!options.data?.username || !options.data?.password) {
            return {
                headers: {},
            };
        }
        return {
            headers: {
                Authorization: `Basic ${btoa(`${this.hydrate(options.data.username)}:${this.hydrate(options.data.password)}`)}`,
            },
        };
    }
}
exports.default = BasicAuthorizationProvider;
//# sourceMappingURL=basic.js.map