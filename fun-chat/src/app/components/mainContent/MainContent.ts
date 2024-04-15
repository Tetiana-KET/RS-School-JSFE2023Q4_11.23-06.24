import { MainContentController } from '../../controllers/mainContentController';
import { AboutPage } from '../../pages/aboutPage/AboutPage';
import { ChatPage } from '../../pages/chatPage/ChatPage';
import { LoginPage } from '../../pages/loginPage/LoginPage';
import { eventBus } from '../../utils/eventBus';
import { Component } from '../Component';
import classes from './MainContent.module.css';

export class MainContent extends Component<'main'> {
  private controller: MainContentController;
  private loginPage: LoginPage;
  private aboutPage: AboutPage;
  private chatPage: ChatPage;
  constructor() {
    super('main', { className: `${classes.main}`, id: 'main' });

    this.controller = new MainContentController();
    this.loginPage = new LoginPage();
    this.aboutPage = new AboutPage();
    this.chatPage = new ChatPage();
    this.appendChild(this.loginPage);
    this.controller.chatModel.router.addRoute('#/login', () => this.appendChild(this.loginPage));
    this.controller.chatModel.router.addRoute('#/about', () => this.appendChild(this.aboutPage));
    this.controller.chatModel.router.addRoute('#/chat', () => this.appendChild(this.chatPage));
    this.controller.chatModel.router.navigateTo(window.location.pathname);

    eventBus.subscribe('aboutBtnClicked', this.navigateToAboutPage.bind(this));
    eventBus.subscribe('successLogin', this.navigateToChatPage.bind(this));
    eventBus.subscribe('logout', this.navigateToLoginPage.bind(this));
  }

  private navigateToAboutPage(): void {
    this.destroyChildren();
    this.aboutPage = new AboutPage();
    this.controller.navigateToAbout();
  }

  private navigateToChatPage(): void {
    this.destroyChildren();
    this.chatPage = new ChatPage();
    this.controller.navigateToChat();
  }

  private navigateToLoginPage(): void {
    this.destroyChildren();
    this.loginPage = new LoginPage();
    this.controller.navigateToLogin();
  }
}
