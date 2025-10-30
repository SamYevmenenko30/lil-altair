import { AuthorizationProvider, } from '../authorization-provider';
export default class BasicAuthorizationProvider extends AuthorizationProvider {
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
//# sourceMappingURL=basic.js.map