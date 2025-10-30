import { RequestHandler, ResponseResolver } from 'msw';
export declare class MswMockRequestHandler extends RequestHandler {
    private lastRequest?;
    constructor(path: string, resolver: ResponseResolver);
    parse(...args: Parameters<RequestHandler['parse']>): Promise<any>;
    predicate(args: {
        request: Request;
        parsedResult: any;
        resolutionContext?: unknown;
    }): boolean;
    log(args: {
        request: Request;
        response: Response;
        parsedResult: any;
    }): void;
    receivedRequest(): Request | undefined;
}
//# sourceMappingURL=test-helpers.d.ts.map