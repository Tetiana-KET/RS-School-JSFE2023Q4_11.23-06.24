import { Component } from '../Component';
import classes from './messageComponent.module.css';

export class MessageComponent extends Component<'div'> {
  public messageContent: Component<'div'>;
  private messageHeader: Component<'div'>;
  private messageHeaderUser: Component<'label'>;
  private messageHeaderDate: Component<'label'>;
  public messageText: Component<'div'>;
  private messageFooter: Component<'div'>;
  private messageFooterStatus: Component<'label'>;

  constructor() {
    super('div', { className: `${classes.messageContainer}` });

    this.messageContent = new Component('div', { className: `${classes.messageContent}`, id: 'messageContent' });
    this.messageHeader = new Component('div', { className: `${classes.messageHeader}`, id: 'messageHeader' });
    this.messageHeaderDate = new Component('label', {
      className: `${classes.messageHeaderDate}`,
      id: 'messageHeaderDate',
      text: '21.04.2024, 16:53:42',
    });
    this.messageHeaderUser = new Component('label', { className: `${classes.messageHeaderUser}`, id: 'messageHeaderUser', text: 'You' });
    this.messageText = new Component('div', { className: `${classes.messageText}`, id: 'messageText' });
    this.messageFooter = new Component('div', { className: `${classes.messageFooter}`, id: 'messageFooter' });
    this.messageFooterStatus = new Component('label', { className: `${classes.messageFooterStatus}`, id: 'messageFooterStatus', text: 'delivered' });

    this.buildMessageElement();
  }

  private buildMessageElement(): void {
    this.messageHeader.appendChildren([this.messageHeaderUser, this.messageHeaderDate]);
    this.messageFooter.appendChild(this.messageFooterStatus);
    this.messageContent.appendChildren([this.messageHeader, this.messageText, this.messageFooter]);
    this.appendChild(this.messageContent);
  }
}
