export class AuthorizationProvider {
    constructor(hydrator) {
        this.hydrator = hydrator;
    }
    hydrate(data) {
        return this.hydrator(data);
    }
}
//# sourceMappingURL=authorization-provider.js.map