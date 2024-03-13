import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import {
  calculateCharWidth,
  clickHandlerToWordCards,
  createWordCards,
  fetchWordData,
  shuffleWords,
} from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';
import classes from './GamePage.module.css';
import bg from '../../assets/bg.jpg';
import { GameButtonsBlock } from '../../components/gameButtonsBlock/GameButtonsBlock';

export class GamePage extends Component {
  private gamePageContainer: Component;
  private header: Component;
  private mainContent: Component<HTMLDivElement>;
  private gameWrap: Component<HTMLDivElement>;
  private gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;
  private fetchedWordData: Data | null = null;
  private currentLevel: number = 1;
  private currentRound: number = 0;
  private sentencesForRound: string[] = [];
  private currentSentenceIndex: number = 0;
  private currentSentenceCards: HTMLElement[];

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageBg] });
    this.currentSentenceCards = [];

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
    // Add lines for sentences
    for (let i = 1; i <= 10; i++) {
      const sentenceLine = document.createElement('div');
      sentenceLine.classList.add(classes.sentenceLine);
      this.gameWrap.getNode().appendChild(sentenceLine);
    }
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
    // event listener for window resize
    window.addEventListener('resize', () => {
      if (this.currentSentenceCards.length) {
        this.setCardsWidth(this.currentSentenceCards);
      }
    });
  }

  private fetchWordData() {
    fetchWordData(this.currentLevel)
      .then(data => {
        this.fetchedWordData = data;
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
      this.displaySentence();
    }
  }

  // display current sentence in the game source data block
  private displaySentence() {
    this.currentSentenceCards.length = 0;
    this.gameSourceDataBlock.getNode().innerHTML = '';

    const currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const shuffledWords = shuffleWords(currentSentence);
    const wordCards = createWordCards(shuffledWords);

    this.setCardsWidth(wordCards);

    wordCards.forEach(wordCard => {
      wordCard.classList.add(classes.wordCard);
      this.gameSourceDataBlock.getNode().append(wordCard);
    });
    this.addClickHandlersToWordCards(wordCards);
    this.currentSentenceCards.push(...wordCards);
  }

  private addClickHandlersToWordCards(wordCards: HTMLElement[]) {
    clickHandlerToWordCards(
      wordCards,
      this.gameWrap,
      `${classes.gameSourceDataBlock}`,
      `${classes.sentenceLine}`,
      this.currentSentenceIndex,
      `${classes.selected}`
    );
  }

  private setCardsWidth(wordCards: HTMLElement[]): void {
    const currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const parent = this.gameSourceDataBlock;
    const charWidth = calculateCharWidth(currentSentence, parent);

    for (let i = 0; i < wordCards.length; i += 1) {
      wordCards[i].style.width = `${wordCards[i].textContent!.length * charWidth}px`;
    }
  }
}
