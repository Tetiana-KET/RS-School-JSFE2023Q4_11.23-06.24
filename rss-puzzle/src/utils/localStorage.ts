export function storeUserData(
  firstName: string,
  surname: string,
  isLoggedIn: boolean,
  pronounceEnabled: boolean = true,
  translateEnabled: boolean = true,
  bgImageHintEnabled: boolean = true
): void {
  const userData = { firstName, surname, isLoggedIn, pronounceEnabled, translateEnabled, bgImageHintEnabled };
  localStorage.setItem('userData', JSON.stringify(userData));
}

//get user name
export function getUserInfoFromLocalStorage(): {
  [key: string]: string | boolean;
} | null {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Update the existing object in local storage
export function updateLocalStorage(objToUpdate: string, newProperty: string, value: string | boolean): void {
  const objString = localStorage.getItem(objToUpdate);
  let obj: {
    [key: string]: string | boolean;
  } = objString ? JSON.parse(objString) : {};

  obj[newProperty] = value;
  localStorage.setItem(objToUpdate, JSON.stringify(obj));
}

export function checkLocalStoragePropertyFlag(userDataObject: string, propertyToCheck: string): boolean {
  const objString = localStorage.getItem(userDataObject);
  let obj: {
    [key: string]: boolean;
  } = objString ? JSON.parse(objString) : {};

  return obj[propertyToCheck];
}
