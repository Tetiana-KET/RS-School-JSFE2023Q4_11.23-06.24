import { GamePage } from '../../pages/gamePage/GamePage';
import { fetchAudioData } from '../../utils/commonUtils';
import { Component } from '../Component';
import classes from './ModalResults.module.css';

export class ModalResults extends Component {
  private modalContent: Component<HTMLDivElement>;
  private modalFigure: Component<HTMLElement>;
  private modalImageWrap: Component<HTMLDivElement>;
  private modalImageDescription: Component<HTMLElement>;
  private modalImage: Component<HTMLImageElement>;
  private modalResultsWrap: Component<HTMLDivElement>;
  private modalGuessedResults: Component<HTMLDivElement>;
  private modalGuessedTitle: Component<HTMLHeadingElement>;
  private skippedItemsWrap: Component<HTMLDivElement>;
  private guessedItemsWrap: Component<HTMLDivElement>;

  private modalSkippedResults: Component<HTMLDivElement>;
  private modalSkippedTitle: Component<HTMLHeadingElement>;

  private skippedCount: Component<HTMLSpanElement>;
  private guessedCount: Component<HTMLSpanElement>;
  private gameInstance: GamePage;
  private audioContext = new AudioContext();
  public audio: AudioBuffer | null = null;
  constructor(gameInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.modal], attributes: { id: 'modal' } });
    this.gameInstance = gameInstance;
    this.modalContent = new Component({ tagName: 'div', classNames: [classes.modalContent] });
    this.modalFigure = new Component({ tagName: 'figure', classNames: [classes.modalFigure] });
    this.modalImageWrap = new Component({ tagName: 'div', classNames: [classes.modalImageWrap] });
    this.modalImage = new Component({ tagName: 'img', classNames: [classes.modalImage] });
    this.modalImageDescription = new Component({ tagName: 'figcaption', classNames: [classes.modalImageDescription] });
    this.modalResultsWrap = new Component({ tagName: 'div', classNames: [classes.modalResultsWrap] });
    this.modalGuessedResults = new Component({ tagName: 'div', classNames: [classes.modalGuessedResults], attributes: { id: 'guessed' } });
    this.modalGuessedTitle = new Component({ tagName: 'h2', classNames: [classes.modalGuessedTitle] });
    this.skippedItemsWrap = new Component({ tagName: 'div', classNames: [classes.skippedItemsWrap] });
    this.modalSkippedResults = new Component({ tagName: 'div', classNames: [classes.modalSkippedResults], attributes: { id: 'skipped' } });
    this.modalSkippedTitle = new Component({ tagName: 'h2', classNames: [classes.modalSkippedTitle] });
    this.guessedItemsWrap = new Component({ tagName: 'div', classNames: [classes.guessedItemsWrap] });

    this.skippedCount = new Component({ tagName: 'span', classNames: [classes.skippedCount] });
    this.guessedCount = new Component({ tagName: 'span', classNames: [classes.guessedCount] });
    this.createTemplate();
  }

  private createTemplate(): void {
    // Wrapper
    this.append(this.modalContent);
    // modal Image Wrap
    this.modalContent.append(this.modalFigure);
    // modal Image
    this.modalFigure.append(this.modalImageWrap);
    this.modalImageWrap.append(this.modalImage);
    this.modalImage.setAttribute('alt', 'completed round image');
    this.modalFigure.append(this.modalImageDescription);
    this.modalImageDescription.setTextContent('Image information will be here');
    // modal Results Wrap
    this.modalContent.append(this.modalResultsWrap);
    // Guessed
    this.modalResultsWrap.append(this.modalGuessedResults);
    this.modalGuessedResults.append(this.modalGuessedTitle);
    this.modalGuessedResults.append(this.guessedItemsWrap);
    this.modalGuessedTitle.setTextContent('Personally assembled sentences');
    this.modalGuessedTitle.append(this.guessedCount);
    // skipped
    this.modalResultsWrap.append(this.modalSkippedResults);
    this.modalSkippedResults.append(this.modalSkippedTitle);
    this.modalSkippedResults.append(this.skippedItemsWrap);
    this.modalSkippedTitle.setTextContent('Assembled using Auto-complete button');
    this.modalSkippedTitle.append(this.skippedCount);
  }

  private createResultItemTemplate(i: number, sentencesForRound: string[], parent: HTMLDivElement): void {
    const modalResultItem = new Component({ tagName: 'div', classNames: [classes.modalResultItem] });
    const modalItemText = new Component({ tagName: 'p', classNames: [classes.modalItemText] });
    const modalItemAudio = new Component({
      tagName: 'button',
      classNames: [classes.modalItemAudio],
      attributes: { type: 'button', id: `i_${i}` },
    });
    modalResultItem.append(modalItemAudio);
    modalResultItem.append(modalItemText);
    modalItemText.setTextContent(`${sentencesForRound[i]}`);
    parent.append(modalResultItem.getNode());
    // Add event listener to play audio
    modalItemAudio.getNode().addEventListener('click', () => {
      this.playAudioForIndex(i);
      modalItemAudio.getNode().setAttribute('isPlaying', 'true');
      this.getNode()
        .querySelectorAll(`.${classes.modalItemAudio}`)
        .forEach(button => {
          button.setAttribute('disabled', 'true');
        });
      setTimeout(() => {
        modalItemAudio.getNode().removeAttribute('isPlaying');
        this.getNode()
          .querySelectorAll(`.${classes.modalItemAudio}`)
          .forEach(button => {
            button.removeAttribute('disabled');
          });
      }, 2000);
    });
  }

  private async playAudioForIndex(index: number): Promise<void> {
    const audioExample = this.gameInstance.fetchedWordData?.rounds[this.gameInstance.currentRound]?.words[index]?.audioExample;
    if (audioExample) {
      try {
        const audio = await fetchAudioData(audioExample, this.audioContext);
        const source = this.audioContext.createBufferSource();
        source.buffer = audio;
        source.connect(this.audioContext.destination);
        source.start(this.audioContext.currentTime);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  }

  public createResultItems(): void {
    this.guessedItemsWrap.getNode().innerHTML = '';
    this.skippedItemsWrap.getNode().innerHTML = '';

    this.gameInstance.guessedSentences.forEach(index => {
      this.createResultItemTemplate(index, this.gameInstance.sentencesForRound, this.guessedItemsWrap.getNode());
    });

    this.gameInstance.autoCompletedSentences.forEach(index => {
      this.createResultItemTemplate(index, this.gameInstance.sentencesForRound, this.skippedItemsWrap.getNode());
    });
  }
}
