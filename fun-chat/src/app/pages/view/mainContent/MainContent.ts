import { AboutPage } from '../../aboutPage/AboutPage';
import { ChatPage } from '../../chatPage/ChatPage';
import { LoginPage } from '../../loginPage/LoginPage';
import { Router } from '../../Router';
import { Component } from '../../../components/Component';
import classes from './MainContent.module.css';
import { isLoggedFromSessionStorage, setUserNameInHeader } from '../../../utils/commonUtils';

export class MainContent extends Component<'main'> {
  private router: Router;
  private loginPage: LoginPage;
  private aboutPage: AboutPage;
  private chatPage: ChatPage;
  constructor() {
    super('main', { className: `${classes.main}`, id: 'main' });

    this.loginPage = new LoginPage();
    this.aboutPage = new AboutPage();
    this.chatPage = new ChatPage();
    this.appendChild(this.loginPage);

    this.router = new Router(this.setPageContent.bind(this));
    console.log(this.router);
    window.addEventListener('unload', () => {
      this.setPageContent();
    });
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
      if (userInfo) {
        userInfo.textContent = `User: ${setUserNameInHeader()}`;
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

  private drawAboutPage(): void {
    this.destroyChildren();
    this.aboutPage = new AboutPage();
    this.appendChild(this.aboutPage);
  }

  private drawChatPage(): void {
    this.destroyChildren();
    this.chatPage = new ChatPage();
    this.appendChild(this.chatPage);
  }

  private drawLoginPage(): void {
    this.destroyChildren();
    this.loginPage = new LoginPage();
    this.appendChild(this.loginPage);
  }
}
