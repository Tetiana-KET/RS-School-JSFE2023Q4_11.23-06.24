// Footer.ts
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonsBlock extends Component {
  private solutionButton: Component<HTMLButtonElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

    //buttons
    this.solutionButton = new Component({
      tagName: 'button',
      text: `I don't know`,
      classNames: [classes.solutionButton],
    });
    this.append(this.solutionButton);
    // Event listener for logout button
    this.solutionButton.getNode().addEventListener('click', this.handleButtonClick.bind(this));
  }
  private handleButtonClick() {}
}
