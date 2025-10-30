import { AuthorizationResult } from '../../types/state/authorization.interface';
import { AuthorizationProvider, AuthorizationProviderExecuteOptions } from '../authorization-provider';
export interface BasicAuthorizationProviderInput {
    type: 'basic';
    data: {
        username: string;
        password: string;
    };
}
export default class BasicAuthorizationProvider extends AuthorizationProvider<BasicAuthorizationProviderInput> {
    execute(options: AuthorizationProviderExecuteOptions<BasicAuthorizationProviderInput>): Promise<AuthorizationResult>;
}
//# sourceMappingURL=basic.d.ts.map