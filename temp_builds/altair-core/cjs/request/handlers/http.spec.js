"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const msw_1 = require("msw");
const node_1 = require("msw/node");
const http_1 = require("./http");
const test_helpers_1 = require("../../test-helpers");
const server = (0, node_1.setupServer)();
(0, globals_1.beforeAll)(() => server.listen({ onUnhandledRequest: 'error' }));
(0, globals_1.afterEach)(() => server.resetHandlers());
(0, globals_1.afterAll)(() => server.close());
const testObserver = (o) => {
    const values = [];
    let s;
    return new Promise((resolve, reject) => {
        s = o.subscribe({
            next: (value) => {
                values.push(value);
            },
            error: (err) => {
                s.unsubscribe();
                return reject(err);
            },
            complete: () => {
                s.unsubscribe();
                return resolve(values);
            },
        });
    }).finally(() => {
        s?.unsubscribe();
    });
};
(0, globals_1.describe)('HTTP handler', () => {
    (0, globals_1.it)('should properly handle normal successful HTTP requests', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return Response.json({ data: { hello: 'world' } });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {},
            headers: [
                {
                    key: 'X-GraphQL-Token',
                    value: 'asd7-237s-2bdk-nsdk4',
                },
            ],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        const receivedRequest = mockHandler.receivedRequest();
        (0, globals_1.expect)(receivedRequest?.url).toEqual('http://localhost:3000/graphql');
        (0, globals_1.expect)(receivedRequest?.headers.get('X-GraphQL-Token')).toEqual('asd7-237s-2bdk-nsdk4');
        (0, globals_1.expect)(await receivedRequest?.json()).toEqual({
            query: 'query { hello }',
            variables: {},
            operationName: 'hello',
        });
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"hello":"world"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/graphql',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle normal successful HTTP GET requests', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return Response.json({ data: { hello: 'world' } });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'GET',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        const receivedRequest = mockHandler.receivedRequest();
        (0, globals_1.expect)(receivedRequest?.url).toEqual('http://localhost:3000/graphql?query=query+%7B+hello+%7D&variables=%7B%7D&operationName=hello');
        (0, globals_1.expect)(receivedRequest?.body).toBeNull();
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"hello":"world"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/graphql?query=query+%7B+hello+%7D&variables=%7B%7D&operationName=hello',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should handle requests with file variables', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return Response.json({ data: { hello: 'world' } });
        });
        server.use(mockHandler);
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
            files: [
                {
                    data: new File(['asdfghjkl'], 'test.txt'),
                    name: 'myfile',
                },
            ],
            selectedOperation: 'hello',
        };
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        const receivedRequest = mockHandler.receivedRequest();
        (0, globals_1.expect)(receivedRequest?.url).toEqual('http://localhost:3000/graphql');
        const formData = await receivedRequest?.formData();
        (0, globals_1.expect)(formData?.get('operations')).toEqual(JSON.stringify({
            query: 'query { hello }',
            variables: { myfile: null },
            operationName: 'hello',
        }));
        (0, globals_1.expect)(formData?.get('map')).toEqual(JSON.stringify({
            '0': ['variables.myfile'],
        }));
        // TODO: figure out why formData.get() returns the file is stringified object `[object File]`
        // expect(formData?.get('0')).toEqual(new File(['asdfghjkl'], 'test.txt'));
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"hello":"world"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/graphql',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle batched requests', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return Response.json([
                { data: { hello: 'world' } },
                { data: { bye: 'longer' } },
            ]);
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {
                testData: [
                    {
                        hello: 'world',
                    },
                    {
                        bye: 'longer',
                    },
                ],
            },
            headers: [],
            query: 'query a { hello } query b { bye }',
            variables: {},
            selectedOperation: 'hello',
            batchedRequest: true,
        };
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        const receivedRequest = mockHandler.receivedRequest();
        (0, globals_1.expect)(await receivedRequest?.json()).toEqual([
            {
                query: 'query a{hello}',
                variables: {},
                operationName: 'a',
            },
            {
                query: 'query b{bye}',
                variables: {},
                operationName: 'b',
            },
        ]);
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '[{"data":{"hello":"world"}},{"data":{"bye":"longer"}}]',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/graphql',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should handle empty response', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return new Response(null, { status: 204 });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            additionalParams: {},
            headers: [],
            query: 'query { hello }',
            variables: {},
            selectedOperation: 'hello',
        };
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '',
                headers: globals_1.expect.any(Object),
                status: 204,
                url: 'http://localhost:3000/graphql',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle normal unsuccessful HTTP GET requests', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/graphql', async () => {
            return new Response('my data is not found', {
                status: 404,
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/graphql',
            method: 'GET',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        const receivedRequest = mockHandler.receivedRequest();
        (0, globals_1.expect)(receivedRequest?.url).toEqual('http://localhost:3000/graphql?query=query+%7B+hello+%7D&variables=%7B%7D&operationName=hello');
        (0, globals_1.expect)(receivedRequest?.body).toBeNull();
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: false,
                data: 'my data is not found',
                headers: globals_1.expect.any(Object),
                status: 404,
                url: 'http://localhost:3000/graphql?query=query+%7B+hello+%7D&variables=%7B%7D&operationName=hello',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle failed HTTP requests', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/error', async () => {
            return Response.error();
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/error',
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
        const httpHandler = new http_1.HttpRequestHandler();
        (0, globals_1.expect)(testObserver(httpHandler.handle(request))).rejects.toThrow();
    });
    (0, globals_1.it)('should properly handle aborting the request', () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/delay', async () => {
            await (0, msw_1.delay)(1000);
            return Response.json({ data: { hello: 'world' } });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/delay',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = httpHandler.handle(request);
        res.subscribe().unsubscribe();
    });
    (0, globals_1.it)('should properly handle streamed responses', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/simple-stream', async () => {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('{"data":{"hello":"world"}}'));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('{"data":{"bye":"longer"}}'));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('{"data":{"rest":"afva"}}'));
                    await (0, msw_1.delay)(10);
                    controller.close();
                },
            });
            return new Response(stream, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/simple-stream',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"hello":"world"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/simple-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"bye":"longer"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/simple-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"rest":"afva"}}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/simple-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle streamed responses with errors', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/error-stream', async () => {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('{"data":{"hello":"world"}}'));
                    await (0, msw_1.delay)(10);
                    controller.error('random stream error');
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('{"data":{"bye":"longer"}}'));
                    await (0, msw_1.delay)(10);
                    controller.close();
                },
            });
            return new Response(stream, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/error-stream',
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
        const httpHandler = new http_1.HttpRequestHandler();
        try {
            await testObserver(httpHandler.handle(request));
            (0, globals_1.expect)(true).toBe(false); // it should not get here
        }
        catch (err) {
            (0, globals_1.expect)(err).toBe('random stream error');
        }
    });
    (0, globals_1.it)('should properly handle multipart streamed responses', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/multipart-stream', async () => {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode(`---\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 108\r\n\r\n{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}\r\n---\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}\r\n---`));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["b"],"path":["alphabet",1]}],"hasNext":true}\r\n---'));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["c"],"path":["alphabet",2]}],"hasNext":true}\r\n---'));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["d"],"path":["alphabet",3]}],"hasNext":true}\r\n---'));
                    await (0, msw_1.delay)(10);
                    controller.close();
                },
            });
            return new Response(stream, {
                headers: {
                    'Content-Type': 'multipart/mixed; boundary=-',
                },
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/multipart-stream',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"incremental":[{"items":["b"],"path":["alphabet",1]}],"hasNext":true}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"incremental":[{"items":["c"],"path":["alphabet",2]}],"hasNext":true}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"incremental":[{"items":["d"],"path":["alphabet",3]}],"hasNext":true}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    // https://github.com/felipe-gdr/spring-graphql-defer/issues/5
    (0, globals_1.it)('should properly handle multipart streamed responses - sample 2', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/multipart-stream-2', async () => {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    await (0, msw_1.delay)(10);
                    // this is invalid since there is no boundary before the first content, so it should be ignored as the preamble as per the spec
                    controller.enqueue(encoder.encode(`\r\ncontent-type: application/json; charset=utf-8\r\n\r\n{"data":{"bookById":{"name":"Effective Java"}},"hasNext":true}\r\n---`));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode(`\r\ncontent-type: application/json; charset=utf-8\r\n\r\n{"hasNext":true,"incremental":[{"path":["bookById"],"data":{"author":{"firstName":"Joshua"}}}]}\r\n---`));
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode(`content-type: application/json; charset=utf-8\r\n\r\n{"hasNext":false,"incremental":[{"path":[],"data":{"book2":{"name":"Hitchhiker's Guide to the Galaxy"}}}]}\r\n-----`));
                    await (0, msw_1.delay)(10);
                    controller.close();
                },
            });
            return new Response(stream, {
                headers: {
                    'content-type': 'multipart/mixed; boundary="-"',
                },
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/multipart-stream-2',
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
        const httpHandler = new http_1.HttpRequestHandler();
        const res = await testObserver(httpHandler.handle(request));
        (0, globals_1.expect)(res).toEqual([
            globals_1.expect.objectContaining({
                ok: true,
                data: '{"hasNext":true,"incremental":[{"path":["bookById"],"data":{"author":{"firstName":"Joshua"}}}]}',
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream-2',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
            globals_1.expect.objectContaining({
                ok: true,
                data: `{"hasNext":false,"incremental":[{"path":[],"data":{"book2":{"name":"Hitchhiker's Guide to the Galaxy"}}}]}`,
                headers: globals_1.expect.any(Object),
                status: 200,
                url: 'http://localhost:3000/multipart-stream-2',
                requestStartTimestamp: globals_1.expect.any(Number),
                requestEndTimestamp: globals_1.expect.any(Number),
                resopnseTimeMs: globals_1.expect.any(Number),
            }),
        ]);
    });
    (0, globals_1.it)('should properly handle multipart streamed responses with errors', async () => {
        const mockHandler = new test_helpers_1.MswMockRequestHandler('http://localhost:3000/error-multipart-stream', async () => {
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode(`---\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 108\r\n\r\n{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}\r\n---\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}\r\n---`));
                    await (0, msw_1.delay)(10);
                    controller.error('random stream error');
                    await (0, msw_1.delay)(10);
                    controller.enqueue(encoder.encode('\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 70\r\n\r\n{"incremental":[{"items":["b"],"path":["alphabet",1]}],"hasNext":true}\r\n---'));
                    await (0, msw_1.delay)(10);
                    controller.close();
                },
            });
            return new Response(stream, {
                headers: {
                    'Content-Type': 'multipart/mixed; boundary=-',
                },
            });
        });
        server.use(mockHandler);
        const request = {
            url: 'http://localhost:3000/error-multipart-stream',
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
        const httpHandler = new http_1.HttpRequestHandler();
        try {
            await testObserver(httpHandler.handle(request));
            (0, globals_1.expect)(true).toBe(false); // it should not get here
        }
        catch (err) {
            (0, globals_1.expect)(err).toBe('random stream error');
        }
    });
});
//# sourceMappingURL=http.spec.js.map