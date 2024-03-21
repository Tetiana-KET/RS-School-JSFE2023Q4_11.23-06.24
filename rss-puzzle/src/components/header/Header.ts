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
    this.setFontSize();
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
    // Add event listener for window resize
    window.addEventListener('resize', () => {
      this.setFontSize();
    });
  }

  private setFontSize(): void {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let fontSize;
    if (vw < 600) {
      fontSize = '18px';
    } else if (vw < 900) {
      fontSize = '22px';
    } else {
      fontSize = '26px';
    }
    this.userGreeting.getNode().style.fontSize = fontSize;
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
