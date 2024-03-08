import { Component } from '../../components';
import classes from './LoginPage.module.css';

export class LoginPage extends Component {
  constructor() {
    super({ tagName: 'div' });
    const form = new Component({ tagName: 'form', classNames: [classes.loginForm] });
    this.append(form);
  }
}
