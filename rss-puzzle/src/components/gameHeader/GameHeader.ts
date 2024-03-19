import { GamePage } from '../../pages/gamePage/GamePage';
import { fetchAudioData } from '../../utils/commonUtils';
import { handleBgImageHint, handlePronounceHint, handleTranslateHint } from '../../utils/handleCluesClick';
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
    super({ tagName: 'div', classNames: [classes.gameHeaderContainer] });
    this.gamePageInstance = gamePageInstance;
    this.headerContainer = new Component({ tagName: 'div', classNames: [classes.headerContainer] });
    this.append(this.headerContainer);
    this.gameHeaderOptions = new Component({ tagName: 'div', classNames: [classes.gameHeaderOptions] });
    this.headerContainer.append(this.gameHeaderOptions);
    this.selectLevelOption = document.createElement('select');
    this.selectLevelOption.classList.add(classes.selectLevelOption, classes.select);
    this.createOptionsForLevel();
    this.gameHeaderOptions.getNode().append(this.selectLevelOption);
    this.selectPageOption = document.createElement('select');
    this.selectPageOption.classList.add(classes.pageSelectOption, classes.select);
    this.createOptionsForRound();
    this.gameHeaderOptions.getNode().append(this.selectPageOption);
    this.playSoundButton = new Component({
      tagName: 'button',
      classNames: [classes.playSoundButton, classes.clueButton],
      attributes: { id: 'playSoundButton' },
    });
    this.headerContainer.append(this.playSoundButton);
    this.playSoundButton.getNode().addEventListener('click', this.handleClick.bind(this));
    this.gameCluesWrap = new Component({ tagName: 'div', classNames: [classes.gameCluesWrap] });
    this.headerContainer.append(this.gameCluesWrap);
    this.addClueButtons();
    this.toggleDefaultSettings();
    this.gameCluesWrap.getNode().addEventListener('click', this.handleClick.bind(this));
  }
  // Add options for different game levels
  private createOptionsForLevel(): void {
    for (let i = 1; i <= 10; i += 1) {
      const option = document.createElement('option');
      option.value = `Level ${i}`;
      option.textContent = `Level ${i}`;
      this.selectLevelOption.appendChild(option);
    }
  }

  // Add options for different game rounds
  private createOptionsForRound(): void {
    for (let i = 1; i <= 10; i += 1) {
      const option = document.createElement('option');
      option.value = `Page ${i}`;
      option.textContent = `Page ${i}`;
      this.selectPageOption.appendChild(option);
    }
  }

  private addClueButtons(): void {
    for (let i = 1; i <= 3; i += 1) {
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
  }
  private toggleDefaultSettings(): void {
    if (this.gamePageInstance.isTranslateEnabled) {
      this.gameCluesWrap.getNode().children[0].setAttribute('active-hint', 'true');
    } else if (this.gamePageInstance.isPronounceEnabled) {
      this.gameCluesWrap.getNode().children[1].setAttribute('active-hint', 'true');
    } else if (this.gamePageInstance.isBgImageHintEnabled) {
      this.gameCluesWrap.getNode().children[2].setAttribute('active-hint', 'true');
    }
  }

  private async handleClick(event: MouseEvent): Promise<void> {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains(`${classes.clueButton}`)) {
      // TRANSLATE HINT
      if (target.classList.contains(`${classes.translateHint}`)) {
        handleTranslateHint(this.gamePageInstance, target);
      }

      // PRONOUNCE HINT
      if (target.classList.contains(`${classes.pronunciationHint}`)) {
        handlePronounceHint(target, this.playSoundButton);
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

      // IMAGE HINT
      if (target.classList.contains(`${classes.bgImageHint}`)) {
        handleBgImageHint(this.gamePageInstance, target);
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
  public playAudio(): void {
    if (this.audio) {
      this.playSoundButton.setAttribute('isPlaying', 'true');
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audio;
      source.connect(this.audioContext.destination);
      source.onended = (): void => {
        this.playSoundButton.removeAttribute('isPlaying');
      };
      source.start(this.audioContext.currentTime);
    }
  }
}
