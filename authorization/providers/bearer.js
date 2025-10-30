import { AuthorizationProvider, } from '../authorization-provider';
export default class BearerAuthorizationProvider extends AuthorizationProvider {
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
//# sourceMappingURL=bearer.js.map