import { AuthorizationProvider, } from '../authorization-provider';
export default class ApiKeyAuthorizationProvider extends AuthorizationProvider {
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
//# sourceMappingURL=api-key.js.map