import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { GameButtonsBlock } from '../../components/GameButtonsBlock/GameButtonsBlock';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import { createWordCards, fetchWordData, shuffleWords } from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';
import classes from './GamePage.module.css';
import bg from '../../assets/bg.jpg';

export class GamePage extends Component {
  private gamePageContainer: Component;
  private header: Component;
  private mainContent: Component<HTMLDivElement>;
  private gameWrap: Component<HTMLDivElement>;
  private gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;
  private fetchedWordData: Data | null = null;
  private currentSentenceIndex: number = 0;
  private currentLevel: number = 1;
  private currentRound: number = 0;
  private sentencesForRound: string[] = [];

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
    // fetch data
    this.fetchWordData();
  }

  private fetchWordData() {
    fetchWordData(this.currentLevel)
      .then(data => {
        this.fetchedWordData = data;
        console.log(this.fetchedWordData);
        this.handleFetchedData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // handle fetched data
  private handleFetchedData() {
    if (this.fetchedWordData) {
      this.sentencesForRound = this.fetchedWordData.rounds[this.currentRound].words.map(word => word.textExample);
      console.log(this.sentencesForRound);
      this.displaySentence();
    }
  }

  // Method to display the current sentence in the game source data block
  private displaySentence() {
    const currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const shuffledWords = shuffleWords(currentSentence);
    const wordCards = createWordCards(shuffledWords);

    this.gameSourceDataBlock.getNode().innerHTML = '';
    wordCards.forEach(wordCard => {
      wordCard.classList.add(classes.wordCard);
      this.gameSourceDataBlock.getNode().append(wordCard);
    });
  }
}
