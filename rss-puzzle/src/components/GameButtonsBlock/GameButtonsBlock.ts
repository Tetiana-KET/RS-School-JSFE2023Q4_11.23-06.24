// Footer.ts
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonsBlock extends Component {
  private solutionButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  constructor() {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

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
    this.solutionButton.getNode().addEventListener('click', this.handleButtonClick.bind(this));
  }
  private handleButtonClick() {}
}
