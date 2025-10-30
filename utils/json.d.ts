/**
 * Parses a JSON string into an object. Has support for BigInt and falls back to a default value if parsing fails.
 */
export declare const parseJson: <R = Record<string, unknown>, T = unknown>(str: string, { defaultValue }?: {
    defaultValue?: unknown;
}) => R | T;
//# sourceMappingURL=json.d.ts.map