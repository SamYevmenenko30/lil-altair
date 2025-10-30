import { Observable } from 'rxjs';
import { IDictionary } from '../types/shared';
export interface SubscriptionProviderExtraOptions {
    onConnected?: (error: unknown, data: unknown) => void;
    headers?: IDictionary<string>;
}
export interface SubscriptionProviderExecuteOptions {
    query: string;
    variables?: IDictionary;
    operationName?: string;
}
export type SubscriptionProviderConstructor = new (subscriptionUrl: string, connectionParams: IDictionary, extraOptions?: SubscriptionProviderExtraOptions) => SubscriptionProvider;
export declare abstract class SubscriptionProvider {
    protected subscriptionUrl: string;
    protected connectionParams: IDictionary;
    protected extraOptions?: SubscriptionProviderExtraOptions | undefined;
    constructor(subscriptionUrl: string, connectionParams: IDictionary, extraOptions?: SubscriptionProviderExtraOptions | undefined);
    abstract execute(options: SubscriptionProviderExecuteOptions): Observable<unknown>;
    abstract close(): void;
}
//# sourceMappingURL=subscription-provider.d.ts.map