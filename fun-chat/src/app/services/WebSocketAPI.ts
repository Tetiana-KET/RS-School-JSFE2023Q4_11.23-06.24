import type { AuthMessage, CurrentUser, RequestForAllUsers } from '../interfaces';
import { generateRandomNumber, getUserIdFromSessionStorage, setSessionStorage } from '../utils/commonUtils';
import { eventBus } from '../utils/eventBus';

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

  public userAuthentication(message: AuthMessage): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify(message));
      });
    }
    const currentUser: CurrentUser = {
      login: message.payload.user.login,
      password: message.payload.user.password,
      isLogined: false,
      id: message.id,
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
      const currentUserString = sessionStorage.getItem('user');
      if (currentUserString) {
        const currentUser: CurrentUser = JSON.parse(currentUserString);
        currentUser.isLogined = responseData.payload.user.isLogined;
        setSessionStorage(currentUser);
      }
    }

    if (responseData.type === 'USER_LOGOUT') {
      sessionStorage.clear();
      window.location.hash = '';
      eventBus.emit('userLoggedOut', responseData);
    }

    if (responseData.type === 'USER_ACTIVE') {
      eventBus.emit('USER_ACTIVE_data', responseData);
      console.log('USER_ACTIVE_data', responseData);
    }

    if (responseData.type === 'USER_INACTIVE') {
      eventBus.emit('USER_INACTIVE_data', responseData);
      console.log('USER_INACTIVE_data', responseData);
    }
  }
}
