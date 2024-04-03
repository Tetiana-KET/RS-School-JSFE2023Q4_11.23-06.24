import { Component } from '../Component';
import classes from './Header.module.css';

export class Header extends Component {
  private headerContainer: Component<HTMLDivElement>;
  private headerLogo: Component<HTMLHeadingElement>;
  private buttonsWrap: Component<HTMLDivElement>;
  private garageButton: Component<HTMLButtonElement>;
  private winnersButton: Component<HTMLButtonElement>;

  constructor() {
    super({ tagName: 'header', classNames: [classes.header] });
    // Wrapper
    this.headerContainer = new Component({
      tagName: 'div',
      classNames: [classes.headerContainer],
    });
    this.append(this.headerContainer);

    // logo
    this.headerLogo = new Component({
      tagName: 'h2',
      text: 'Async Raсe',
      classNames: [classes.headerLogo],
    });
    this.headerContainer.append(this.headerLogo);

    this.buttonsWrap = new Component({ tagName: 'div', classNames: [classes.buttonsWrap] });
    this.headerContainer.append(this.buttonsWrap);

    this.garageButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.garageButton],
      text: 'Garage',
      attributes: { type: 'button', id: 'toGarageBtn', disabled: 'true' },
    });

    this.buttonsWrap.append(this.garageButton);
    this.winnersButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.winnersButton],
      text: 'Winners',
      attributes: { type: 'button', id: 'toWinnersBtn' },
    });
    this.buttonsWrap.append(this.winnersButton);
  }
}
