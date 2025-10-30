export class ValueObject {
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
//# sourceMappingURL=value-object.js.map