import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { Header } from '../../components/header/Header';
import { GamePage } from '../gamePage/GamePage';
import bg from '../../assets/bg.jpg';
import classes from './StartScreen.module.css';

export class StartScreen extends Component {
  private header: Component;
  private footer: Component;
  private mainContent: Component<HTMLDivElement>;
  private appName: Component<HTMLHeadingElement>;
  private gameDescription: Component<HTMLParagraphElement>;
  private startButton: Component<HTMLButtonElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.startScreen] });
    this.setBackground();
    // header
    this.header = new Header();
    this.append(this.header);
    // main content wrapper
    this.mainContent = new Component({
      tagName: 'div',
      classNames: [classes.mainContentWrapper],
    });
    this.append(this.mainContent);
    // Title
    this.appName = new Component({
      tagName: 'h1',
      text: 'RSS English Puzzle Game',
      classNames: [classes.appTitle],
    });
    this.mainContent.append(this.appName);
    // Game description
    this.gameDescription = new Component({
      tagName: 'p',
      text: `Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.`,
      classNames: [classes.gameDescription],
    });
    this.mainContent.append(this.gameDescription);
    // Start button
    this.startButton = new Component({
      tagName: 'button',
      text: 'Start',
      classNames: [classes.startBtn],
    });
    this.mainContent.append(this.startButton);
    // event listener
    this.startButton.getNode().addEventListener('click', this.handleStartClick.bind(this));
    // Footer
    this.footer = new Footer();
    this.append(this.footer);
  }

  private handleStartClick(): void {
    localStorage.setItem('isPlaying', 'true');
    if (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    document.body.prepend(new GamePage().getNode());
  }

  private setBackground(): void {
    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundSize = 'cover';
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';
  }
}
