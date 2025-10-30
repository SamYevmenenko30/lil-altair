import { GlobalContextBuilderHandlers, GlobalHelperContext, ModuleImportsMap, ScriptContextData, ScriptContextResponse } from './types';
export declare const ModuleImports: ModuleImportsMap;
export declare const buildContextResponse: (data: ScriptContextData) => ScriptContextResponse | undefined;
export declare const importModuleHelper: (moduleName: string) => Promise<unknown>;
export declare const getGlobalContext: (data: ScriptContextData, handlers: GlobalContextBuilderHandlers) => GlobalHelperContext;
//# sourceMappingURL=context.d.ts.map