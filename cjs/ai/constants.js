"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMaxTokens = exports.maxGraphqlVariablesChars = exports.maxGraphqlVariablesTokens = exports.maxGraphqlQueryChars = exports.maxGraphqlQueryTokens = exports.maxSdlChars = exports.maxSdlTokens = exports.maxMessageChars = exports.maxMessageTokens = exports.maxTotalChars = exports.maxTotalSessionTokens = void 0;
// https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
const avgCharsPerToken = 5; // assumed average characters per token
exports.maxTotalSessionTokens = 50000;
exports.maxTotalChars = exports.maxTotalSessionTokens * avgCharsPerToken;
exports.maxMessageTokens = 300;
exports.maxMessageChars = exports.maxMessageTokens * avgCharsPerToken;
exports.maxSdlTokens = 4096;
exports.maxSdlChars = exports.maxSdlTokens * avgCharsPerToken;
exports.maxGraphqlQueryTokens = 1000;
exports.maxGraphqlQueryChars = exports.maxGraphqlQueryTokens * avgCharsPerToken;
exports.maxGraphqlVariablesTokens = 150;
exports.maxGraphqlVariablesChars = exports.maxGraphqlVariablesTokens * avgCharsPerToken;
exports.responseMaxTokens = 2500;
//# sourceMappingURL=constants.js.map