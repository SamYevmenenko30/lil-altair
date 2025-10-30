import { ValueObject } from '../../utils/value-object';
export declare const WORKSPACES: {
    LOCAL: string;
    REMOTE: string;
};
export declare class WorkspaceId extends ValueObject<string> {
    constructor(props?: string);
}
export interface Workspace {
    id: string;
    name: string;
    teamId?: string;
}
export interface WorkspacesState {
    list: Workspace[];
}
//# sourceMappingURL=workspace.interface.d.ts.map