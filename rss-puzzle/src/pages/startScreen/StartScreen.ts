import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { Header } from '../../components/header/Header';
import classes from './StartScreen.module.css';
import bg from '../../assets/bg.jpg';

export class StartScreen extends Component {
  private header: Component;
  private footer: Component;
  private mainContent: Component<HTMLDivElement>;
  private appName: Component<HTMLHeadingElement>;
  private gameDescription: Component<HTMLParagraphElement>;
  private startButton: Component<HTMLButtonElement>;

  constructor() {
    super({ tagName: 'div', classNames: [classes.startScreen] });
    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundSize = 'cover';
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';

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

    // Footer
    this.footer = new Footer();
    this.append(this.footer);
  }
}
