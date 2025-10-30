"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperations = void 0;
const graphql_1 = require("graphql");
const getEmptyDocumentNode = () => {
    return {
        definitions: [],
        kind: graphql_1.Kind.DOCUMENT,
    };
};
const parseQueryOrEmptyDocument = (query) => {
    if (!query) {
        return getEmptyDocumentNode();
    }
    try {
        return (0, graphql_1.parse)(query);
    }
    catch (err) {
        console.error('Error parsing query, returning empty instead', err);
        return getEmptyDocumentNode();
    }
};
const getOperations = (query) => {
    const parsedQuery = parseQueryOrEmptyDocument(query);
    if (parsedQuery.definitions) {
        return parsedQuery.definitions.filter((def) => !!(def.kind === 'OperationDefinition' && def.name?.value));
    }
    return [];
};
exports.getOperations = getOperations;
//# sourceMappingURL=graphql.js.map