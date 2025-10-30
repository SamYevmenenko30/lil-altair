import { AuthorizationResult } from '../types/state/authorization.interface';
export interface AuthorizationProviderExecuteOptions<T extends BaseAuthorizationProviderInput = BaseAuthorizationProviderInput> {
    data: T['data'] | undefined;
}
export interface BaseAuthorizationProviderInput {
    type: string;
    data: unknown;
}
export declare abstract class AuthorizationProvider<T extends BaseAuthorizationProviderInput = BaseAuthorizationProviderInput> {
    private hydrator;
    constructor(hydrator: (data: string) => string);
    hydrate(data: string): string;
    abstract execute(options: AuthorizationProviderExecuteOptions<T>): Promise<AuthorizationResult>;
}
//# sourceMappingURL=authorization-provider.d.ts.map