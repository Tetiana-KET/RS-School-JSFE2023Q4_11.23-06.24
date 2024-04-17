import type { CurrentUser, UserLoginResponse } from '../interfaces';
import type { ConstructorOf, Nullable, NullLike } from './types';

export function isNull<T>(value: Nullable<T>): value is NullLike {
  return value === null || value === undefined;
}

export function isNotNull<T>(value: Nullable<T>): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isSome<T>(value: unknown): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isInstanceOf<T>(elemType: ConstructorOf<T>, value: unknown): value is T {
  return value instanceof elemType;
}

export function isHTMLElementTag<Tag extends keyof HTMLElementTagNameMap>(value: unknown): value is Tag {
  return typeof value === 'string';
}

export function checkLocalStoragePropertyFlag(userDataObject: string, propertyToCheck: string): boolean {
  const objString = localStorage.getItem(userDataObject);
  const obj: {
    [key: string]: boolean;
  } = objString ? JSON.parse(objString) : {};

  return obj[propertyToCheck];
}

// Update the existing object in local storage
export function updateLocalStorage(objToUpdate: string, newProperty: string, value: string | boolean): void {
  const objString = localStorage.getItem(objToUpdate);
  const obj: {
    [key: string]: string | boolean;
  } = objString ? JSON.parse(objString) : {};

  obj[newProperty] = value;
  localStorage.setItem(objToUpdate, JSON.stringify(obj));
}

// get user name
export function getUserInfoFromLocalStorage(): {
  [key: string]: string | boolean;
} | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// generate random number
export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 10000) + 1;
}

// set user to session storage
export function setSessionStorage(response: UserLoginResponse): void {
  const currentUser: CurrentUser = {
    login: response.payload.user.login,
    isLogined: response.payload.user.isLogined,
    id: response.id,
  };

  console.log(`currentUser `, currentUser);
  const userString = JSON.stringify(currentUser);
  sessionStorage.setItem('user', userString);
}

// get user from session storage
export function getUserFromSessionStorage(): CurrentUser | null {
  // Retrieve the user string from sessionStorage
  const userString = sessionStorage.getItem('user');
  // If userString is null, return null
  if (!userString) {
    return null;
  }
  // Parse the user string back to an object using JSON.parse
  return JSON.parse(userString);
}
