import type { AuthMessage, RequestForAllUsers, User } from '../interfaces';
import { generateRandomNumber, getUserIdFromSessionStorage, setSessionStorage, updateSessionStorage } from '../utils/commonUtils';
import { eventBus, eventGetUsersBus, eventExternalUserBus } from '../utils/eventBus';

export class WebSocketAPI {
  public ws: WebSocket;
  public errorMessage = '';

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:4000');
  }

  public userAuthentication(userData: User): void {
    const authMessage: AuthMessage = {
      id: generateRandomNumber().toString(),
      type: 'USER_LOGIN',
      payload: {
        user: userData,
      },
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(authMessage));
    } else {
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify(authMessage));
      });
    }

    const currentUser: User = {
      login: authMessage.payload.user.login,
      password: authMessage.payload.user.password,
      isLogined: false,
      id: authMessage.id,
    };
    setSessionStorage(currentUser);
  }

  public userLogout(login: string, password: string): void {
    const message: AuthMessage = {
      id: getUserIdFromSessionStorage(),
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.ws.send(JSON.stringify(message));
  }

  public getAllAuthenticatedUsers(): void {
    const message: RequestForAllUsers = {
      id: generateRandomNumber().toString(),
      type: 'USER_ACTIVE',
      payload: null,
    };
    this.ws.send(JSON.stringify(message));
  }

  public getAllUnauthorizedUsers(): void {
    const message: RequestForAllUsers = {
      id: generateRandomNumber().toString(),
      type: 'USER_INACTIVE',
      payload: null,
    };
    this.ws.send(JSON.stringify(message));
  }

  private handleMessage(event: MessageEvent): void {
    const responseData = JSON.parse(event.data);
    if (responseData.type === 'ERROR') {
      this.errorMessage = responseData.payload.error;
      eventBus.emit('authError', responseData.payload.error);
    }
    if (responseData.type === 'USER_LOGIN') {
      eventBus.emit('successLogin', responseData);
      window.location.hash = '#chat';
      const { isLogined } = responseData.payload.user;
      updateSessionStorage(isLogined);
    }
    if (responseData.type === 'USER_LOGOUT') {
      sessionStorage.clear();
      window.location.hash = '';
      eventBus.emit('userLoggedOut', responseData);
    }
    if (responseData.type === 'USER_ACTIVE') {
      eventGetUsersBus.emit('USER_ACTIVE_data', responseData);
    }
    if (responseData.type === 'USER_INACTIVE') {
      eventGetUsersBus.emit('USER_INACTIVE_data', responseData);
    }
    if (responseData.type === 'USER_EXTERNAL_LOGIN') {
      eventExternalUserBus.emit('USER_EXTERNAL_LOGIN', responseData);
    }
    if (responseData.type === 'USER_EXTERNAL_LOGOUT') {
      eventExternalUserBus.emit('USER_EXTERNAL_LOGOUT', responseData);
    }
  }

  public start(): void {
    this.ws.addEventListener('message', this.handleMessage.bind(this));
  }
}
