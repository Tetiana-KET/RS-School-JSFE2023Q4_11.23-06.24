type NullLike = null | undefined;
type Nullable<T> = T | NullLike;

export function isNullable<T>(value: Nullable<T>): value is NullLike {
  return value === null || value === undefined;
}

export function isNotNullable<T>(value: Nullable<T>): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
