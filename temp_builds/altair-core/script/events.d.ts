import { ScriptResponseEvent } from './types';
export declare const SCRIPT_INIT_EXECUTE = "init_execute";
export declare const getResponseEvent: <T extends string>(type: T) => ScriptResponseEvent<T>;
export declare const getErrorEvent: (type: string) => string;
//# sourceMappingURL=events.d.ts.map