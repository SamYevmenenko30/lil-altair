"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e886298a-f54d-551b-a0bc-6120ccfab511")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSha256CspHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createSha256CspHash = function (content) {
    return `sha256-${crypto_1.default
        .createHash('sha256')
        .update(content)
        .digest('base64')}`;
};
exports.createSha256CspHash = createSha256CspHash;
//# sourceMappingURL=csp-hash.js.map
//# debugId=e886298a-f54d-551b-a0bc-6120ccfab511
