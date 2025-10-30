"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const dot_notation_1 = require("./dot-notation");
(0, globals_1.describe)('setByDotNotation', () => {
    (0, globals_1.it)('should correctly set value by dot notation', () => {
        const obj = {};
        const existingObj = { a: 1, b: { c: 2 } };
        // set to empty path
        (0, dot_notation_1.setByDotNotation)(obj, 'a.b', 3);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3 } });
        // set to existing object in path
        (0, dot_notation_1.setByDotNotation)(obj, 'a.c', 4);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3, c: 4 } });
        // set to new array
        (0, dot_notation_1.setByDotNotation)(obj, 'a.d.1', 5);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3, c: 4, d: [undefined, 5] } });
        // set to existing array
        (0, dot_notation_1.setByDotNotation)(obj, 'a.d.0', 6);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3, c: 4, d: [6, 5] } });
        // set existing value
        (0, dot_notation_1.setByDotNotation)(obj, 'a.c', 7);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3, c: 7, d: [6, 5] } });
        // set new object inside array
        (0, dot_notation_1.setByDotNotation)(obj, 'a.d.2.x', 8);
        (0, globals_1.expect)(obj).toEqual({ a: { b: 3, c: 7, d: [6, 5, { x: 8 }] } });
        // set new object inside existing object
        (0, dot_notation_1.setByDotNotation)(existingObj, 'b.e.f', 9);
        (0, globals_1.expect)(existingObj).toEqual({ a: 1, b: { c: 2, e: { f: 9 } } });
        // set object inside existing object
        (0, dot_notation_1.setByDotNotation)(existingObj, 'b.e', { g: 10 });
        (0, globals_1.expect)(existingObj).toEqual({ a: 1, b: { c: 2, e: { g: 10 } } });
        // set object inside existing object with merge
        (0, dot_notation_1.setByDotNotation)(existingObj, 'b.e', { h: 11 }, true);
        (0, globals_1.expect)(existingObj).toEqual({ a: 1, b: { c: 2, e: { g: 10, h: 11 } } });
    });
});
//# sourceMappingURL=dot-notation.spec.js.map