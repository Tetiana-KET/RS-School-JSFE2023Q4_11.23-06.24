import { Component } from '../Component';
import classes from './GameHeader.module.css';

export class GameHeader extends Component {
  private headerContainer: Component<HTMLDivElement>;
  private gameHeaderOptions: Component<HTMLDivElement>;
  private selectLevelOption: HTMLSelectElement;
  private selectPageOption: HTMLSelectElement;
  private gameCluesWrap: Component<HTMLDivElement>;

  constructor() {
    super({ tagName: 'header', classNames: [classes.gameHeaderContainer] });

    // Wrapper
    this.headerContainer = new Component({
      tagName: 'div',
      classNames: [classes.headerContainer],
    });
    this.append(this.headerContainer);

    // Options container
    this.gameHeaderOptions = new Component({
      tagName: 'div',
      classNames: [classes.gameHeaderOptions],
    });
    this.headerContainer.append(this.gameHeaderOptions);

    // Level select
    this.selectLevelOption = document.createElement('select');
    this.selectLevelOption.classList.add(classes.selectLevelOption, classes.select);
    // Add options for different game levels
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = `Level ${i}`;
      option.textContent = `Level ${i}`;
      this.selectLevelOption.appendChild(option);
    }
    this.gameHeaderOptions.getNode().append(this.selectLevelOption);

    // Page select
    this.selectPageOption = document.createElement('select');
    this.selectPageOption.classList.add(classes.pageSelectOption, classes.select);
    // Add options for different game levels
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = `Page ${i}`;
      option.textContent = `Page ${i}`;
      this.selectPageOption.appendChild(option);
    }
    this.gameHeaderOptions.getNode().append(this.selectPageOption);

    // Clues Buttons wrap
    this.gameCluesWrap = new Component({
      tagName: 'div',
      classNames: [classes.gameCluesWrap],
    });
    this.headerContainer.append(this.gameCluesWrap);

    // Add clue buttons
    for (let i = 1; i <= 4; i++) {
      const clueButton = document.createElement('button');
      clueButton.classList.add(classes.clueButton);
      this.gameCluesWrap.getNode().appendChild(clueButton);
    }

    // Event listener for clue buttons
    this.gameCluesWrap.getNode().addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    // Handle click event for clue buttons
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('clue-button')) {
      // Logic for handling clue button click
    }
  }
}