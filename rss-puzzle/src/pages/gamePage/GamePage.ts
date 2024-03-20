import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { Header } from '../../components/header/Header';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import { GameButtonBlock } from '../../components/gameButtonsBlock/GameButtonsBlock';
import { fetchImageData, fetchWordData } from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';
import { checkLocalStoragePropertyFlag } from '../../utils/localStorage';
import { calculateCharWidth, createWordCards, clickHandlerToWordCards, verifySentenceAssembly, shuffleWords } from '../../utils/wordCardsHandlers';
import classes from './GamePage.module.css';
import bg from '../../assets/bg.jpg';
import { ModalResults } from '../../components/modalResults/ModalResults';

export class GamePage extends Component {
  private gamePageContainer: Component;
  public mainHeader: Component;
  public header: Component;

  private mainContent: Component<HTMLDivElement>;
  public gameWrap: Component<HTMLDivElement>;
  public gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;

  public fetchedWordData: Data | null = null;
  public currentLevel: number = 1;
  public currentRound: number = 0;
  private totalRoundsCount: number = 0;
  public sentencesForRound: string[] = [];
  public currentSentenceIndex: number = 0;
  private currentSentenceCards: HTMLElement[];
  public currentSentence: string;
  public audioExample: string | undefined;
  public translationWrap: Component<HTMLDivElement>;
  private imageSource: string = '';
  private imageUrl: string = '';

  public isTranslateEnabled: boolean = true;
  public isPronounceEnabled: boolean = true;
  public isBgImageHintEnabled: boolean = true;

