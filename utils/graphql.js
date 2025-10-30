import { Kind, parse } from 'graphql';
const getEmptyDocumentNode = () => {
    return {
        definitions: [],
        kind: Kind.DOCUMENT,
    };
};
const parseQueryOrEmptyDocument = (query) => {
    if (!query) {
        return getEmptyDocumentNode();
    }
    try {
        return parse(query);
    }
    catch (err) {
        console.error('Error parsing query, returning empty instead', err);
        return getEmptyDocumentNode();
    }
};
export const getOperations = (query) => {
    const parsedQuery = parseQueryOrEmptyDocument(query);
    if (parsedQuery.definitions) {
        return parsedQuery.definitions.filter((def) => !!(def.kind === 'OperationDefinition' && def.name?.value));
    }
    return [];
};
//# sourceMappingURL=graphql.js.map