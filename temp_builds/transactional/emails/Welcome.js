"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeEmail = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var components_1 = require("@react-email/components");
var WelcomeEmail = function (_a) {
    var _b = _a.username, username = _b === void 0 ? 'User' : _b;
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: "Welcome to Altair GraphQL Cloud" }), (0, jsx_runtime_1.jsx)(components_1.Tailwind, { config: {
                    theme: {
                        extend: {
                            colors: {
                                brand: '#64CB29',
                                offwhite: '#fafbfb',
                            },
                            spacing: {
                                0: '0px',
                                20: '20px',
                                45: '45px',
                            },
                        },
                    },
                }, children: (0, jsx_runtime_1.jsxs)(components_1.Body, { className: "bg-offwhite text-base font-sans", children: [(0, jsx_runtime_1.jsx)(components_1.Img, { src: "https://altairgraphql.dev/assets/img/altair_logo_128.png", width: "100", height: "100", alt: "Altair GraphQL Cloud", className: "mx-auto my-20" }), (0, jsx_runtime_1.jsxs)(components_1.Container, { className: "bg-white p-45", children: [(0, jsx_runtime_1.jsx)(components_1.Heading, { className: "text-center my-0 leading-8", children: "Welcome to Altair GraphQL Cloud" }), (0, jsx_runtime_1.jsx)(components_1.Section, { children: (0, jsx_runtime_1.jsxs)(components_1.Row, { children: [(0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-base", children: ["Hey ", username, "! \uD83D\uDC4B\uD83C\uDFFE"] }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "text-base", children: "I'm Samuel, the creator of Altair GraphQL Client. Thanks so much for subscribing to Altair GraphQL Cloud!" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "text-base", children: "I'd love to hear what made you choose Altair Premium and what features you're most excited about. Just hit reply and let me know your thoughts!" }), (0, jsx_runtime_1.jsx)(components_1.Text, { className: "text-base", children: "In the meantime, you can get started by checking out the docs" })] }) }), (0, jsx_runtime_1.jsx)(components_1.Section, { className: "text-center", children: (0, jsx_runtime_1.jsx)(components_1.Button, { className: "bg-brand text-white rounded-md py-3 px-[18px] block", href: "https://altairgraphql.dev/docs/cloud/", children: "Get Started" }) })] })] }) })] }));
};
exports.WelcomeEmail = WelcomeEmail;
exports.default = exports.WelcomeEmail;
//# sourceMappingURL=Welcome.js.map