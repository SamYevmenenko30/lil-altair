export const urlMap = {
    development: {
        api: 'http://localhost:3000',
        loginClient: 'http://localhost:1234',
        sandbox: 'http://localhost:5123',
        docs: 'http://localhost:6025',
    },
    production: {
        api: undefined ?? 'https://api.altairgraphql.dev',
        loginClient: undefined ??
            'https://redir.altairgraphql.dev',
        sandbox: undefined ??
            'https://sandbox.altairgraphql.dev',
        docs: undefined ?? 'https://altairgraphql.dev',
    },
    testing: {
        api: 'http://localhost:3000',
        loginClient: 'http://localhost:1234',
        sandbox: 'http://localhost:5123',
        docs: 'http://localhost:6025',
    },
};
//# sourceMappingURL=urls.js.map