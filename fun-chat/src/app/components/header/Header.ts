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

  constructor() {
    super('header', { className: `${classes.header}`, id: 'header' });

    this.headerContainer = new Component('div', { className: `${classes.headerContainer}`, id: 'headerContainer' });
    this.appendChild(this.headerContainer);

    this.headerLogo = new Component('h2', { className: `${classes.headerLogo}`, text: 'Fun Chat' });
    this.userInfo = new Component('div', { className: `${classes.userInfo}` }).setTextContent(`Hello ${this.userName}!`);
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
      .setAttribute('disabled', 'true');

    this.buttonsWrap.appendChildren([this.infoButton, this.logOutButton]);
    this.headerContainer.appendChildren([this.headerLogo, this.userInfo, this.buttonsWrap]);
    this.infoButton.element.addEventListener('click', this.onAboutBtnClick.bind(this));
    this.logOutButton.element.addEventListener('click', this.onLogoutBtnClick.bind(this));
    eventBus.subscribe('aboutBtnClicked', this.disableAboutBtn.bind(this));
    eventBus.subscribe('successLogin', this.enableLogoutBtn.bind(this));
    // eventBus.subscribe('logout', this.disableLogoutBtn.bind(this));
  }

  private onAboutBtnClick(event: MouseEvent): void {
    eventBus.emit('aboutBtnClicked', event);
  }

  private onLogoutBtnClick(event: MouseEvent): void {
    this.disableLogoutBtn();
    eventBus.emit('logout', event);
  }

  private disableAboutBtn(): void {
    this.infoButton.element.disabled = true;
  }

  private enableLogoutBtn(): void {
    this.logOutButton.element.disabled = false;
  }

  private disableLogoutBtn(): void {
    this.logOutButton.element.disabled = true;
  }
}
