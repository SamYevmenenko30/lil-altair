import { ValueObject } from '../../utils/value-object';
export const WORKSPACES = {
    LOCAL: 'local',
    REMOTE: 'remote',
};
export class WorkspaceId extends ValueObject {
    constructor(props = WORKSPACES.LOCAL) {
        super(props);
    }
}
//# sourceMappingURL=workspace.interface.js.map