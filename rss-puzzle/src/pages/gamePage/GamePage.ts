import { Component } from '../../components';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import classes from './GamePage.module.css';

export class GamePage extends Component {
  private header: Component;
  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageContainer] });
    // header
    this.header = new GameHeader();
    this.append(this.header);
  }
}
