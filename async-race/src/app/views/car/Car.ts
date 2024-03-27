import classes from './Car.module.css';
import { Component } from '../../components/Component';
import { CarOptions } from '../../interfaces/car.interface';
import { deleteCar } from '../../utils/InteractionAPI';

export default class Car {
  private id: number;
  private name: string;
  private color: string;
  private element: Component<HTMLElement>;

  constructor(options: CarOptions) {
    this.id = options.id;
    this.name = options.name;
    this.color = options.color;
    this.element = this.createCarElement();
  }

  private createCarElement(): Component<HTMLElement> {
    const startButton = new Component({ tagName: 'button', text: 'Start', classNames: [classes.startBtn, classes.button] });
    const stopButton = new Component({
      tagName: 'button',
      text: 'Stop',
      classNames: [classes.stopBtn, classes.button],
      attributes: { disabled: 'true' },
    });
    const selectButton = new Component({ tagName: 'button', text: 'Select', classNames: [classes.selectBtn, classes.button] });
    const deleteButton = new Component({ tagName: 'button', text: 'Delete', classNames: [classes.deleteBtn, classes.button] });
    const nameSpan: Component<HTMLElement> = new Component({
      tagName: 'span',
      text: `${this.name}`,
      classNames: [classes.carName],
      attributes: { 'data-id': `${this.id}` },
    });
    const controls = new Component({
      tagName: 'div',
      classNames: [classes.carTrackControls],
      children: [startButton, stopButton, selectButton, deleteButton, nameSpan],
    });
    this.clickHandler(startButton, stopButton, selectButton, deleteButton);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `/sprite.svg#car${(this.id % 7) + 1}`);
    svg.classList.add(classes.carSvg);
    svg.style.fill = this.color;
    svg.append(use);
    const carIconWrap = new Component({ tagName: 'div', classNames: [classes.carIconWrap] });
    carIconWrap.getNode().appendChild(svg);
    const track = new Component({ tagName: 'div', classNames: [classes.carTrack], children: [carIconWrap] });
    const carTrackWrap = new Component({
      tagName: 'div',
      classNames: [classes.carTrackWrap],
      children: [track, controls],
      attributes: { id: `${this.id}` },
    });
    return carTrackWrap;
  }

  private clickHandler(
    startButton: Component<HTMLElement>,
    stopButton: Component<HTMLElement>,
    selectButton: Component<HTMLElement>,
    deleteButton: Component<HTMLElement>
  ): void {
    startButton.getNode().addEventListener('click', this.clickStartButtonHandler.bind(this));
    stopButton.getNode().addEventListener('click', this.clickStopButtonHandler.bind(this));
    selectButton.getNode().addEventListener('click', this.clickSelectButtonHandler.bind(this));
    deleteButton.getNode().addEventListener('click', this.clickDeleteButtonHandler.bind(this));
  }

  private clickStartButtonHandler(): void {
    console.log(`start`, this); // Car {id: 4, name: 'Ford', color: '#ef3c40', element: Component}
  }

  private clickStopButtonHandler(): void {
    console.log(`stop`, this);
  }

  private clickSelectButtonHandler(): void {
    console.log(`select`, this);
  }

  private async clickDeleteButtonHandler(): Promise<void> {
    console.log(`delete`, this);
    deleteCar(this.id);
    this.getElement().getNode().remove();
  }

  public getElement(): Component<HTMLElement> {
    return this.element;
  }
}
