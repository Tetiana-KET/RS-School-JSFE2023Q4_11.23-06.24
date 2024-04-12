import { LoginPage } from '../../pages/loginPage/LoginPage';
import { Component } from '../Component';
import classes from './MainContent.module.css';

export class MainContent extends Component<'main'> {
  private loginPage: LoginPage;
  constructor() {
    super('main', { className: `${classes.main}`, id: 'main' });
    this.loginPage = new LoginPage();
    this.appendChild(this.loginPage);
  }
}
