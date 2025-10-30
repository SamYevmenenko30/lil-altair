import { AuthorizationProvider, } from '../authorization-provider';
export default class OAuth2AuthorizationProvider extends AuthorizationProvider {
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
//# sourceMappingURL=oauth2.js.map