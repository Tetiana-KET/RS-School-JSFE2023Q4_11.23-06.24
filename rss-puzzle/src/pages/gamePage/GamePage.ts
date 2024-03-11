import { Component } from '../../components';
import { GameFooter } from '../../components/gameFooter/GameFooter';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import classes from './GamePage.module.css';

export class GamePage extends Component {
  private header: Component;
  private mainContent: Component<HTMLDivElement>;
  private gameWrap: Component<HTMLDivElement>;
  private gameSourceDataBlock: Component<HTMLDivElement>;
  private footer: Component;

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageContainer] });

    // header
    this.header = new GameHeader();
    this.append(this.header);

    // main content wrapper
    this.mainContent = new Component({
      tagName: 'div',
      classNames: [classes.mainContentWrapper],
    });
    this.append(this.mainContent);

    // game wrapper
    this.gameWrap = new Component({
      tagName: 'div',
      classNames: [classes.gameWrap],
    });
    this.mainContent.append(this.gameWrap);

    // game source data block
    this.gameSourceDataBlock = new Component({
      tagName: 'div',
      classNames: [classes.gameSourceDataBlock],
    });
    this.mainContent.append(this.gameSourceDataBlock);

    // Footer
    this.footer = new GameFooter();
    this.append(this.footer);
  }
}
