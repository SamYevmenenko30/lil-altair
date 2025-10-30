"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = void 0;
const json_1 = require("../utils/json");
const types_1 = require("./types");
const dot_notation_1 = require("../utils/dot-notation");
// https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md
// https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md
// https://github.com/graphql/graphql-spec/blob/c630301560d9819d33255d3ba00f548e8abbcdc6/spec/Section%207%20--%20Response.md#incremental
// https://github.com/graphql/defer-stream-wg/discussions/69
const buildResponse = (responses, strategy = types_1.MultiResponseStrategy.AUTO) => {
    switch (strategy) {
        case types_1.MultiResponseStrategy.CONCATENATE:
            return buildResponse__concatenate(responses);
        case types_1.MultiResponseStrategy.APPEND:
            return buildResponse__append(responses);
        case types_1.MultiResponseStrategy.PATCH:
            return buildResponse__patch(responses);
        case types_1.MultiResponseStrategy.AUTO: {
            const firstResponse = responses[0];
            const parsedFirstResponse = (0, json_1.parseJson)(firstResponse?.content ?? '', {
                defaultValue: null,
            });
            // if response[0] is not a JSON object, then concatenate
            if (!parsedFirstResponse || typeof parsedFirstResponse !== 'object') {
                return buildResponse__concatenate(responses);
            }
            // if response[0] is patchable, then patch
            if ('data' in parsedFirstResponse && 'hasNext' in parsedFirstResponse) {
                return buildResponse__patch(responses);
            }
            // otherwise append
            return buildResponse__append(responses);
        }
        default:
            throw new Error('Invalid strategy');
    }
};
exports.buildResponse = buildResponse;
const buildResponse__concatenate = (responses) => {
    const content = responses.map((r) => r.content).join('');
    const parsedContent = (0, json_1.parseJson)(content, { defaultValue: null });
    return [
        {
            content: parsedContent ? JSON.stringify(parsedContent, null, 2) : content,
            timestamp: responses.at(-1)?.timestamp ?? 0,
            json: !!parsedContent, // if parsedContent is not null, then it's JSON
        },
    ];
};
const buildResponse__append = (responses) => {
    return responses;
};
const buildResponse__patch = (responses) => {
    if (responses.length === 0) {
        return [];
    }
    // first response is the same shape as a standard GraphQL response
    const obj = (0, json_1.parseJson)(responses[0]?.content ?? '', {
        defaultValue: null,
    });
    if (!obj) {
        throw new Error('JSON response required for patching!');
    }
    // remove hasNext field from obj (since it's just used for patching)
    Reflect.deleteProperty(obj, 'hasNext');
    for (let i = 1; i < responses.length; i++) {
        const nextObj = (0, json_1.parseJson)(responses[i]?.content ?? '', { defaultValue: null });
        if (!nextObj) {
            throw new Error('JSON response required for patching!');
        }
        patchResponse(obj, nextObj);
    }
    // TODO: Handle cases with labels
    // return the patched response
    return [
        {
            content: JSON.stringify(obj, null, 2),
            timestamp: responses.at(0)?.timestamp ?? 0,
            json: true, // always JSON for patched responses
        },
    ];
};
const patchResponse = (obj, nextData) => {
    const result = { ...obj };
    const errors = result.errors ? result.errors : [];
    const extensions = {
        ...result.extensions,
        ...('extensions' in nextData ? nextData.extensions : {}),
    };
    if (nextData.errors) {
        errors.push(...nextData.errors);
    }
    if ('path' in nextData) {
        // old version of the incremental delivery payloads
        // https://github.com/graphql/graphql-over-http/blob/d80afd45782b40a9a8447fcff3d772689d83df56/rfcs/IncrementalDelivery.md
        nextData = {
            ...nextData,
            incremental: [
                {
                    data: nextData.data ?? null,
                    path: nextData.path,
                },
            ],
            hasNext: true,
        };
    }
    if (nextData.hasNext && nextData.incremental) {
        for (const patch of nextData.incremental) {
            if (Array.isArray(patch.errors)) {
                errors.push(...patch.errors);
            }
            if (patch.extensions) {
                Object.assign(extensions, patch.extensions);
            }
            const path = ['data', ...patch.path];
            if ('data' in patch) {
                // @defer patch
                // set the data at the path in result
                if (patch.data) {
                    result.data = result.data ?? {};
                    (0, dot_notation_1.setByDotNotation)(result, path, patch.data, true);
                }
            }
            if ('items' in patch) {
                // @stream patch
                patch.items?.forEach((item, i) => {
                    const lastPathIdx = path[path.length - 1];
                    if (typeof lastPathIdx !== 'number') {
                        throw new Error('Path for stream incremental payload should end with a number!');
                    }
                    // for each item, we want to place it at the end of the array
                    const newPath = [...path.slice(0, -1), lastPathIdx + i];
                    (0, dot_notation_1.setByDotNotation)(result, newPath, item);
                });
            }
        }
    }
    return {
        ...result,
        ...(errors.length && { errors }),
        ...(Object.keys(extensions).length && { extensions }),
    };
};
//# sourceMappingURL=response-builder.js.map