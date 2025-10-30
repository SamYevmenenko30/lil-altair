"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const client_1 = require("./client");
const types_1 = require("./types");
const node_1 = require("msw/node");
const test_helpers_1 = require("../test-helpers");
const server = (0, node_1.setupServer)();
(0, globals_1.beforeAll)(() => server.listen({ onUnhandledRequest: 'error' }));
(0, globals_1.afterEach)(() => server.resetHandlers());
(0, globals_1.afterAll)(() => server.close());
(0, globals_1.describe)('oauth2 client', () => {
    (0, globals_1.describe)('getAuthorizationUrl', () => {
        (0, globals_1.it)('should return the authorization url', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            const url = await client.getAuthorizationUrl();
            (0, globals_1.expect)(url).toBe('https://auth-server.com/oauth/authorize?response_type=code&client_id=clientId&redirect_uri=redirectUri&state=random-state&scope=scope1+scope2&code_challenge=N1E4yRMD7xixn_oFyO_W3htYN3rY7-HMDKJe6z6r928&code_challenge_method=S256');
        });
        (0, globals_1.it)('should throw an error if the flow is client credentials', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            await (0, globals_1.expect)(client.getAuthorizationUrl()).rejects.toThrow('Client Credentials flow not supported for authorization code');
        });
    });
    (0, globals_1.describe)('getAuthorizationRedirectResponse', () => {
        (0, globals_1.it)('should return the authorization redirect response', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            location.href =
                'https://auth-server.com/oauth/authorize?code=code&state=random-state';
            const response = await client.getAuthorizationRedirectResponse();
            (0, globals_1.expect)(response).toEqual({
                code: 'code',
                state: 'random-state',
            });
        });
        (0, globals_1.it)('should return the authorization redirect error response', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            location.href =
                'https://auth-server.com/oauth/authorize?error=access_denied&state=random-state&error_description=access+is+denied&error_uri=https%3A%2F%2Fauth-server.com%2Ferror';
            const response = await client.getAuthorizationRedirectResponse();
            (0, globals_1.expect)(response).toEqual({
                error: 'access_denied',
                state: 'random-state',
                error_description: 'access is denied',
                error_uri: 'https://auth-server.com/error',
            });
        });
        (0, globals_1.it)('should return error if the state does not match', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            location.href =
                'https://auth-server.com/oauth/authorize?code=code&state=random-state-2';
            const response = await client.getAuthorizationRedirectResponse();
            (0, globals_1.expect)(response).toEqual({
                error: 'invalid_state',
                error_description: 'The state is invalid',
                state: 'random-state-2',
            });
        });
        (0, globals_1.it)('should return undefined if the state is missing', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            location.href = 'https://auth-server.com/oauth/authorize?code=code';
            const response = await client.getAuthorizationRedirectResponse();
            (0, globals_1.expect)(response).toBeUndefined();
        });
        (0, globals_1.it)('should throw an error if the flow is client credentials', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            location.href =
                'https://auth-server.com/oauth/authorize?code=code&state=random-state';
            await (0, globals_1.expect)(client.getAuthorizationRedirectResponse()).rejects.toThrow('Client Credentials flow not supported for authorization code');
        });
    });
    (0, globals_1.describe)('getAccessTokenFromCode', () => {
        (0, globals_1.it)('should return the access token from code (authFormat: in body, requestFormat: JSON)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromCode('code');
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                accept: 'application/json',
                'content-type': 'application/json',
            });
            (0, globals_1.expect)(await receivedRequest?.json()).toEqual({
                grant_type: 'authorization_code',
                code: 'code',
                redirect_uri: 'redirectUri',
                client_id: 'clientId',
                client_secret: 'clientSecret',
                code_verifier: 'codeVerifier',
            });
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from code (authFormat: basic auth, requestFormat: JSON)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.BASIC_AUTH,
                requestFormat: types_1.RequestFormat.JSON,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromCode('code');
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
            });
            (0, globals_1.expect)(await receivedRequest?.json()).toEqual({
                grant_type: 'authorization_code',
                code: 'code',
                redirect_uri: 'redirectUri',
                code_verifier: 'codeVerifier',
            });
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from code (authFormat: in body, requestFormat: form)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.FORM,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromCode('code');
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                'content-type': 'application/x-www-form-urlencoded',
            });
            (0, globals_1.expect)(await receivedRequest?.text()).toEqual('grant_type=authorization_code&code=code&redirect_uri=redirectUri&client_id=clientId&client_secret=clientSecret&code_verifier=codeVerifier');
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from code (authFormat: basic auth, requestFormat: form)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.BASIC_AUTH,
                requestFormat: types_1.RequestFormat.FORM,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromCode('code');
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
            });
            (0, globals_1.expect)(await receivedRequest?.text()).toEqual('grant_type=authorization_code&code=code&redirect_uri=redirectUri&code_verifier=codeVerifier');
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should throw an error if the flow is client credentials', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            await (0, globals_1.expect)(client.getAccessTokenFromCode('code')).rejects.toThrow('Client Credentials flow not supported');
        });
    });
    (0, globals_1.describe)('getAccessTokenFromClientCredentials', () => {
        (0, globals_1.it)('should return the access token from client credentials (authFormat: in body, requestFormat: JSON)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.JSON,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromClientCredentials();
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                accept: 'application/json',
                'content-type': 'application/json',
            });
            (0, globals_1.expect)(await receivedRequest?.json()).toEqual({
                grant_type: 'client_credentials',
                client_id: 'clientId',
                client_secret: 'clientSecret',
                scope: 'scope1 scope2',
            });
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from client credentials (authFormat: basic auth, requestFormat: JSON)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.BASIC_AUTH,
                requestFormat: types_1.RequestFormat.JSON,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromClientCredentials();
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
            });
            (0, globals_1.expect)(await receivedRequest?.json()).toEqual({
                grant_type: 'client_credentials',
                scope: 'scope1 scope2',
            });
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from client credentials (authFormat: in body, requestFormat: form)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.FORM,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromClientCredentials();
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                'content-type': 'application/x-www-form-urlencoded',
            });
            (0, globals_1.expect)(await receivedRequest?.text()).toEqual('grant_type=client_credentials&client_id=clientId&client_secret=clientSecret&scope=scope1+scope2');
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should return the access token from client credentials (authFormat: basic auth, requestFormat: form)', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.CLIENT_CREDENTIALS,
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                scopes: ['scope1', 'scope2'],
                authFormat: types_1.AuthFormat.BASIC_AUTH,
                requestFormat: types_1.RequestFormat.FORM,
            });
            const mockHandler = new test_helpers_1.MswMockRequestHandler('https://auth-server.com/oauth/token', async () => {
                return Response.json({
                    access_token: 'access-token',
                    refresh_token: 'refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                });
            });
            server.use(mockHandler);
            const response = await client.getAccessTokenFromClientCredentials();
            const receivedRequest = mockHandler.receivedRequest();
            (0, globals_1.expect)(receivedRequest?.method).toBe('POST');
            (0, globals_1.expect)(Object.fromEntries(receivedRequest?.headers)).toEqual({
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
            });
            (0, globals_1.expect)(await receivedRequest?.text()).toEqual('grant_type=client_credentials&scope=scope1+scope2');
            (0, globals_1.expect)(response).toEqual({
                access_token: 'access-token',
                refresh_token: 'refresh-token',
                expires_in: 3600,
                token_type: 'Bearer',
            });
        });
        (0, globals_1.it)('should throw an error if the flow is not client credentials', async () => {
            const client = new client_1.OAuth2Client({
                type: types_1.OAuth2Type.AUTHORIZATION_CODE_PKCE,
                authorizationEndpoint: 'https://auth-server.com/oauth/authorize',
                tokenEndpoint: 'https://auth-server.com/oauth/token',
                clientId: 'clientId',
                clientSecret: 'clientSecret',
                redirectUri: 'redirectUri',
                scopes: ['scope1', 'scope2'],
                codeVerifier: 'codeVerifier',
                state: 'random-state',
                authFormat: types_1.AuthFormat.IN_BODY,
                requestFormat: types_1.RequestFormat.FORM,
            });
            await (0, globals_1.expect)(client.getAccessTokenFromClientCredentials()).rejects.toThrow('Only Client Credentials flow is supported');
        });
    });
    // getAuthorizationRedirectResponse
    // getAccessTokenFromCode
    // getAccessTokenFromClientCredentials
});
//# sourceMappingURL=client.spec.js.map