  public correctlyAssembledSentences: number;
  public guessedSentences: number[] = [];
  public autoCompletedSentences: number[] = [];
  public modalResultElement;

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageBg] });
    this.modalResultElement = new ModalResults(this);
    this.currentSentenceCards = [];
    this.currentSentence = '';
    this.correctlyAssembledSentences = 0;
    this.isTranslateEnabled = this.checkIsTranslateEnabled();
    this.isPronounceEnabled = this.checkIsPronounceEnabled();
    this.isBgImageHintEnabled = this.checkIsBgImageHintEnabled();
    this.setBackground();
    this.gamePageContainer = new Component({ tagName: 'div', classNames: [classes.gamePageContainer] });
    this.append(this.gamePageContainer);
    this.mainHeader = new Header();
    this.gamePageContainer.append(this.mainHeader);
    this.mainHeader.getNode().style.background = 'rgba(3, 6, 25, 0.7)';
    this.hideUserGreetingElement();
    this.mainContent = new Component({ tagName: 'main', classNames: [classes.mainContentWrapper] });
    this.gamePageContainer.append(this.mainContent);
    this.header = new GameHeader(this);
    this.mainContent.append(this.header);
    this.translationWrap = new Component({ tagName: 'div', classNames: [classes.translationWrap] });
    this.mainContent.append(this.translationWrap);
    this.gameWrap = new Component({ tagName: 'div', classNames: [classes.gameWrap] });
    this.mainContent.append(this.gameWrap);
    this.gameSourceDataBlock = new Component({
      tagName: 'div',
      classNames: [classes.gameSourceDataBlock],
    });
    this.mainContent.append(this.gameSourceDataBlock);
    this.gameButtonsBlock = new GameButtonBlock(this, this.modalResultElement);
    this.mainContent.append(this.gameButtonsBlock);
    this.footer = new Footer();
    this.gamePageContainer.append(this.footer);
    this.fetchWordData();
    this.addEventListenerForResize();
    this.mainContent.append(this.modalResultElement);
  }

  private addEventListenerForResize(): void {
    window.addEventListener('resize', () => {
      if (this.currentSentenceCards.length) {
        this.setCardsWidth(this.currentSentenceCards);
      }
    });
  }

  private hideUserGreetingElement(): void {
    const userGreetingElement = this.mainHeader.getNode().querySelector('#userGreeting') as HTMLElement | null;
    if (userGreetingElement) {
      userGreetingElement.style.visibility = 'hidden';
    }
  }

  private setBackground(): void {
    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';
    this.getNode().style.backgroundSize = '100% 100%';
  }

  public addLinesForSentence(): void {
    for (let i = 1; i <= this.sentencesForRound.length; i += 1) {
      const sentenceLine = document.createElement('div');
      sentenceLine.classList.add(classes.sentenceLine);
      this.gameWrap.getNode().appendChild(sentenceLine);
    }
  }

  public fetchWordData(): void {
    fetchWordData(this.currentLevel)
      .then(data => {
        this.fetchedWordData = data;
        this.handleFetchedData();
        this.displaySentence();
        this.getImageForRound();
        // Add lines for sentences
        this.addLinesForSentence();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // handle fetched data
  private handleFetchedData(): void {
    if (this.fetchedWordData) {
      this.sentencesForRound = this.fetchedWordData.rounds[this.currentRound].words.map(word => word.textExample);
      this.audioExample = this.fetchedWordData?.rounds[this.currentRound]?.words[this.currentSentenceIndex]?.audioExample;
      this.imageSource = this.fetchedWordData.rounds[this.currentRound].levelData.imageSrc;
      this.totalRoundsCount = this.fetchedWordData.roundsCount;
      // display translation if enabled
      if (this.isTranslateEnabled) {
        this.translationWrap.getNode().setAttribute('data-active', 'true');
        this.header.getNode().querySelector('#translateHint')?.setAttribute('active-hint', 'true');
        this.displayTranslation();
      }
      // display pronounce button if enabled
      if (this.isPronounceEnabled) {
        this.header.getNode().querySelector('#playSoundButton')?.removeAttribute('disabled');
        this.header.getNode().querySelector('#pronunciationHint')?.setAttribute('active-hint', 'true');
      } else {
        this.header.getNode().querySelector('#playSoundButton')?.setAttribute('disabled', 'true');
      }
    }
  }

  // display current sentence in the game source data block
  public displaySentence(): void {
    this.currentSentenceCards.length = 0;
    this.gameSourceDataBlock.getNode().innerHTML = '';
    this.currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const wordCards = createWordCards(
      this.currentSentence,
      classes.gameWrap,
      this.sentencesForRound.length,
      this.currentSentenceIndex,
      this.imageUrl,
      this.gameSourceDataBlock
    );
    this.setCardsWidth(wordCards);
    const shuffledWordCards = shuffleWords(wordCards);
    shuffledWordCards.forEach(wordCard => {
      wordCard.classList.add(classes.wordCard);
      shuffledWordCards.forEach((shuffledWordCard, index) => {
        this.delayVisibility(shuffledWordCard, index);
      });
      this.gameSourceDataBlock.getNode().append(wordCard);
    });
    this.addClickHandlersToWordCards(wordCards);
    this.currentSentenceCards.push(...wordCards);
    if (this.isBgImageHintEnabled) {
      this.header.getNode().querySelector('#bgImageHint')?.setAttribute('active-hint', 'true');
      this.gameWrap.getNode().removeAttribute('bg-image-disabled');
      Array.from(this.gameSourceDataBlock.getNode().children).forEach(child => {
        child.removeAttribute('bg-image-disabled');
      });
    } else {
      this.header.getNode().querySelector('#bgImageHint')?.removeAttribute('active-hint');
      this.gameWrap.getNode().setAttribute('bg-image-disabled', 'true');
      Array.from(this.gameSourceDataBlock.getNode().children).forEach(child => {
        child.setAttribute('bg-image-disabled', 'true');
      });
    }
  }

  private delayVisibility(shuffledWordCard: HTMLElement, index: number): void {
    setTimeout(
      () => {
        shuffledWordCard.style.visibility = 'visible';
        shuffledWordCard.style.opacity = '1';
      },
      (index + 1) * 100
    );
  }

  public checkIsTranslateEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'translateEnabled') === true;
  }

  public checkIsPronounceEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'pronounceEnabled') === true;
  }

  public checkIsBgImageHintEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'bgImageHintEnabled') === true;
  }

  public displayTranslation(): void {
    const translation = this.fetchedWordData?.rounds[this.currentRound].words[this.currentSentenceIndex].textExampleTranslate;
    this.translationWrap.setTextContent(`${translation}`);
    this.translationWrap.getNode().setAttribute('data-active', 'true');
  }

  private addClickHandlersToWordCards(wordCards: HTMLElement[]): void {
    clickHandlerToWordCards(
      wordCards,
      this.gameWrap,
      `${classes.gameSourceDataBlock}`,
      `${classes.sentenceLine}`,
      this.currentSentenceIndex,
      `${classes.selected}`,
      this.currentSentence,
      this.gameButtonsBlock,
      this
    );
  }

  private setCardsWidth(wordCards: HTMLElement[]): void {
    const currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const parent = this.gameSourceDataBlock;
    const charWidth = calculateCharWidth(currentSentence, parent);

    for (let i = 0; i < wordCards.length; i += 1) {
      const textContentLength = wordCards[i].textContent?.length ?? 0;
      wordCards[i].style.width = `${textContentLength * charWidth}px`;
    }
  }

  public autoCompleteSentence(): void {
    this.autoCompletedSentences.push(this.currentSentenceIndex);
    const sentenceLine = this.gameWrap.getNode().children[this.currentSentenceIndex];
    const sourceWordCards = Array.from(this.gameSourceDataBlock.getNode().children) as HTMLElement[];
    const resultWordCards = Array.from(sentenceLine.children) as HTMLElement[];
    const correctOrderWords = this.currentSentenceCards;
    const autocompleteButton = this.gameButtonsBlock.getNode().firstChild?.firstChild as HTMLButtonElement;
    const resultButton = this.gameButtonsBlock.getNode().firstChild?.lastChild as HTMLButtonElement;
    const continueButton = this.gameButtonsBlock.getNode().lastChild?.lastChild as HTMLButtonElement;
    const checkButton = this.gameButtonsBlock.getNode().lastChild?.firstChild as HTMLButtonElement;
    const isCorrect = verifySentenceAssembly(this.currentSentence, sentenceLine);

    if (sourceWordCards.length) {
      this.handleCorrectOrder(correctOrderWords, resultWordCards, sourceWordCards, sentenceLine);
      this.translationWrap.getNode().setAttribute('data-active', 'true');
      this.displayTranslation();
    } else if (!isCorrect) {
      this.handleWrongOrder(correctOrderWords, resultWordCards);
    }
    this.correctlyAssembledSentences += 1;
    if (this.correctlyAssembledSentences === this.sentencesForRound.length) {
      this.revealImage();
      this.toggleCompleteResultButtons(resultButton, autocompleteButton, continueButton, checkButton);
    } else {
      this.toggleContinueCkeckButtons(continueButton, checkButton);
    }
  }

  private handleWrongOrder(correctOrderWords: HTMLElement[], resultWordCards: HTMLElement[]): void {
    correctOrderWords.forEach((word, index) => {
      resultWordCards.forEach(card => {
        card.classList.remove(`${classes.wrongOrder}`);
        if (card.getAttribute('data-index') === index.toString() && card.getAttribute('data-value') === word.getAttribute('data-value')) {
          card.style.order = `${index}`;
          card.style.transition = 'order 5s';
          if (card.getAttribute('bg-image-disabled')) {
            card.removeAttribute('bg-image-disabled');
          }
        }
      });
    });
  }

  private handleCorrectOrder(
    correctOrderWords: HTMLElement[],
    resultWordCards: HTMLElement[],
    sourceWordCards: HTMLElement[],
    sentenceLine: Element
  ): void {
    sourceWordCards.forEach((wordCard, index) => {
      wordCard.style.visibility = 'hidden';
      wordCard.style.opacity = '0';
      setTimeout(
        () => {
          wordCard.remove();
          sentenceLine.append(wordCard);
          resultWordCards.push(wordCard);
          wordCard.style.visibility = 'visible';
          wordCard.style.opacity = '1';
          correctOrderWords.forEach((word, i) => {
            resultWordCards.forEach(card => {
              if (card.getAttribute('data-index') === i.toString() && card.getAttribute('data-value') === word.getAttribute('data-value')) {
                card.style.order = `${i}`;
                card.style.transition = 'order 5s';
                if (card.getAttribute('bg-image-disabled')) {
                  card.removeAttribute('bg-image-disabled');
                }
                card.setAttribute('disabled', 'true');
              }
            });
          });
        },
        (index + 1) * 100
      );
    });
  }

  private toggleContinueCkeckButtons(continueButton: HTMLButtonElement, checkButton: HTMLButtonElement): void {
    setTimeout(() => {
      continueButton.removeAttribute('disabled');
      continueButton.removeAttribute('invisible');
      checkButton.setAttribute('invisible', 'true');
    }, 1000);
  }

  private toggleCompleteResultButtons(
    continueButton: HTMLButtonElement,
    checkButton: HTMLButtonElement,
    resultButton: HTMLButtonElement,
    autocompleteButton: HTMLButtonElement
  ): void {
    setTimeout(() => {
      resultButton.removeAttribute('disabled');
      resultButton.removeAttribute('invisible');
      autocompleteButton.setAttribute('invisible', 'true');
      autocompleteButton.setAttribute('disabled', 'true');

      continueButton.removeAttribute('disabled');
      continueButton.removeAttribute('invisible');
      checkButton.setAttribute('invisible', 'true');
    }, 1000);
  }

  private disableResultButton(): void {
    setTimeout(() => {
      const resultButton = this.gameButtonsBlock.getNode().firstChild?.lastChild as HTMLButtonElement;
      const autocompleteButton = this.gameButtonsBlock.getNode().firstChild?.firstChild as HTMLButtonElement;
      resultButton.setAttribute('disabled', 'true');
      resultButton.setAttribute('invisible', 'true');
      autocompleteButton.removeAttribute('invisible');
      autocompleteButton.removeAttribute('disabled');
    }, 1000);
  }

  // get Image For Round
  public async getImageForRound(): Promise<void> {
    try {
      const image = await fetchImageData(this.imageSource);
      // Set the background image
      this.gameWrap.getNode().style.backgroundImage = `url(${image.src})`;
      const elements = Array.from(this.gameSourceDataBlock.getNode().children) as HTMLElement[];
      elements.forEach(element => {
        element.style.backgroundImage = `url(${image.src})`;
      });
      this.imageUrl = `url(${image.src})`;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  // reveal the background image
  public revealImage(): void {
    setTimeout(() => {
      Array.from(this.getNode().querySelectorAll(`.${classes.wordCard}`)).forEach(card => {
        card.setAttribute('bg-revealed', 'true');
      });
      this.gameWrap.getNode().setAttribute('bg-revealed', 'true');
      this.gameWrap.getNode().removeAttribute('bg-image-disabled');
      this.translationWrap.getNode().removeAttribute('data-active');
      this.displayImageInformation();
    }, 1000);
  }

  // display image information
  private displayImageInformation(): void {
    if (this.fetchedWordData) {
      const { year } = this.fetchedWordData.rounds[this.currentRound].levelData;
      const { author } = this.fetchedWordData.rounds[this.currentRound].levelData;
      const { name } = this.fetchedWordData.rounds[this.currentRound].levelData;
      const description = `${author} - ${name} (${year})`;
      this.gameSourceDataBlock.getNode().innerHTML = `${description}`;
    }
  }

  // proceed to the next round
  public proceedToNextRound(): void {
    this.gameWrap.getNode().removeAttribute('bg-revealed');
    this.gameWrap.getNode().innerHTML = '';
    this.addLinesForSentence();
    this.correctlyAssembledSentences = 0;
    this.currentSentenceIndex = 0;
    this.sentencesForRound.length = 0;
    this.currentSentenceCards.length = 0;
    this.guessedSentences.length = 0;
    this.autoCompletedSentences.length = 0;

    this.disableResultButton();
    if (this.currentRound < this.totalRoundsCount) {
      this.currentRound += 1;
      // set next round data
      this.handleFetchedData();
      this.displaySentence();
      this.getImageForRound();
    }
  }

  // proceed to the next sentence
  public proceedToTheNextSentence(): void {
    this.currentSentenceIndex += 1;
    this.audioExample = this.fetchedWordData?.rounds[this.currentRound]?.words[this.currentSentenceIndex]?.audioExample;
    this.getImageForRound();
  }
}
