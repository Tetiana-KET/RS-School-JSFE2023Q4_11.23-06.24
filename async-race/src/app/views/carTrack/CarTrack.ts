import classes from './CarTrack.module.css';
import { Component } from '../../components/Component';
import { CarOptions } from '../../interfaces/car.interface';

type CarActionsHandlers = {
  onDeleteClick: (input: { id: number }) => void;
  onStartClick: (input: { id: number }) => void;
  onStopClick: (input: { id: number }) => void;
};

export default class Car {
  private id: number;
  private name: string;
  private color: string;
  private element: Component<HTMLElement>;
  private handlers: CarActionsHandlers;

  constructor(options: CarOptions & CarActionsHandlers) {
    this.id = options.id;
    this.name = options.name;
    this.color = options.color;
    this.element = this.createCarElement();
    this.handlers = options;
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

  private clickSelectButtonHandler(): void {
    const { color } = this;
    const { name } = this;
    const { id } = this;
    const updateCarNameInput = document.querySelector('#update-car-name') as HTMLInputElement;
    const updateCarColorInput = document.querySelector('#update-car-color') as HTMLInputElement;
    const updateBtn = document.querySelector(`#updateBtn`) as HTMLButtonElement;
    updateBtn.disabled = false;
    updateCarNameInput.value = name;
    updateCarColorInput.value = color;
    updateCarNameInput.setAttribute('car-id', `${id}`);
  }

  private clickDeleteButtonHandler(): void {
    this.handlers.onDeleteClick({ id: this.id });
  }

  private clickStartButtonHandler(): void {
    console.log(`start`, this);
    this.handlers.onStartClick({ id: this.id });
  }

  private clickStopButtonHandler(): void {
    console.log(`stop`, this);
    this.handlers.onStopClick({ id: this.id });
  }

  public getElement(): HTMLElement {
    return this.element.getNode();
  }
}
