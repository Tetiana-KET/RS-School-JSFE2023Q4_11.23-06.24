import type { UserLoginResponse } from '../interfaces';

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
export const eventSuccessLoginBus = new EventBus<UserLoginResponse>();
