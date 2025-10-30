"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const subscription_provider_1 = require("../subscriptions/subscription-provider");
const rxjs_1 = require("rxjs");
const adapters_1 = require("./adapters");
class TestSubscriptionProvider extends subscription_provider_1.SubscriptionProvider {
    constructor(subscriptionUrl, connectionParams, extraOptions) {
        super(subscriptionUrl, connectionParams, extraOptions);
        this.execute = globals_1.jest.fn((options) => {
            return (0, rxjs_1.from)(this.connectionParams.testData).pipe((0, rxjs_1.map)((data) => {
                if (data instanceof Error) {
                    throw data;
                }
                return data;
            }));
        });
        this.close = globals_1.jest.fn(() => { });
    }
}
(0, globals_1.describe)('SubscriptionProviderRequestHandlerAdapter', () => {
    (0, globals_1.it)('should properly transform a SubscriptionProvider to a GraphQLRequestHandler - single response', () => {
        const adapter = new adapters_1.SubscriptionProviderRequestHandlerAdapter(TestSubscriptionProvider);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                ],
            },
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const response = {
            data: '{"hello":"world"}',
            headers: new Headers(),
            ok: true,
            requestEndTimestamp: globals_1.expect.any(Number),
            requestStartTimestamp: globals_1.expect.any(Number),
            resopnseTimeMs: globals_1.expect.any(Number),
            status: 200,
            statusText: 'OK',
            url: 'http://localhost:3000/graphql',
        };
        const observer = {
            next: globals_1.jest.fn(),
            error: globals_1.jest.fn(),
            complete: globals_1.jest.fn(),
        };
        adapter.handle(request).subscribe(observer);
        (0, globals_1.expect)(observer.next).toHaveBeenCalledWith(response);
        (0, globals_1.expect)(observer.error).not.toHaveBeenCalled();
        (0, globals_1.expect)(observer.complete).toHaveBeenCalled();
    });
    (0, globals_1.it)('should properly transform a SubscriptionProvider to a GraphQLRequestHandler - multiple responses', () => {
        const adapter = new adapters_1.SubscriptionProviderRequestHandlerAdapter(TestSubscriptionProvider);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                    {
                        hello: 'world2',
                    },
                ],
            },
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const response = {
            data: '{"hello":"world"}',
            headers: new Headers(),
            ok: true,
            requestEndTimestamp: globals_1.expect.any(Number),
            requestStartTimestamp: globals_1.expect.any(Number),
            resopnseTimeMs: globals_1.expect.any(Number),
            status: 200,
            statusText: 'OK',
            url: 'http://localhost:3000/graphql',
        };
        const response2 = {
            data: '{"hello":"world2"}',
            headers: new Headers(),
            ok: true,
            requestEndTimestamp: globals_1.expect.any(Number),
            requestStartTimestamp: globals_1.expect.any(Number),
            resopnseTimeMs: globals_1.expect.any(Number),
            status: 200,
            statusText: 'OK',
            url: 'http://localhost:3000/graphql',
        };
        const observer = {
            next: globals_1.jest.fn(),
            error: globals_1.jest.fn(),
            complete: globals_1.jest.fn(),
        };
        adapter.handle(request).subscribe(observer);
        (0, globals_1.expect)(observer.next).toHaveBeenNthCalledWith(1, response);
        (0, globals_1.expect)(observer.next).toHaveBeenNthCalledWith(2, response2);
        (0, globals_1.expect)(observer.error).not.toHaveBeenCalled();
        (0, globals_1.expect)(observer.complete).toHaveBeenCalled();
    });
    (0, globals_1.it)('should properly transform a SubscriptionProvider to a GraphQLRequestHandler - error', () => {
        const adapter = new adapters_1.SubscriptionProviderRequestHandlerAdapter(TestSubscriptionProvider);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                    new Error('Test error'),
                    {
                        hello: 'world2',
                    },
                ],
            },
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const response = {
            data: '{"hello":"world"}',
            headers: new Headers(),
            ok: true,
            requestEndTimestamp: globals_1.expect.any(Number),
            requestStartTimestamp: globals_1.expect.any(Number),
            resopnseTimeMs: globals_1.expect.any(Number),
            status: 200,
            statusText: 'OK',
            url: 'http://localhost:3000/graphql',
        };
        const observer = {
            next: globals_1.jest.fn(),
            error: globals_1.jest.fn(),
            complete: globals_1.jest.fn(),
        };
        adapter.handle(request).subscribe(observer);
        (0, globals_1.expect)(observer.next).toHaveBeenCalledTimes(1); // Only the response before the error should be emitted
        (0, globals_1.expect)(observer.next).toHaveBeenCalledWith(response);
        (0, globals_1.expect)(observer.error).toHaveBeenCalledWith(new Error('Test error'));
        (0, globals_1.expect)(observer.complete).not.toHaveBeenCalled();
    });
    (0, globals_1.it)('should call close on the provider when unsubscribed', () => {
        const adapter = new adapters_1.SubscriptionProviderRequestHandlerAdapter(TestSubscriptionProvider);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                ],
            },
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const observer = {
            next: globals_1.jest.fn(),
            error: globals_1.jest.fn(),
            complete: globals_1.jest.fn(),
        };
        const subscription = adapter.handle(request).subscribe(observer);
        subscription.unsubscribe();
        (0, globals_1.expect)(adapter.provider?.close).toHaveBeenCalled();
    });
    (0, globals_1.it)('should call the execute method on the provider with the correct options', () => {
        const adapter = new adapters_1.SubscriptionProviderRequestHandlerAdapter(TestSubscriptionProvider);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                ],
            },
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const observer = {
            next: globals_1.jest.fn(),
            error: globals_1.jest.fn(),
            complete: globals_1.jest.fn(),
        };
        adapter.handle(request).subscribe(observer);
        (0, globals_1.expect)(adapter.provider?.execute).toHaveBeenCalledWith({
            query: 'query { hello }',
            variables: {},
            operationName: 'hello',
        });
    });
});
//# sourceMappingURL=adapters.spec.js.map