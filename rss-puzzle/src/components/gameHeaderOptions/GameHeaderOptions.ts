import { GamePage } from '../../pages/gamePage/GamePage';
import { Component } from '../Component';
import classes from './GameHeaderOptions.module.css';

export class GameHeaderOptions extends Component {
  private gamePageInstance: GamePage;

  private selectLevelOption: Component<HTMLElement>;
  private selectOptionTitle: Component<HTMLElement>;
  private selectOptionBody: Component<HTMLElement>;

  private selectRoundOption: Component<HTMLElement>;
  private selectRoundTitle: Component<HTMLElement>;
  private selectRoundBody: Component<HTMLElement>;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.gameHeaderOptions] });
    this.gamePageInstance = gamePageInstance;

    this.selectLevelOption = new Component({ tagName: 'div', classNames: [classes.selectLevelOption] });
    this.append(this.selectLevelOption);
    this.selectOptionTitle = new Component({ tagName: 'div', classNames: [classes.selectOptionTitle], attributes: { id: 'selectLevelTitle' } });
    this.selectLevelOption.append(this.selectOptionTitle);
    this.selectOptionBody = new Component({ tagName: 'div', classNames: [classes.selectOptionBody], attributes: { id: 'selectLevelBody' } });
    this.selectLevelOption.append(this.selectOptionBody);
    this.createElementsForLevel();

    this.selectRoundOption = new Component({ tagName: 'div', classNames: [classes.selectRoundOption] });
    this.append(this.selectRoundOption);
    this.selectRoundTitle = new Component({ tagName: 'div', classNames: [classes.selectRoundTitle], attributes: { id: 'selectRoundTitle' } });
    this.selectRoundOption.append(this.selectRoundTitle);
    this.selectRoundBody = new Component({ tagName: 'div', classNames: [classes.selectRoundBody], attributes: { id: 'selectRoundBody' } });
    this.selectRoundOption.append(this.selectRoundBody);

    this.createElementsForRound();
  }

  // Add options for different game levels
  private createElementsForLevel(): void {
    for (let i = 1; i <= 6; i += 1) {
      const option = document.createElement('div');
      option.classList.add(`${classes.levelItem}`);
      option.textContent = `Level ${i}`;
      this.selectOptionBody.getNode().appendChild(option);
    }
  }

  // Add options for different game rounds
  private createElementsForRound(): void {
    const roundCount = this.gamePageInstance.totalRoundsCount;
    console.log(this.gamePageInstance.fetchedWordData);
    for (let i = 1; i <= roundCount; i += 1) {
      const option = document.createElement('div');
      option.classList.add(`${classes.roundItem}`);
      option.textContent = `Round ${i}`;
      this.selectOptionBody.getNode().appendChild(option);
    }
  }
}
