import { IDictionary } from '../shared';
export interface InitialBaseEnvironmentState {
    id?: string;
    title?: string;
    variables?: IDictionary;
}
export interface InitialEnvironmentState {
    id?: string;
    title?: string;
    variables?: IDictionary;
}
export interface IInitialEnvironments {
    activeSubEnvironment?: string;
    base?: InitialBaseEnvironmentState;
    subEnvironments?: InitialEnvironmentState[];
}
export interface BaseEnvironmentState {
    id?: string;
    variablesJson: string;
}
export interface EnvironmentState {
    id?: string;
    title: string;
    variablesJson: string;
}
export interface ExportEnvironmentState extends InitialEnvironmentState {
    version: 1;
    type: 'environment';
}
export interface EnvironmentsState {
    base: BaseEnvironmentState;
    subEnvironments: EnvironmentState[];
    activeSubEnvironment?: string;
}
export interface IEnvironment extends IDictionary {
    headers?: IDictionary<string>;
    accentColor?: string;
}
export declare const ENVIRONMENT_VARIABLE_SOURCE_TYPE: {
    /**
     * Base environment
     */
    readonly BASE_ENVIRONMENT: "base";
    /**
     * Sub environment
     */
    readonly SUB_ENVIRONMENT: "sub";
    /**
     * Collection environment
     */
    readonly COLLECTION: "collection";
};
export type EnvironmentVariableSourceType = (typeof ENVIRONMENT_VARIABLE_SOURCE_TYPE)[keyof typeof ENVIRONMENT_VARIABLE_SOURCE_TYPE];
export interface EnvironmentVariableData {
    key: string;
    value: unknown;
    /**
     * The source type of the environment variable
     */
    sourceType: EnvironmentVariableSourceType;
    /**
     * The name of the source, for display purposes
     */
    sourceName: string;
}
export type EnvironmentVariables = Record<string, EnvironmentVariableData>;
//# sourceMappingURL=environments.interfaces.d.ts.map