import { Controller } from '../../controllers/Controller';
import { AboutPage } from '../../pages/aboutPage/AboutPage';
import { ChatPage } from '../../pages/chatPage/ChatPage';
import { LoginPage } from '../../pages/loginPage/LoginPage';
import { Router } from '../../pages/Router';
import { eventBus } from '../../utils/eventBus';
import { Component } from '../Component';
import classes from './MainContent.module.css';

export class MainContent extends Component<'main'> {
  private controller: Controller;
  private router: Router;
  private loginPage: LoginPage;
  private aboutPage: AboutPage;
  private chatPage: ChatPage;
  constructor() {
    super('main', { className: `${classes.main}`, id: 'main' });
    this.controller = new Controller();
    this.loginPage = new LoginPage();
    this.aboutPage = new AboutPage();
    this.chatPage = new ChatPage();
    this.appendChild(this.loginPage);

    this.router = new Router(this.setPageContent.bind(this));

    eventBus.subscribe('aboutBtnClicked', this.setPageContent.bind(this));
    eventBus.subscribe('successLogin', this.setPageContent.bind(this));
    eventBus.subscribe('logout', this.setPageContent.bind(this));
  }

  private setPageContent(): void {
    const location = window.location.hash;
    if (location === '') {
      this.navigateToLoginPage();
    } else if (location === '#chat') {
      this.navigateToChatPage();
    } else if (location === '#about') {
      this.navigateToAboutPage();
    }
  }

  private navigateToAboutPage(): void {
    this.destroyChildren();
    this.aboutPage = new AboutPage();
    this.appendChild(this.aboutPage);
  }

  private navigateToChatPage(): void {
    this.destroyChildren();
    this.chatPage = new ChatPage();
    this.appendChild(this.chatPage);
  }

  private navigateToLoginPage(): void {
    this.destroyChildren();
    this.loginPage = new LoginPage();
    this.appendChild(this.loginPage);
  }
}
