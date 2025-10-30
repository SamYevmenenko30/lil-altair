"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestHandler = void 0;
const rxjs_1 = require("rxjs");
const dot_notation_1 = require("../../utils/dot-notation");
const graphql_1 = require("graphql");
const graphql_2 = require("../../utils/graphql");
const browser_1 = require("meros/browser");
const graphql_query_compress_1 = __importDefault(require("graphql-query-compress"));
class HttpRequestHandler {
    handle(request) {
        // Make the request and return an observable
        return new rxjs_1.Observable((observer) => {
            const aborter = new AbortController();
            const data = this.getData(request);
            const params = this.isGETRequest(request.method)
                ? this.getParamsFromData(data)
                : undefined;
            const requestStartTime = Date.now();
            // Make the request
            fetch(this.getUrl(request.url, params), {
                method: request.method,
                headers: this.getHeaders(request),
                body: this.getBody(request, data),
                credentials: request.withCredentials ? 'include' : 'same-origin',
                signal: aborter.signal,
            })
                .then(async (response) => {
                return { response, merosResponse: await (0, browser_1.meros)(response) };
            })
                .then(async (result) => {
                const requestEndTime = Date.now();
                const { response, merosResponse } = result;
                if (merosResponse instanceof Response) {
                    // meros couldn't handle the response, so we'll handle it ourselves
                    if (!merosResponse.ok || !merosResponse.body) {
                        //  don't handle streaming
                        const buffer = await merosResponse.arrayBuffer();
                        return this.emitChunk(merosResponse, new Uint8Array(buffer), true, observer, requestStartTime, requestEndTime);
                    }
                    const reader = merosResponse.body.getReader();
                    while (true) {
                        const { done, value } = await reader.read();
                        this.emitChunk(merosResponse, value, done, observer, requestStartTime, requestEndTime);
                        if (done) {
                            return true;
                        }
                    }
                }
                // Handle the response from meros
                return (0, rxjs_1.from)(merosResponse).subscribe({
                    next: (chunk) => {
                        this.emitChunk(response, chunk.json ? JSON.stringify(chunk.body) : chunk.body, false, observer, requestStartTime, requestEndTime);
                    },
                    error: (error) => {
                        observer.error(error);
                    },
                    complete: () => {
                        this.emitChunk(response, undefined, true, observer, requestStartTime, requestEndTime);
                    },
                });
            })
                .catch((error) => {
                if (error?.name === 'AbortError') {
                    // Request was aborted
                    observer.complete();
                    return;
                }
                // Send the error to the observer
                observer.error(error);
            });
            // Return a function that will be called when the observable is unsubscribed
            return () => {
                // Cancel the ongoing request if unsubscribed
                aborter.abort();
            };
        });
    }
    destroy() {
        // throw new Error('Method not implemented.');
    }
    emitChunk(response, chunk, done, observer, requestStartTime, requestEndTime) {
        if (chunk) {
            const value = typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk);
            const res = {
                ok: response.ok,
                data: value,
                headers: response.headers,
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                requestStartTimestamp: requestStartTime,
                requestEndTimestamp: requestEndTime,
                // this is redundant data
                resopnseTimeMs: requestEndTime - requestStartTime,
            };
            // Send the data to the observer
            observer.next(res);
        }
        if (done) {
            observer.complete();
        }
        return true;
    }
    isGETRequest(method) {
        return method.toLowerCase() === 'get';
    }
    getParamsFromData(data) {
        return Object.entries(data).reduce((params, [key, value]) => {
            if (value) {
                const parsedValue = typeof value === 'object' ? JSON.stringify(value) : value.toString();
                params.set(key, parsedValue);
            }
            return params;
        }, new URLSearchParams());
    }
    getHeaders(request) {
        const headers = new Headers();
        const jsonHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        // with files, needs to be form data
        // GET request, needs to be query params
        const addJsonHeaders = !this.isGETRequest(request.method) && !request.files?.length;
        if (addJsonHeaders) {
            Object.entries(jsonHeaders).forEach(([key, value]) => {
                headers.set(key, value);
            });
        }
        // Add the rest of the headers
        request.headers?.forEach((header) => {
            headers.set(header.key, header.value);
        });
        return headers;
    }
    getUrl(url, params) {
        const u = new URL(url);
        if (params) {
            u.search = params.toString();
        }
        return u.href;
    }
    getData(request) {
        const data = {
            query: request.query,
            variables: request.variables ?? {},
            extensions: request.extensions,
            operationName: null,
        };
        if (request.selectedOperation) {
            data.operationName = request.selectedOperation;
        }
        return data;
    }
    getBody(request, data) {
        // with files, needs to be form data
        // with neither, needs to be JSON
        // GET request, needs to be query params, so no body
        if (this.isGETRequest(request.method)) {
            return;
        }
        // Handle file uploads
        if (request.files?.length) {
            // https://github.com/jaydenseric/graphql-multipart-request-spec#multipart-form-field-structure
            // 1. operations: JSON string of the data, with the files in variables replaced by null
            // 2. map: JSON string of the file map, where the key is the index of the file in the files array, and the value is the path to the file in the operations JSON
            // 3. files: the files themselves, with the key being the index of the file in the files array
            const fileMap = {};
            request.files.forEach((file, i) => {
                // this mutation should be done before setting the stringified data
                (0, dot_notation_1.setByDotNotation)(data.variables, file.name, null);
                fileMap[i] = [`variables.${file.name}`];
            });
            const formData = new FormData();
            formData.append('operations', JSON.stringify(data));
            formData.append('map', JSON.stringify(fileMap));
            request.files.forEach((file, i) => {
                formData.append(`${i}`, file.data ?? '');
            });
            return formData;
        }
        // Handle batched requests
        if (request.batchedRequest) {
            const operations = (0, graphql_2.getOperations)(data.query);
            if (operations.length > 1) {
                const operationQueries = operations.map((operation) => {
                    const operationName = operation.name?.value;
                    const operationQuery = (0, graphql_query_compress_1.default)((0, graphql_1.print)(operation));
                    const operationVariables = data.variables;
                    const operationExtensions = data.extensions;
                    return {
                        operationName,
                        query: operationQuery,
                        variables: operationVariables,
                        extensions: operationExtensions,
                    };
                });
                return JSON.stringify(operationQueries);
            }
        }
        return JSON.stringify(data);
    }
}
exports.HttpRequestHandler = HttpRequestHandler;
//# sourceMappingURL=http.js.map