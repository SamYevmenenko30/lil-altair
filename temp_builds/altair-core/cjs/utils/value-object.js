"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    value() {
        return this.props;
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        // return shallowEqual(this.props, vo.props)
        return this.props === vo.props;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.js.map