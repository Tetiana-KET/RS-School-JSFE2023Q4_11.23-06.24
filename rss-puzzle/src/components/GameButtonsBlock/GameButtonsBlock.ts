// Footer.ts
import { Component } from '../Component';
import { GamePage } from '../../pages/gamePage/GamePage';
import { verifyWordOrder } from '../../utils/wordCardsHandlers';
import classes from './GameButtonsBlock.module.css';
import { ModalResults } from '../modalResults/ModalResults';

export class GameButtonBlock extends Component {
  private checkButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  private autoCompleteButton: Component<HTMLButtonElement>;
  private resultsButton: Component<HTMLButtonElement>;
  private checkButtonWrap: Component<HTMLDivElement>;
  private completeButtonWrap: Component<HTMLDivElement>;
  private gamePageInstance: GamePage;
  private modal: ModalResults;

  constructor(gamePageInstance: GamePage, modal: ModalResults) {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });
    this.modal = modal;
    this.gamePageInstance = gamePageInstance;
    this.completeButtonWrap = new Component({ tagName: 'div', classNames: [classes.completeButtonWrap] });
    this.append(this.completeButtonWrap);
    this.checkButtonWrap = new Component({ tagName: 'div', classNames: [classes.checkButtonWrap] });
    this.append(this.checkButtonWrap);
    this.autoCompleteButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.autoCompleteButton],
      text: 'Auto-complete',
      attributes: { type: 'button' },
    });
    this.completeButtonWrap.append(this.autoCompleteButton);
    this.resultsButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.resultButton],
      text: 'Results',
      attributes: { type: 'button', disabled: true, invisible: 'true' },
    });
    this.completeButtonWrap.append(this.resultsButton);
    this.checkButton = new Component({
      tagName: 'button',
      text: `Check`,
      classNames: [classes.button, classes.checkButton],
      attributes: { type: 'button', disabled: true },
    });
    this.checkButtonWrap.append(this.checkButton);
    this.continueButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button],
      text: 'Continue',
      attributes: { type: 'button', disabled: true, invisible: 'true' },
    });
    this.checkButtonWrap.append(this.continueButton);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.checkButton.getNode().addEventListener('click', this.handleCheckButtonClick.bind(this));
    this.continueButton.getNode().addEventListener('click', this.handleContinueButtonClick.bind(this));
    this.autoCompleteButton.getNode().addEventListener('click', this.handleAutoCompleteButtonClick.bind(this));
    this.resultsButton.getNode().addEventListener('click', this.handleResultButtonClick.bind(this));
  }

  private handleCheckButtonClick(): void {
    this.autoCompleteButton.removeAttribute('disabled');
    const index = this.gamePageInstance.currentSentenceIndex;
    const sentenceLine = Array.from(this.gamePageInstance.gameWrap.getNode().children)[index];
    verifyWordOrder(sentenceLine);
  }

  private handleContinueButtonClick(): void {
    this.hideResultModal();
    if (this.gamePageInstance.correctlyAssembledSentences === this.gamePageInstance.sentencesForRound.length) {
      this.gamePageInstance.proceedToNextRound();
    } else {
      this.gamePageInstance.proceedToTheNextSentence();
    }
    if (this.gamePageInstance.currentSentenceIndex < this.gamePageInstance.sentencesForRound.length) {
      this.continueButton.setAttribute('disabled', 'disabled');
      this.continueButton.setAttribute('invisible', 'true');
      this.checkButton.setAttribute('disabled', 'disabled');
      this.checkButton.removeAttribute('invisible');
      this.autoCompleteButton.removeAttribute('disabled');
      this.gamePageInstance.displaySentence();
      this.gamePageInstance.isTranslateEnabled = this.gamePageInstance.checkIsTranslateEnabled();
      if (this.gamePageInstance.isTranslateEnabled) {
        this.gamePageInstance.displayTranslation();
      } else {
        this.gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
      }
      this.gamePageInstance.isBgImageHintEnabled = this.gamePageInstance.checkIsBgImageHintEnabled();
      if (this.gamePageInstance.isBgImageHintEnabled) {
        this.gamePageInstance.header.getNode().querySelector('#bgImageHint')?.setAttribute('active-hint', 'true');
        this.gamePageInstance.gameWrap.getNode().removeAttribute('bg-image-disabled');
        Array.from(this.gamePageInstance.gameSourceDataBlock.getNode().children).forEach(child => {
          child.removeAttribute('bg-image-disabled');
        });
      } else {
        this.gamePageInstance.header.getNode().querySelector('#bgImageHint')?.removeAttribute('active-hint');
        this.gamePageInstance.gameWrap.getNode().setAttribute('bg-image-disabled', 'true');
        Array.from(this.gamePageInstance.gameSourceDataBlock.getNode().children).forEach(child => {
          child.setAttribute('bg-image-disabled', 'true');
        });
      }
    }
  }

  // Handle click event for Auto-Complete button
  private handleAutoCompleteButtonClick(): void {
    this.autoCompleteButton.setAttribute('disabled', 'disabled');
    this.gamePageInstance.autoCompleteSentence();
  }

  private handleResultButtonClick(): void {
    this.resultsButton.setAttribute('disabled', 'disabled');
    this.gamePageInstance.getNode().querySelector('#modal')?.setAttribute('modal-active', 'true');
    // Create result items for guessed sentences
    this.modal.createResultItems();
  }

  private hideResultModal(): void {
    if (this.gamePageInstance.getNode().querySelector('#modal')?.getAttribute('modal-active')) {
      this.gamePageInstance.getNode().querySelector('#modal')?.removeAttribute('modal-active');
    }
  }
}
