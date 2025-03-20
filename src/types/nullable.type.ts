export type Nullable<T> = T | null | undefined;

export type Nullish<T> = T extends null | undefined ? T : never;

export function isNullish<T>(value: T): value is Nullish<T> {
  return value === null || value === undefined;
}

