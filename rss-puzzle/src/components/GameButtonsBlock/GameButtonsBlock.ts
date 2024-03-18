// Footer.ts
import { GamePage } from '../../pages/gamePage/GamePage';
import { verifyWordOrder } from '../../utils/wordCardsHandlers';
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonBlock extends Component {
  private checkButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  private autoCompleteButton: Component<HTMLButtonElement>;
  private checkButtonWrap: Component<HTMLDivElement>;
  private completeButtonWrap: Component<HTMLDivElement>;
  private gamePageInstance: GamePage;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

    this.gamePageInstance = gamePageInstance;

    //auto-complete Button Wrap
    this.completeButtonWrap = new Component({
      tagName: 'div',
      classNames: [classes.completeButtonWrap],
    });
    this.append(this.completeButtonWrap);

    //check-continue Button Wrap
    this.checkButtonWrap = new Component({
      tagName: 'div',
      classNames: [classes.checkButtonWrap],
    });
    this.append(this.checkButtonWrap);

    //auto complete button
    this.autoCompleteButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.autoCompleteButton],
      text: 'Auto-complete',
      attributes: { type: 'button' },
    });
    this.completeButtonWrap.append(this.autoCompleteButton);

    //Check button
    this.checkButton = new Component({
      tagName: 'button',
      text: `Check`,
      classNames: [classes.button, classes.checkButton],
      attributes: { type: 'button', disabled: true },
    });
    this.checkButtonWrap.append(this.checkButton);

    //continue button
    this.continueButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button],
      text: 'Continue',
      attributes: { type: 'button', disabled: true, invisible: 'true' },
    });
    this.checkButtonWrap.append(this.continueButton);

    // Event listener for logout button
    this.checkButton.getNode().addEventListener('click', this.handleCheckButtonClick.bind(this));
    this.continueButton.getNode().addEventListener('click', this.handleContinueButtonClick.bind(this));
    this.autoCompleteButton.getNode().addEventListener('click', this.handleAutoCompleteButtonClick.bind(this));
  }

  private handleCheckButtonClick() {
    this.autoCompleteButton.removeAttribute('disabled');
    const index = this.gamePageInstance.currentSentenceIndex;
    const sentenceLine = Array.from(this.gamePageInstance.gameWrap.getNode().children)[index];
    verifyWordOrder(sentenceLine);
  }

  private handleContinueButtonClick() {
    this.gamePageInstance.currentSentenceIndex += 1;

    this.gamePageInstance.audioExample =
      this.gamePageInstance.fetchedWordData?.rounds[this.gamePageInstance.currentRound]?.words[
        this.gamePageInstance.currentSentenceIndex
      ]?.audioExample;
    this.gamePageInstance.getImageForRound();

    console.log(`from CONTINUE button click: `, this.gamePageInstance.audioExample);

    if (this.gamePageInstance.currentSentenceIndex < this.gamePageInstance.sentencesForRound.length) {
      this.continueButton.setAttribute('disabled', 'disabled');
      this.continueButton.setAttribute('invisible', 'true');
      this.checkButton.setAttribute('disabled', 'disabled');
      this.checkButton.removeAttribute('invisible');
      this.autoCompleteButton.removeAttribute('disabled');
      this.gamePageInstance.displaySentence();
      //display translation if enabled
      this.gamePageInstance.isTranslateEnabled = this.gamePageInstance.checkIsTranslateEnabled();
      if (this.gamePageInstance.isTranslateEnabled) {
        this.gamePageInstance.displayTranslation();
      } else {
        this.gamePageInstance.translationWrap.getNode().removeAttribute('data-active');
      }
    }
  }

  // Handle click event for Auto-Complete button
  private handleAutoCompleteButtonClick(): void {
    this.autoCompleteButton.setAttribute('disabled', 'disabled');
    this.gamePageInstance.autoCompleteSentence();
  }
}
