import { Component } from '../Component';
import classes from './userLine.module.css';

export class UserLine extends Component<'li'> {
  private userLineName: Component<'span'>;
  private userLineStatus: Component<'span'>;

  constructor(name: string, status: boolean) {
    super('li', { className: `${classes.userLine}` });
    this.setAttribute('id', `${name}`);
    this.userLineName = new Component('span', { className: `${classes.userLineName}`, id: `userLineName_${name}` }).setTextContent(`${name}`);

    this.userLineStatus = new Component('span', { className: `${classes.userLineStatus}`, id: `userLineStatus_${name}` }).setAttribute(
      'data-status',
      `${status}`
    );
    this.appendChildren([this.userLineStatus, this.userLineName]);
  }
}
