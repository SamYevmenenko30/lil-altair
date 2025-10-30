import { IDictionary } from '../shared';
export declare const AUTHORIZATION_TYPES: {
    readonly NONE: "none";
    readonly BASIC: "basic";
    readonly BEARER: "bearer";
    readonly API_KEY: "api-key";
    readonly OAUTH2: "oauth2";
};
export declare const AUTHORIZATION_TYPE_LIST: ("none" | "basic" | "bearer" | "api-key" | "oauth2")[];
export declare const DEFAULT_AUTHORIZATION_TYPE: "none";
export type AuthorizationTypes = (typeof AUTHORIZATION_TYPES)[keyof typeof AUTHORIZATION_TYPES];
export interface AuthorizationResult {
    headers: IDictionary<string>;
}
export interface AuthorizationState {
    type: AuthorizationTypes;
    data: unknown;
    result: AuthorizationResult;
}
//# sourceMappingURL=authorization.interface.d.ts.map