// Footer.ts
import { GamePage } from '../../pages/gamePage/GamePage';
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonsBlock extends Component {
  private solutionButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  private gamePageInstance: GamePage;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

    this.gamePageInstance = gamePageInstance;

    //Solution button
    this.solutionButton = new Component({
      tagName: 'button',
      text: `Solution`,
      classNames: [classes.button, classes.solutionButton],
    });
    this.append(this.solutionButton);
    //continue button
    this.continueButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.continueButton],
      text: 'Continue',
      attributes: { type: 'button', disabled: true },
    });
    this.append(this.continueButton);
    // Event listener for logout button
    this.solutionButton.getNode().addEventListener('click', this.handleSolutionButtonClick.bind(this));
    this.continueButton.getNode().addEventListener('click', this.handleContinueButtonClick.bind(this));
  }

  private handleSolutionButtonClick() {
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
