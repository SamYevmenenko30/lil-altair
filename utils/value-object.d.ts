export declare abstract class ValueObject<T> {
    readonly props: T;
    constructor(props: T);
    value(): T;
    equals(vo?: ValueObject<T>): boolean;
}
//# sourceMappingURL=value-object.d.ts.map