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
  private modalSkippedResults: Component<HTMLDivElement>;
  private modalSkippedTitle: Component<HTMLHeadingElement>;
  private modalResultItem: Component<HTMLDivElement>;
  private modalItemAudio: Component<HTMLButtonElement>;
  private modalItemText: Component<HTMLParagraphElement>;
  private skippedCount: Component<HTMLSpanElement>;
  private guessedCount: Component<HTMLSpanElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.modal], attributes: { id: 'modal' } });
    this.modalContent = new Component({ tagName: 'div', classNames: [classes.modalContent] });
    this.modalFigure = new Component({ tagName: 'figure', classNames: [classes.modalFigure] });
    this.modalImageWrap = new Component({ tagName: 'div', classNames: [classes.modalImageWrap] });
    this.modalImage = new Component({ tagName: 'img', classNames: [classes.modalImage] });
    this.modalImageDescription = new Component({ tagName: 'figcaption', classNames: [classes.modalImageDescription] });
    this.modalResultsWrap = new Component({ tagName: 'div', classNames: [classes.modalResultsWrap] });
    this.modalGuessedResults = new Component({ tagName: 'div', classNames: [classes.modalGuessedResults] });
    this.modalGuessedTitle = new Component({ tagName: 'h2', classNames: [classes.modalGuessedTitle] });
    this.modalSkippedResults = new Component({ tagName: 'div', classNames: [classes.modalSkippedResults] });
    this.modalSkippedTitle = new Component({ tagName: 'h2', classNames: [classes.modalSkippedTitle] });
    this.modalResultItem = new Component({ tagName: 'div', classNames: [classes.modalResultItem] });
    this.modalItemText = new Component({ tagName: 'p', classNames: [classes.modalItemText] });
    this.modalItemAudio = new Component({ tagName: 'button', classNames: [classes.modalItemAudio] });
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
    this.modalGuessedTitle.setTextContent('Personally assembled sentences');
    // skipped
    this.modalResultsWrap.append(this.modalSkippedResults);
    this.modalSkippedResults.append(this.modalSkippedTitle);
    this.modalSkippedTitle.setTextContent('Assembled using Auto-complete button');
    this.createResultItemTemplate(this.modalSkippedResults);
    this.modalSkippedTitle.append(this.skippedCount);
    this.modalGuessedTitle.append(this.guessedCount);
  }

  private createResultItemTemplate(parent: Component<HTMLDivElement>): void {
    parent.append(this.modalResultItem);
    this.modalResultItem.append(this.modalItemAudio);
    this.modalItemAudio.setAttribute('type', 'button');
    this.modalItemAudio.setAttribute('id', 'Number');
    this.modalResultItem.append(this.modalItemText);
    this.modalItemText.setTextContent('Completete sentence will be there');
  }
}
