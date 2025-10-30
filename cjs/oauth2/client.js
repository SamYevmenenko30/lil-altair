"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Client = void 0;
const helpers_1 = require("./helpers");
const types_1 = require("./types");
class OAuth2Client {
    constructor(options) {
        this.options = options;
    }
    async getAuthorizationUrl() {
        if (this.options.type === types_1.OAuth2Type.CLIENT_CREDENTIALS) {
            throw new Error('Client Credentials flow not supported for authorization code');
        }
        const params = {
            response_type: 'code',
            client_id: this.options.clientId,
            redirect_uri: this.options.redirectUri,
            state: this.options.state,
            scope: this.options.scopes.join(' '),
            ...(this.options.type === 'auth_code_pkce'
                ? {
                    code_challenge: await (0, helpers_1.getCodeChallenge)(this.options.codeVerifier),
                    code_challenge_method: 'S256',
                }
                : {}),
        };
        const urlParams = new URLSearchParams(params);
        const u = new URL(this.options.authorizationEndpoint);
        const url = new URL(`${u.origin}${u.pathname}?${urlParams.toString()}`);
        return url.toString();
    }
    async getAuthorizationRedirectResponse() {
        if (this.options.type === types_1.OAuth2Type.CLIENT_CREDENTIALS) {
            throw new Error('Client Credentials flow not supported for authorization code');
        }
        // Get params from url
        const url = new URL(window.location.href);
        const obj = Object.fromEntries(url.searchParams.entries());
        if (obj.error) {
            return {
                error: obj.error,
                state: obj.state ?? '',
                error_description: obj.error_description,
                error_uri: obj.error_uri,
            };
        }
        // Validate params
        if (!obj.code || !obj.state) {
            return;
        }
        // verify state is the same as the one generated
        if (obj.state !== this.options.state) {
            return {
                error: 'invalid_state',
                state: obj.state,
                error_description: 'The state is invalid',
            };
        }
        // Return params
        return { code: obj.code, state: obj.state };
    }
    // Since this will be a CORS request, we only support it in the desktop app for now
    async getAccessTokenFromCode(code) {
        if (this.options.type === types_1.OAuth2Type.CLIENT_CREDENTIALS) {
            throw new Error('Client Credentials flow not supported');
        }
        const params = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.options.redirectUri,
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            ...(this.options.type === 'auth_code_pkce'
                ? { code_verifier: this.options.codeVerifier }
                : {}),
        };
        return this.makeAccessTokenRequest(params);
    }
    async getAccessTokenFromClientCredentials() {
        if (this.options.type !== types_1.OAuth2Type.CLIENT_CREDENTIALS) {
            throw new Error('Only Client Credentials flow is supported');
        }
        const params = {
            grant_type: 'client_credentials',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            scope: this.options.scopes.join(' '),
        };
        return this.makeAccessTokenRequest(params);
    }
    getAccessTokenRequestHeaders() {
        const headers = {};
        switch (this.options.authFormat) {
            case types_1.AuthFormat.BASIC_AUTH: {
                headers.Authorization = `Basic ${(0, helpers_1.base64EncodeSafe)(`${this.options.clientId}:${this.options.clientSecret}`)}`;
                break;
            }
        }
        switch (this.options.requestFormat) {
            case types_1.RequestFormat.JSON: {
                headers.Accept = 'application/json';
                headers['Content-Type'] = 'application/json';
                break;
            }
            case types_1.RequestFormat.FORM: {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
                break;
            }
        }
        return headers;
    }
    getAccessTokenRequestBody(params) {
        let bodyParams = structuredClone(params);
        switch (this.options.authFormat) {
            case types_1.AuthFormat.BASIC_AUTH: {
                const { client_id, client_secret, ...rest } = params;
                bodyParams = rest;
                break;
            }
        }
        switch (this.options.requestFormat) {
            case types_1.RequestFormat.JSON:
                return JSON.stringify(bodyParams);
            case types_1.RequestFormat.FORM:
                return new URLSearchParams({ ...bodyParams }).toString();
        }
    }
    async makeAccessTokenRequest(params) {
        const response = await fetch(this.options.tokenEndpoint, {
            method: 'POST',
            headers: this.getAccessTokenRequestHeaders(),
            body: this.getAccessTokenRequestBody(params),
        });
        const data = await response.json();
        return data;
    }
}
exports.OAuth2Client = OAuth2Client;
/*
in app:
listen for ready message from auth window
send [options + action] to the auth window
listen for authorization code from auth window
close auth window
exchange code for access token

in auth window:
send ready message to app
listen for options message from app
- redirect to authorization url
- get code from url
- send code to app
*/
//# sourceMappingURL=client.js.map