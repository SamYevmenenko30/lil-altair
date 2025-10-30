"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a5208855-cf53-52d1-8c17-c5172caa3dba")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = void 0;
/* eslint-disable no-console */
const log = (...args) => {
    console.log(...args);
};
exports.log = log;
const error = (...args) => {
    console.error(...args);
};
exports.error = error;
//# sourceMappingURL=log.js.map
//# debugId=a5208855-cf53-52d1-8c17-c5172caa3dba
