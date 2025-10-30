import { AccessTokenErrorResponse, AccessTokenResponse, AuthFormat, AuthorizationRedirectErrorResponse, AuthorizationRedirectResponse, OAuth2Type, RequestFormat } from './types';
interface CommonOAuth2ClientOptions {
    scopes: string[];
    authFormat: AuthFormat;
    requestFormat: RequestFormat;
}
export interface AuthorizationCode_OAuth2ClientOptions extends CommonOAuth2ClientOptions {
    type: OAuth2Type.AUTHORIZATION_CODE;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    /**
     * An opaque string used to store request-specific data and/or prevent CSRF attacks by verifying the value of state later
     */
    state: string;
    authorizationEndpoint: string;
    tokenEndpoint: string;
}
export interface AuthorizationCodePKCE_OAuth2ClientOptions extends Omit<AuthorizationCode_OAuth2ClientOptions, 'type'> {
    type: OAuth2Type.AUTHORIZATION_CODE_PKCE;
    /**
     * A cryptographically random string between 43 and 128 characters long that will be used to verify the authorization code
     * using the character set [A-Z, a-z, 0-9, "-", ".", "_", "~"]
     */
    codeVerifier: string;
}
export interface ClientCredentials_OAuth2ClientOptions extends CommonOAuth2ClientOptions {
    type: OAuth2Type.CLIENT_CREDENTIALS;
    clientId: string;
    clientSecret: string;
    tokenEndpoint: string;
}
export type OAuth2ClientOptions = AuthorizationCode_OAuth2ClientOptions | AuthorizationCodePKCE_OAuth2ClientOptions | ClientCredentials_OAuth2ClientOptions;
export declare class OAuth2Client {
    private options;
    constructor(options: OAuth2ClientOptions);
    getAuthorizationUrl(): Promise<string>;
    getAuthorizationRedirectResponse(): Promise<AuthorizationRedirectResponse | AuthorizationRedirectErrorResponse | undefined>;
    getAccessTokenFromCode(code: string): Promise<AccessTokenResponse | AccessTokenErrorResponse>;
    getAccessTokenFromClientCredentials(): Promise<AccessTokenResponse | AccessTokenErrorResponse>;
    private getAccessTokenRequestHeaders;
    private getAccessTokenRequestBody;
    private makeAccessTokenRequest;
}
export {};
//# sourceMappingURL=client.d.ts.map