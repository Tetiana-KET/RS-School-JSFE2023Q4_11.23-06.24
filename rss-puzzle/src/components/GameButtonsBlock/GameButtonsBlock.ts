// Footer.ts
import { GamePage } from '../../pages/gamePage/GamePage';
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonsBlock extends Component {
  private checkButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  private gamePageInstance: GamePage;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

    this.gamePageInstance = gamePageInstance;

    //Check button
    this.checkButton = new Component({
      tagName: 'button',
      text: `Check`,
      classNames: [classes.button, classes.checkButton],
      attributes: { type: 'button', disabled: true },
    });
    this.append(this.checkButton);

    //continue button
    this.continueButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.continueButton],
      text: 'Continue',
      attributes: { type: 'button', disabled: true },
    });
    this.append(this.continueButton);

    // Event listener for logout button
    this.checkButton.getNode().addEventListener('click', this.handleCheckButtonClick.bind(this));
    this.continueButton.getNode().addEventListener('click', this.handleContinueButtonClick.bind(this));
  }

  private handleCheckButtonClick() {
    console.log(`click`);
  }
  private handleContinueButtonClick() {
    this.gamePageInstance.currentSentenceIndex += 1;
    if (this.gamePageInstance.currentSentenceIndex < this.gamePageInstance.sentencesForRound.length) {
      this.continueButton.setAttribute('disabled', 'disabled');
      this.gamePageInstance.displaySentence();
    }
  }
}
