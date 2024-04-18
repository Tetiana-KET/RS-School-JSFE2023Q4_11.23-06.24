import type { AuthMessage, RequestForAllUsers, User } from '../interfaces';
import { generateRandomNumber, getUserIdFromSessionStorage, setSessionStorage } from '../utils/commonUtils';
import { eventBus, eventGetUsersBus } from '../utils/eventBus';

export class WebSocketAPI {
  public ws: WebSocket;
  public errorMessage = '';

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:4000');
    this.ws.addEventListener('message', this.handleMessage.bind(this));
    this.ws.addEventListener('open', () => {
      this.getAllAuthenticatedUsers();
      this.getAllUnauthorizedUsers();
    });
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
    console.log(`USER_LOGOUT REQUEST message`, message);
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
      console.log('USER_LOGIN RESPONSE');
      eventBus.emit('successLogin', responseData);
      window.location.hash = '#chat';
      const currentUserString = sessionStorage.getItem('user');
      if (currentUserString) {
        const currentUser: User = JSON.parse(currentUserString);
        currentUser.isLogined = responseData.payload.user.isLogined;
        setSessionStorage(currentUser);
      }
    }

    if (responseData.type === 'USER_LOGOUT') {
      console.log('USER_LOGOUT RESPONSE');
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
  }
}
