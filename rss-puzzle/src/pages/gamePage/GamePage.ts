import { Component } from '../../components';
import classes from './GamePage.module.css';

export class GamePage extends Component {
  constructor() {
    super({ tagName: 'div', text: 'this is game page', classNames: [classes.gamePageContainer] });
  }
}
