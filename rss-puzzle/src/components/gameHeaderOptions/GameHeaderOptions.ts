import { GamePage } from '../../pages/gamePage/GamePage';
import { fetchWordData } from '../../utils/commonUtils';
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

  // private selectedLevel: number = 1;
  // private selectedRound: number = 0;

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
    this.setTitleForLevelOption();
    this.createElementsForRound();
    // Add event listeners for level and round options
    this.addEventListeners();
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
    for (let i = 1; i <= roundCount; i += 1) {
      const option = document.createElement('div');
      option.classList.add(`${classes.roundItem}`);
      option.textContent = `Round ${i}`;
      this.selectOptionBody.getNode().appendChild(option);
    }
  }

  // add event listeners
  private addEventListeners(): void {
    // Event listener for level options
    this.handleLevelListener();
    // Event listener for round options
    this.handleRoundListener();
  }

  // Event listener for round options
  private handleRoundListener(): void {
    this.selectRoundOption.getNode().addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (this.selectRoundOption.getNode().hasAttribute('active')) {
        this.selectRoundOption.getNode().removeAttribute('active');
      } else {
        this.selectRoundOption.getNode().setAttribute('active', 'true');
      }
      if (target.hasAttribute('data-class') && target.textContent) {
        const round = parseInt(target.textContent.split(' ')[1], 10);
        // this.selectedRound = round;
        this.gamePageInstance.currentRound = round - 1;

        this.setTitleForRoundOption();
        this.proceedToSelectedRound();
      }
    });
  }

  // Event listener for level options
  private handleLevelListener(): void {
    this.selectLevelOption.getNode().addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (this.selectLevelOption.getNode().hasAttribute('active')) {
        this.selectLevelOption.getNode().removeAttribute('active');
      } else {
        this.selectLevelOption.getNode().setAttribute('active', 'true');
      }
      if (target.classList.contains(classes.levelItem) && target.textContent) {
        const level = parseInt(target.textContent.split(' ')[1], 10);
        // this.selectedLevel = level;
        this.gamePageInstance.currentLevel = level;

        this.setTitleForLevelOption();
        this.proceedToSelectedLevel();
      }
    });
  }
  // proceed to the selected round and level
  private proceedToSelectedRound(): void {
    this.gamePageInstance.gameWrap.getNode().removeAttribute('bg-revealed');
    this.gamePageInstance.gameWrap.getNode().innerHTML = '';
    this.gamePageInstance.addLinesForSentence();
    this.gamePageInstance.correctlyAssembledSentences = 0;
    this.gamePageInstance.currentSentenceIndex = 0;
    this.gamePageInstance.sentencesForRound.length = 0;
    this.gamePageInstance.currentSentenceCards.length = 0;
    this.gamePageInstance.guessedSentences.length = 0;
    this.gamePageInstance.autoCompletedSentences.length = 0;

    // set next round data
    this.gamePageInstance.handleFetchedData();
    this.gamePageInstance.displaySentence();
    this.gamePageInstance.getImageForRound();
    this.setTitleForRoundOption();
  }

  private proceedToSelectedLevel(): void {
    this.gamePageInstance.gameWrap.getNode().removeAttribute('bg-revealed');
    this.gamePageInstance.gameWrap.getNode().innerHTML = '';
    this.gamePageInstance.correctlyAssembledSentences = 0;
    this.gamePageInstance.currentSentenceIndex = 0;
    this.gamePageInstance.currentRound = 0;
    this.gamePageInstance.sentencesForRound.length = 0;
    this.gamePageInstance.currentSentenceCards.length = 0;
    this.gamePageInstance.guessedSentences.length = 0;
    this.gamePageInstance.autoCompletedSentences.length = 0;

    fetchWordData(this.gamePageInstance.currentLevel)
      .then(data => {
        this.gamePageInstance.fetchedWordData = data;
        this.gamePageInstance.handleFetchedData();
        this.gamePageInstance.displaySentence();
        this.gamePageInstance.getImageForRound();
        // Add lines for sentences
        this.gamePageInstance.addLinesForSentence();
        // Add options for different game rounds
        this.gamePageInstance.createElementsForRound();
        this.setTitleForLevelOption();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Method to update the title for the selected level option
  private setTitleForLevelOption(): void {
    const selectLevelTitle = this.selectOptionTitle.getNode() as HTMLDivElement;
    selectLevelTitle.textContent = `Level ${this.gamePageInstance.currentLevel}`;
  }

  // Method to update the title for the selected round option
  private setTitleForRoundOption(): void {
    const selectRoundTitle = this.selectRoundTitle.getNode() as HTMLDivElement;
    selectRoundTitle.textContent = `Round ${this.gamePageInstance.currentRound + 1}`;
  }
}
