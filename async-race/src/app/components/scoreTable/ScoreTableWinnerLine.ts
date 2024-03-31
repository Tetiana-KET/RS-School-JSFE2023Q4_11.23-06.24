import classes from './ScoreTable.module.css';

import { CarOptions, WinnerOptions } from '../../interfaces/car.interface';
import { Component } from '../Component';
import { createSvg } from '../../utils/RenderingUI';

export default class WinnerLine {
  private rowNum: number;
  private id: number;
  private wins: number;
  private time: number;
  private color: string = '';
  private carName: string = '';
  private element: Component<HTMLElement>;

  constructor(options: WinnerOptions, winnerInfo: CarOptions, rowNum: number) {
    this.rowNum = rowNum;
    this.id = options.id;
    this.wins = options.wins;
    this.time = options.time;
    this.color = winnerInfo.color;
    this.carName = winnerInfo.name;
    this.element = this.createWinnerLineComponent();
  }

  private createWinnerLineComponent(): Component<HTMLElement> {
    const winnerRow = new Component({
      tagName: 'tr',
    });
    const svg = createSvg(classes, this.id, this.color);
    // table cells
    const rowNumCell = document.createElement('th');
    rowNumCell.setAttribute('scope', 'row');
    rowNumCell.textContent = this.rowNum.toString();

    const carNameCell = document.createElement('td');
    carNameCell.textContent = this.carName;

    const winsCell = document.createElement('td');
    winsCell.textContent = this.wins.toString();

    const timeCell = document.createElement('td');
    timeCell.textContent = this.time.toString();

    const svgCell = document.createElement('td');
    svgCell.appendChild(svg);

    winnerRow.getNode().appendChild(rowNumCell);
    winnerRow.getNode().appendChild(svgCell);
    winnerRow.getNode().appendChild(carNameCell);
    winnerRow.getNode().appendChild(winsCell);
    winnerRow.getNode().appendChild(timeCell);

    return winnerRow;
  }

  public getElement(): HTMLElement {
    return this.element.getNode();
  }
}
