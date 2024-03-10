import { Component } from '../Component';
import classes from './Header.module.css';

export class Header extends Component {
  constructor() {
    super({ tagName: 'header', classNames: [classes.header] });
    this.render();
  }

  render(): void {
    this.node.innerHTML = `
      <div class="${classes.headerContainer}">
        <h1 class="${classes.headerLogo}">RSS Puzzle</h1>
        <button class="${classes.logoutBtn}">Log out</button>
      </div>
    `;
  }
}
