import { AboutPage } from '../../aboutPage/AboutPage';
import { ChatPage } from '../../chatPage/ChatPage';
import { LoginPage } from '../../loginPage/LoginPage';
import { Router } from '../../Router';
import { Component } from '../../../components/Component';
import classes from './MainContent.module.css';
import { getUserFromSessionStorage, isLoggedFromSessionStorage, setUserNameInHeader } from '../../../utils/commonUtils';
import type { WebSocketAPI } from '../../../services/WebSocketAPI';
import type { AuthMessage, User } from '../../../interfaces';
import { ChatController } from '../../../controllers/chatController';

export class MainContent extends Component<'main'> {
  private router: Router;
  private loginPage: LoginPage;
  private aboutPage: AboutPage;
  private chatPage: ChatPage;
  public webSocketAPI: WebSocketAPI;
  private chatController: ChatController;

  constructor(webSocketAPI: WebSocketAPI) {
    super('main', { className: `${classes.main}`, id: 'main' });
    this.webSocketAPI = webSocketAPI;
    this.loginPage = new LoginPage(this.webSocketAPI);
    this.aboutPage = new AboutPage();
    this.chatPage = new ChatPage();
    this.chatController = new ChatController(this.webSocketAPI, this.chatPage);
    this.appendChild(this.loginPage);
    this.router = new Router(this.setPageContent.bind(this));
    console.log(this.router);
    window.addEventListener('unload', () => {
      this.setPageContent();
    });
    this.chatController.start();
  }

  private setPageContent(): void {
    const location = window.location.hash;

    if (!isLoggedFromSessionStorage()) {
      if (location === '#chat') {
        window.location.hash = '';
      }
    }

    if (isLoggedFromSessionStorage()) {
      const userInfo = document.getElementById('userInfo');
      const currUser = getUserFromSessionStorage();
      if (userInfo) {
        userInfo.textContent = `${setUserNameInHeader()}`;
      }
      if (currUser) {
        this.reLogUser(currUser);
      }
    }

    if (location === '') {
      this.drawLoginPage();
    } else if (location === '#chat') {
      this.drawChatPage();
    } else if (location === '#about') {
      this.drawAboutPage();
    }
  }

  private reLogUser(currUser: User): void {
    const authMessage: AuthMessage = {
      id: currUser.id || '',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: currUser.login,
          password: currUser.password,
        },
      },
    };
    if (this.webSocketAPI.ws.readyState === WebSocket.OPEN) {
      this.webSocketAPI.ws.send(JSON.stringify(authMessage));
    } else {
      this.webSocketAPI.ws.addEventListener('open', () => {
        this.webSocketAPI.ws.send(JSON.stringify(authMessage));
      });
    }
  }

  private drawAboutPage(): void {
    this.destroyChildren();
    this.aboutPage = new AboutPage();
    this.appendChild(this.aboutPage);
  }

  private drawChatPage(): void {
    this.destroyChildren();
    this.chatPage = new ChatPage();
    this.appendChild(this.chatPage);
    if (this.webSocketAPI.ws.readyState === WebSocket.OPEN) {
      this.webSocketAPI.getAllAuthenticatedUsers();
      this.webSocketAPI.getAllUnauthorizedUsers();
    } else {
      this.webSocketAPI.ws.addEventListener('open', () => {
        this.webSocketAPI.getAllAuthenticatedUsers();
        this.webSocketAPI.getAllUnauthorizedUsers();
      });
    }
  }

  private drawLoginPage(): void {
    this.destroyChildren();
    this.loginPage = new LoginPage(this.webSocketAPI);
    this.appendChild(this.loginPage);
  }
}
