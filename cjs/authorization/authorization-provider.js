"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationProvider = void 0;
class AuthorizationProvider {
    constructor(hydrator) {
        this.hydrator = hydrator;
    }
    hydrate(data) {
        return this.hydrator(data);
    }
}
exports.AuthorizationProvider = AuthorizationProvider;
//# sourceMappingURL=authorization-provider.js.map