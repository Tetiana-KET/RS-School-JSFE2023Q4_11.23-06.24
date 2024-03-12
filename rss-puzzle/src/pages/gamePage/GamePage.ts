import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { GameButtonsBlock } from '../../components/GameButtonsBlock/GameButtonsBlock';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import classes from './GamePage.module.css';
import bg from '../../assets/bg.jpg';
import { fetchWordData } from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';

export class GamePage extends Component {
  private gamePageContainer: Component;
  private header: Component;
  private mainContent: Component<HTMLDivElement>;
  private gameWrap: Component<HTMLDivElement>;
  private gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;
  private fetchedWordData: Data | null = null;

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageBg] });
    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundSize = 'cover';
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';
    // gamePageContainer
    this.gamePageContainer = new Component({
      tagName: 'div',
      classNames: [classes.gamePageContainer],
    });
    this.append(this.gamePageContainer);

    // header
    this.header = new GameHeader();
    this.gamePageContainer.append(this.header);

    // main content wrapper
    this.mainContent = new Component({
      tagName: 'main',
      classNames: [classes.mainContentWrapper],
    });
    this.gamePageContainer.append(this.mainContent);

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

    //buttons
    this.gameButtonsBlock = new GameButtonsBlock();
    this.mainContent.append(this.gameButtonsBlock);

    // Footer
    this.footer = new Footer();
    this.gamePageContainer.append(this.footer);

    // Fetch word data
    fetchWordData()
      .then(data => {
        this.fetchedWordData = data;
        console.log(this.fetchedWordData);
        this.handleFetchedData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  private handleFetchedData(data: Data) {
    this.populateGameSourceDataBlock(data);
  }

  private populateGameSourceDataBlock(data: Data) {}
}
