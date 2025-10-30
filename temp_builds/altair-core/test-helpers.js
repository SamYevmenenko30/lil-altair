import { RequestHandler } from 'msw';
export class MswMockRequestHandler extends RequestHandler {
    constructor(path, resolver) {
        super({
            info: {
                header: `msw request handler-${path}`,
            },
            resolver,
        });
    }
    parse(...args) {
        const [{ request }] = args;
        this.lastRequest = request.clone();
        return super.parse(...args);
    }
    predicate(args) {
        return true;
    }
    log(args) {
        // throw new Error('Method not implemented.');
    }
    receivedRequest() {
        return this.lastRequest?.clone();
    }
}
//# sourceMappingURL=test-helpers.js.map