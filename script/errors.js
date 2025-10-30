export class RequestScriptError extends Error {
    constructor(error) {
        const message = error instanceof Error ? error.message : String(error);
        super(message);
        this.name = 'RequestScriptError';
        this.cause = error instanceof Error ? error : new Error(String(error));
    }
}
//# sourceMappingURL=errors.js.map