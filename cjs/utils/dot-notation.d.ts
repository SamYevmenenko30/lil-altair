/**
 * Sets value to object using dot notation.
 * @param obj Object to set the value to.
 * @param path Path as a string, separated by dots.
 * @param value Any value to be set.
 * @example
 * ```ts
 * const obj = { a: 1, b: { c: 2 } };
 * setByDotNotation(obj, "b.d.e.0", 3);
 * // results in
 * { a: 1, b: { c: 2, d: { e: [3] } } };
 * ```
 */
export declare function setByDotNotation<TResult = unknown>(obj: Record<string, any>, path: Array<number | string> | number | string, value: TResult, merge?: boolean): TResult | undefined;
//# sourceMappingURL=dot-notation.d.ts.map