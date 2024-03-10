type NullLike = null | undefined;
type Nullable<T> = T | NullLike;

export function isNull<T>(value: Nullable<T>): value is NullLike {
  return value === null || value === undefined;
}

export function isNotNull<T>(value: Nullable<T>): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function storeUserData(firstName: string, surname: string): void {
  const userData = { firstName, surname };
  localStorage.setItem('userData', JSON.stringify(userData));
}
