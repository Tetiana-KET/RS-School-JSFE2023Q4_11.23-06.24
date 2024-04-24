import type { MessageData, MSGSentServerResponse, User } from '../interfaces';
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
export function setSessionStorage(user: User): void {
  const userString = JSON.stringify(user);
  sessionStorage.setItem('user', userString);
}

// get user from session storage
export function getUserFromSessionStorage(): User | null {
  const userString = sessionStorage.getItem('user');
  if (!userString) {
    return null;
  }
  return JSON.parse(userString);
}

// update session storage
export function updateSessionStorage(isLogged: boolean): void {
  const currentUserString = sessionStorage.getItem('user');
  if (currentUserString) {
    const currentUser: User = JSON.parse(currentUserString);
    currentUser.isLogined = isLogged;
    setSessionStorage(currentUser);
  }
}

export function getUserIdFromSessionStorage(): string {
  const userString = sessionStorage.getItem('user') || '';
  const currentUser: User = JSON.parse(userString);
  return currentUser.id || '';
}

export function isLoggedFromSessionStorage(): boolean {
  const userString = sessionStorage.getItem('user') || '';
  if (userString) {
    const currentUser: User = JSON.parse(userString);
    return currentUser.isLogined || false;
  }
  return false;
}

export function setUserNameInHeader(): string {
  const currentUserString = sessionStorage.getItem('user');
  let userName;
  if (currentUserString) {
    const currentUser: User = JSON.parse(currentUserString);
    userName = currentUser.login;
  }
  return userName || '';
}

export function formatDateTimeFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export function getCurrentDateTime(): string {
  const currentDate = new Date();

  // Получаем день, месяц и год
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  // Получаем часы, минуты и секунды
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  // Форматируем дату и время в нужном формате
  const formattedDateTime = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export function scrollToNewMessage(container: HTMLElement, messageBlock: HTMLElement): void {
  const dialogBody = container;
  // Вычисляем высоту контейнера и высоту окна просмотра
  const containerHeight = dialogBody.clientHeight;
  const windowHeight = window.innerHeight;

  // Если контейнер не заполнен до конца окна просмотра, прокручиваем до самого низа
  if (dialogBody.scrollHeight <= windowHeight) {
    dialogBody.scrollTop = dialogBody.scrollHeight;
  } else {
    // Вычисляем, сколько прокрутить, чтобы первое новое сообщение было видно внизу контейнера
    const newMessageHeight = messageBlock.offsetHeight;
    const newScrollTop = dialogBody.scrollHeight - containerHeight + newMessageHeight;

    // Прокручиваем контейнер до новой позиции прокрутки
    dialogBody.scrollTop = newScrollTop;
  }
}

export function getMessageStatus(status: { isDelivered?: boolean; isReaded?: boolean; isEdited?: boolean }): string {
  switch (true) {
    case status.isReaded || status.isEdited:
      return 'edited';
    case status.isReaded && !status.isEdited:
      return 'read';
    case status.isReaded || status.isDelivered:
      return 'delivered';
    default:
      return 'sent';
  }
}

export function setOptions(responseData: MSGSentServerResponse): MessageData {
  const { id } = responseData.payload.message;
  const { datetime } = responseData.payload.message;
  const { text } = responseData.payload.message;
  const { from } = responseData.payload.message;
  const { to } = responseData.payload.message;
  const { status } = responseData.payload.message;

  const options = { datetime, status, text, from, to, id };
  return options;
}
