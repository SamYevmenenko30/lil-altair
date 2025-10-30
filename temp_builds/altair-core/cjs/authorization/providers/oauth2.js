"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_provider_1 = require("../authorization-provider");
class OAuth2AuthorizationProvider extends authorization_provider_1.AuthorizationProvider {
    async execute(options) {
        if (!options.data?.accessTokenResponse) {
            return {
                headers: {},
            };
        }
        return {
            headers: {
                Authorization: `Bearer ${this.hydrate(options.data.accessTokenResponse.access_token)}`,
            },
        };
    }
}
exports.default = OAuth2AuthorizationProvider;
//# sourceMappingURL=oauth2.js.map