import { AuthorizationResult } from '../../types/state/authorization.interface';
import { AuthorizationProvider, AuthorizationProviderExecuteOptions, BaseAuthorizationProviderInput } from '../authorization-provider';
export interface ApiKeyAuthorizationProviderInput extends BaseAuthorizationProviderInput {
    type: 'api-key';
    data: {
        headerName: string;
        headerValue: string;
    };
}
export default class ApiKeyAuthorizationProvider extends AuthorizationProvider<ApiKeyAuthorizationProviderInput> {
    execute(options: AuthorizationProviderExecuteOptions<ApiKeyAuthorizationProviderInput>): Promise<AuthorizationResult>;
}
//# sourceMappingURL=api-key.d.ts.map