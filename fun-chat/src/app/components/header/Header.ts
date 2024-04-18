import type { CurrentUser } from '../../interfaces';
import { WebSocketAPI } from '../../services/WebSocketAPI';
import { isLoggedFromSessionStorage } from '../../utils/commonUtils';
import { eventBus } from '../../utils/eventBus';
import { Component } from '../Component';
import classes from './Header.module.css';

export class Header extends Component<'header'> {
  private headerContainer: Component<'div'>;
  private headerLogo: Component<'h2'>;
  private buttonsWrap: Component<'div'>;
  private infoButton: Component<'button'>;
  private logOutButton: Component<'button'>;
  private userInfo: Component<'div'>;
  private userName: string | null = null;
  private webSocketAPI: WebSocketAPI;

  constructor() {
    super('header', { className: `${classes.header}`, id: 'header' });
    this.webSocketAPI = new WebSocketAPI();
    this.headerContainer = new Component('div', { className: `${classes.headerContainer}`, id: 'headerContainer' });
    this.appendChild(this.headerContainer);

    this.headerLogo = new Component('h2', { className: `${classes.headerLogo}`, text: 'Fun Chat' });
    this.userInfo = new Component('div', { className: `${classes.userInfo}`, id: 'userInfo' });
    this.buttonsWrap = new Component('div', { className: `${classes.buttonsWrap}` });

    this.infoButton = new Component('button', {
      className: `${classes.button}`,
      text: 'About',
      id: 'infoButton',
    }).setAttribute('type', 'button');
    this.logOutButton = new Component('button', {
      className: `${classes.button}`,
      text: 'Log out',
      id: 'logOutButton',
    })
      .setAttribute('type', 'button')
      .setAttribute('disabled', `${!isLoggedFromSessionStorage()}`);

    this.buttonsWrap.appendChildren([this.infoButton, this.logOutButton]);
    this.headerContainer.appendChildren([this.headerLogo, this.userInfo, this.buttonsWrap]);
    this.infoButton.element.addEventListener('click', this.onAboutBtnClick.bind(this));
    this.logOutButton.element.addEventListener('click', this.onLogoutBtnClick.bind(this));
    eventBus.subscribe('aboutBtnClicked', this.disableAboutBtn.bind(this));
    eventBus.subscribe('successLogin', this.handleSuccessLogin.bind(this));
    eventBus.subscribe('backButtonClicked', this.enableAboutBtn.bind(this));
  }

  private setUserNameInHeader(): void {
    const currentUserString = sessionStorage.getItem('user');
    if (currentUserString) {
      const currentUser: CurrentUser = JSON.parse(currentUserString);
      this.userName = currentUser.login;
      this.userInfo.element.textContent = `User: ${this.userName}`;
    }
  }

  private onAboutBtnClick(event: MouseEvent): void {
    window.location.hash = '#about';
    eventBus.emit('aboutBtnClicked', event);
  }

  private onLogoutBtnClick(): void {
    console.log(`click`);
    this.userInfo.element.textContent = '';
    this.disableLogoutBtn();

    let login;
    let password;

    const currentUserString = sessionStorage.getItem('user');
    if (currentUserString) {
      const user = JSON.parse(currentUserString);
      login = user.login;
      password = user.password;
    }

    if (login && password) {
      this.webSocketAPI.userLogout(login, password);
    }
  }

  private disableAboutBtn(): void {
    this.infoButton.element.disabled = true;
  }

  private enableAboutBtn(): void {
    this.infoButton.element.disabled = false;
  }

  private enableLogoutBtn(): void {
    this.logOutButton.element.disabled = false;
  }

  private disableLogoutBtn(): void {
    this.logOutButton.element.disabled = true;
  }
  private handleSuccessLogin(): void {
    this.setUserNameInHeader();
    this.enableLogoutBtn();
  }
}
