import { generateGreeting } from '../../utils/commonUtils';
import { Component } from '../Component';
import classes from './Header.module.css';

export class Header extends Component {
  constructor() {
    super({ tagName: 'header', classNames: [classes.header] });
    this.render();
  }

  render(): void {
    const greeting = generateGreeting();
    this.node.innerHTML = `
      <div class="${classes.headerContainer}">
        <h2 class="${classes.headerLogo}">RSS Puzzle</h2>
        <p class="${classes.userGreeting}">${greeting}</p>
        <button class="${classes.logoutBtn}">Log out</button>
      </div>
    `;
  }
}
