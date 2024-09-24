export type Json<T> = {
  [K in keyof T]: T[K] extends number | string | boolean
    ? T[K]
    : T[K] extends Date
    ? string
    : T[K] extends Array<infer U>
    ? Json<U>[]
    : Json<T[K]>;
};
