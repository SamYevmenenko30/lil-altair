export declare const secureRandomString: (length?: number) => string;
export declare const base64EncodeSafe: (str: string) => string;
export declare const base64UrlEncode: (buffer: ArrayBuffer) => string;
export declare const sha256: (str: string) => Promise<ArrayBuffer>;
export declare const hex: (buffer: ArrayBuffer) => string;
export declare const getCodeChallenge: (codeVerifier: string) => Promise<string>;
//# sourceMappingURL=helpers.d.ts.map