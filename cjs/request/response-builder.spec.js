"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const response_builder_1 = require("./response-builder");
const types_1 = require("./types");
const responseChunks = [
    {
        content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["b"],"path":["alphabet",1]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["c"],"path":["alphabet",2]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["d"],"path":["alphabet",3]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["e"],"path":["alphabet",4]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"data":{"slowField":"This field resolves slowly after 5000ms ⏳"},"path":[]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["f"],"path":["alphabet",5]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["g"],"path":["alphabet",6]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["h"],"path":["alphabet",7]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["i"],"path":["alphabet",8]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["j"],"path":["alphabet",9]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["k"],"path":["alphabet",10]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["l"],"path":["alphabet",11]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["m"],"path":["alphabet",12]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["n"],"path":["alphabet",13]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["o"],"path":["alphabet",14]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["p"],"path":["alphabet",15]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["q"],"path":["alphabet",16]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["r"],"path":["alphabet",17]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["s"],"path":["alphabet",18]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["t"],"path":["alphabet",19]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["u"],"path":["alphabet",20]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["v"],"path":["alphabet",21]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["w"],"path":["alphabet",22]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["x"],"path":["alphabet",23]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["y"],"path":["alphabet",24]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"incremental":[{"items":["z"],"path":["alphabet",25]}],"hasNext":true}',
        timestamp: 1718252802585,
    },
    {
        content: '{"hasNext":false}',
        timestamp: 1718252802585,
    },
];
(0, globals_1.describe)('response-builder', () => {
    (0, globals_1.it)('unknown strategy should throw an error', () => {
        (0, globals_1.expect)(() => (0, response_builder_1.buildResponse)(responseChunks, 'unknown')).toThrowError('Invalid strategy');
    });
    (0, globals_1.describe)('concatenate strategy', () => {
        (0, globals_1.it)('should concatenate the responses', () => {
            const res = (0, response_builder_1.buildResponse)(responseChunks, types_1.MultiResponseStrategy.CONCATENATE);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should concatenate the responses and format the data if concatenated data is valid JSON', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"hello":',
                    timestamp: 1718252802585,
                },
                {
                    content: '"world"}',
                    timestamp: 1718252802585,
                },
            ]);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should return timestamp as 0 if no responses are provided', () => {
            const res = (0, response_builder_1.buildResponse)([], types_1.MultiResponseStrategy.CONCATENATE);
            (0, globals_1.expect)(res).toEqual([
                {
                    content: '',
                    timestamp: 0,
                    json: false,
                },
            ]);
        });
    });
    (0, globals_1.describe)('append strategy', () => {
        (0, globals_1.it)('should append the responses', () => {
            const res = (0, response_builder_1.buildResponse)(responseChunks, types_1.MultiResponseStrategy.APPEND);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
    });
    (0, globals_1.describe)('patch strategy', () => {
        (0, globals_1.it)('should patch the responses', () => {
            const res = (0, response_builder_1.buildResponse)(responseChunks, types_1.MultiResponseStrategy.PATCH);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should return empty list if no responses are provided', () => {
            const res = (0, response_builder_1.buildResponse)([], types_1.MultiResponseStrategy.PATCH);
            (0, globals_1.expect)(res).toEqual([]);
        });
        (0, globals_1.it)('should throw an error if the first response is not JSON', () => {
            (0, globals_1.expect)(() => (0, response_builder_1.buildResponse)([
                {
                    content: 'This is not a JSON object',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.PATCH)).toThrowError('JSON response required for patching!');
        });
        (0, globals_1.it)('should throw an error if subsequent responses are not JSON', () => {
            (0, globals_1.expect)(() => (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                    timestamp: 1718252802585,
                },
                {
                    content: 'This is not a JSON object',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.PATCH)).toThrowError('JSON response required for patching!');
        });
        (0, globals_1.it)('should gather all errors from all responses', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true,"errors":[{"message":"Error 1"}]}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet",0],"errors":[{"message":"Incremental error"}]}],"hasNext":true,"errors":[{"message":"Error 2"}]}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["b"],"path":["alphabet",1]}],"hasNext":true,"errors":[{"message":"Error 3"}]}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.PATCH);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should handle incremental payloads in the old format', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"data":{"additionalField":"This field is added in the second response"},"path":["inner"]}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.PATCH);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should patch responses with extensions', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true,"extensions":{"key":"value"}}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["b"],"path":["alphabet",1],"extensions":{"key1":"value1"}}],"hasNext":true}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.PATCH);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should throw an error for incremental payload with invalid @stream path', () => {
            (0, globals_1.expect)(() => (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet"]}],"hasNext":true}',
                    timestamp: 1718252802585,
                },
            ])).toThrowError('Path for stream incremental payload should end with a number!');
        });
    });
    (0, globals_1.describe)('auto strategy', () => {
        (0, globals_1.it)('should concatenate the responses when the first response is not a JSON object', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: 'This is not a JSON object',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.AUTO);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should return timestamp as 0 if no responses are provided', () => {
            const res = (0, response_builder_1.buildResponse)([], types_1.MultiResponseStrategy.AUTO);
            (0, globals_1.expect)(res).toEqual([
                {
                    content: '',
                    timestamp: 0,
                    json: false,
                },
            ]);
        });
        (0, globals_1.it)('should patch the responses when the first response is patchable', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"data":{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"},"hasNext":true}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"incremental":[{"items":["a"],"path":["alphabet",0]}],"hasNext":true}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.AUTO);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        // https://github.com/felipe-gdr/spring-graphql-defer/issues/5
        (0, globals_1.it)('should patch the responses when patchable - sample 2', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: `{"data":{"bookById":{"name":"Effective Java"}},"hasNext":true}`,
                    timestamp: 1718252802585,
                },
                {
                    content: `{"hasNext":true,"incremental":[{"path":["bookById"],"data":{"author":{"firstName":"Joshua"}}}]}`,
                    timestamp: 1718252802585,
                },
                {
                    content: `{"hasNext":false,"incremental":[{"path":[],"data":{"book2":{"name":"Hitchhiker's Guide to the Galaxy"}}}]}`,
                    timestamp: 1718252802585,
                },
            ]);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
        (0, globals_1.it)('should append the responses when the first response is a JSON object but not patchable', () => {
            const res = (0, response_builder_1.buildResponse)([
                {
                    content: '{"hello":"Hello world","alphabet":[],"fastField":"This field resolves fast! ⚡️"}',
                    timestamp: 1718252802585,
                },
                {
                    content: '{"hi": "Hi world"}',
                    timestamp: 1718252802585,
                },
            ], types_1.MultiResponseStrategy.AUTO);
            (0, globals_1.expect)(res).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=response-builder.spec.js.map