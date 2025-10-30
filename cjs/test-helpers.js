"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MswMockRequestHandler = void 0;
const msw_1 = require("msw");
class MswMockRequestHandler extends msw_1.RequestHandler {
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
exports.MswMockRequestHandler = MswMockRequestHandler;
//# sourceMappingURL=test-helpers.js.map