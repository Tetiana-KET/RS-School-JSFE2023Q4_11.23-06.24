import type { EventResponse, User, UsersResponseData } from '../interfaces';

type Listener<T> = (data: T) => void;

class EventBus<T> {
  private listeners: { [key: string]: Listener<T>[] } = {};

  subscribe(eventType: string, listener: Listener<T>): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  emit(eventType: string, data: T): void {
    const eventListeners = this.listeners[eventType];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }
}

export const eventBus = new EventBus<Event>();
export const eventGetUsersBus = new EventBus<UsersResponseData>();
export const eventExternalUserBus = new EventBus<EventResponse>();
export const eventNewUserAuthBus = new EventBus<User>();
export const eventSearchInputChangedBus = new EventBus<string>();
