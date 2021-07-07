declare namespace OIPF {
    export interface Collection<T> {
        readonly length: number;
        item(index: number): T;
    }
}
