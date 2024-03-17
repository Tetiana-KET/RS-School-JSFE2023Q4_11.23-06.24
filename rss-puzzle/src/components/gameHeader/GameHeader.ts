import { GamePage } from '../../pages/gamePage/GamePage';
import { fetchAudioData } from '../../utils/commonUtils';
import { handlePronounceHint, handleTranslateHint } from '../../utils/handleCluesClick';
import { Component } from '../Component';
import classes from './GameHeader.module.css';

export class GameHeader extends Component {
  private headerContainer: Component<HTMLDivElement>;
  private gameHeaderOptions: Component<HTMLDivElement>;
  private selectLevelOption: HTMLSelectElement;
  private selectPageOption: HTMLSelectElement;
  private playSoundButton: Component<HTMLButtonElement>;
  private gameCluesWrap: Component<HTMLDivElement>;
  private gamePageInstance: GamePage;
  private audioContext = new AudioContext();
  public audio: AudioBuffer | null = null;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'header', classNames: [classes.gameHeaderContainer] });
    this.gamePageInstance = gamePageInstance;

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

    // play sound button
    this.playSoundButton = new Component({
      tagName: 'button',
      classNames: [classes.playSoundButton, classes.clueButton],
      attributes: { disabled: true, id: 'playSoundButton' },
    });
    this.headerContainer.append(this.playSoundButton);
    this.playSoundButton.getNode().addEventListener('click', this.handleClick.bind(this));

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
    this.gameCluesWrap.getNode().children[0].classList.add(`${classes.translateHint}`);
    this.gameCluesWrap.getNode().children[0].setAttribute('id', 'translateHint');
    this.gameCluesWrap.getNode().children[1].classList.add(`${classes.pronunciationHint}`);
    this.gameCluesWrap.getNode().children[1].setAttribute('id', 'pronunciationHint');
    this.gameCluesWrap.getNode().children[2].classList.add(`${classes.bgImageHint}`);
    this.gameCluesWrap.getNode().children[2].setAttribute('id', 'bgImageHint');
    // Event listener for clue buttons
    this.gameCluesWrap.getNode().addEventListener('click', this.handleClick.bind(this));
  }

  private async handleClick(event: MouseEvent): Promise<void> {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains(`${classes.clueButton}`)) {
      if (target.classList.contains(`${classes.translateHint}`)) {
        if (target.getAttribute('active-hint')) {
          target.removeAttribute('active-hint');
        } else {
          target.setAttribute('active-hint', 'true');
        }
        handleTranslateHint(this.gamePageInstance);
      }
      if (target.classList.contains(`${classes.pronunciationHint}`)) {
        if (target.getAttribute('active-hint')) {
          target.removeAttribute('active-hint');
          this.playSoundButton.setAttribute('disabled', 'true');
        } else {
          target.setAttribute('active-hint', 'true');
          this.playSoundButton.removeAttribute('disabled');
        }
        handlePronounceHint(this.gamePageInstance);
      }
      if (target.classList.contains(`${classes.playSoundButton}`)) {
        target.setAttribute('active-hint', 'true');
        this.gamePageInstance.audioExample =
          this.gamePageInstance.fetchedWordData?.rounds[this.gamePageInstance.currentRound]?.words[
            this.gamePageInstance.currentSentenceIndex
          ]?.audioExample;

        await this.getAudio();
        this.playAudio();
      }
    }
  }

  public async getAudio(): Promise<void> {
    this.gamePageInstance.audioExample =
      this.gamePageInstance.fetchedWordData?.rounds[this.gamePageInstance.currentRound]?.words[
        this.gamePageInstance.currentSentenceIndex
      ]?.audioExample;

    if (this.gamePageInstance.audioExample) {
      try {
        this.audio = await fetchAudioData(this.gamePageInstance.audioExample, this.audioContext);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }
  }
  public playAudio() {
    if (this.audio) {
      this.playSoundButton.setAttribute('isPlaying', 'true');
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audio;
      source.connect(this.audioContext.destination);
      source.onended = () => {
        this.playSoundButton.removeAttribute('isPlaying');
      };
      source.start(this.audioContext.currentTime);
    }
  }
}
