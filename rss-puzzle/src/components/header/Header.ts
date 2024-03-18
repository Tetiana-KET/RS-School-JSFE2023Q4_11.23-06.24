import { LoginPage } from '../../pages';
import { generateGreeting } from '../../utils/commonUtils';
import { Component } from '../Component';
import classes from './Header.module.css';

export class Header extends Component {
  private headerContainer: Component<HTMLDivElement>;
  private headerLogo: Component<HTMLHeadingElement>;
  private userGreeting: Component<HTMLParagraphElement>;
  private logoutBtn: Component<HTMLButtonElement>;

  constructor() {
    super({ tagName: 'header', classNames: [classes.header] });
    // Wrapper
    this.headerContainer = new Component({
      tagName: 'div',
      classNames: [classes.headerContainer],
    });
    this.append(this.headerContainer);

    // logo
    this.headerLogo = new Component({
      tagName: 'h2',
      text: 'RSS Puzzle',
      classNames: [classes.headerLogo],
    });
    this.headerContainer.append(this.headerLogo);

    // User Greeting
    this.userGreeting = new Component({
      tagName: 'p',
      classNames: [classes.userGreeting],
      attributes: { id: 'userGreeting' },
    });
    this.userGreeting.setTextContent(`${generateGreeting()}`);
    this.headerContainer.append(this.userGreeting);

    // Log out Button
    this.logoutBtn = new Component({
      tagName: 'button',
      text: 'Log out',
      classNames: [classes.logoutBtn],
    });
    this.headerContainer.append(this.logoutBtn);
    // Event listener for logout button
    this.logoutBtn.getNode().addEventListener('click', this.handleLogout.bind(this));
  }

  private handleLogout(): void {
    localStorage.removeItem('userData');
    localStorage.setItem('isPlaying', 'false');
    if (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    document.body.prepend(new LoginPage().getNode());
  }
}
