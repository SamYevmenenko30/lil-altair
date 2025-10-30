"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFormat = exports.AuthFormat = exports.OAuth2Type = void 0;
var OAuth2Type;
(function (OAuth2Type) {
    OAuth2Type["AUTHORIZATION_CODE"] = "auth_code";
    OAuth2Type["AUTHORIZATION_CODE_PKCE"] = "auth_code_pkce";
    OAuth2Type["CLIENT_CREDENTIALS"] = "client_credentials";
})(OAuth2Type || (exports.OAuth2Type = OAuth2Type = {}));
var AuthFormat;
(function (AuthFormat) {
    AuthFormat["BASIC_AUTH"] = "basic";
    AuthFormat["IN_BODY"] = "body";
})(AuthFormat || (exports.AuthFormat = AuthFormat = {}));
var RequestFormat;
(function (RequestFormat) {
    RequestFormat["JSON"] = "json";
    RequestFormat["FORM"] = "form";
})(RequestFormat || (exports.RequestFormat = RequestFormat = {}));
//# sourceMappingURL=types.js.map