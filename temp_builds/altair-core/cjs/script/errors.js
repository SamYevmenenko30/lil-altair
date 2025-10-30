"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestScriptError = void 0;
class RequestScriptError extends Error {
    constructor(error) {
        const message = error instanceof Error ? error.message : String(error);
        super(message);
        this.name = 'RequestScriptError';
        this.cause = error instanceof Error ? error : new Error(String(error));
    }
}
exports.RequestScriptError = RequestScriptError;
//# sourceMappingURL=errors.js.map