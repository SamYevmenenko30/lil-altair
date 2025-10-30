"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceId = exports.WORKSPACES = void 0;
const value_object_1 = require("../../utils/value-object");
exports.WORKSPACES = {
    LOCAL: 'local',
    REMOTE: 'remote',
};
class WorkspaceId extends value_object_1.ValueObject {
    constructor(props = exports.WORKSPACES.LOCAL) {
        super(props);
    }
}
exports.WorkspaceId = WorkspaceId;
//# sourceMappingURL=workspace.interface.js.map