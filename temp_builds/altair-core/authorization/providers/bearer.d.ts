import { AuthorizationResult } from '../../types/state/authorization.interface';
import { AuthorizationProvider, AuthorizationProviderExecuteOptions } from '../authorization-provider';
export interface BearerAuthorizationProviderInput {
    type: 'bearer';
    data: {
        token: string;
    };
}
export default class BearerAuthorizationProvider extends AuthorizationProvider<BearerAuthorizationProviderInput> {
    execute(options: AuthorizationProviderExecuteOptions<BearerAuthorizationProviderInput>): Promise<AuthorizationResult>;
}
//# sourceMappingURL=bearer.d.ts.map