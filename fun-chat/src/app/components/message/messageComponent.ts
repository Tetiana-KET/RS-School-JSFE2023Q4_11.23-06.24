import type { MessageData } from '../../interfaces';
import { formatDateTimeFromTimestamp, getMessageStatus } from '../../utils/commonUtils';
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
    this.messageHeaderDate = new Component('label', { className: `${classes.messageHeaderDate}`, id: 'messageHeaderDate' });
    this.messageHeaderUser = new Component('label', { className: `${classes.messageHeaderUser}`, id: 'messageHeaderUser' });
    this.messageText = new Component('div', { className: `${classes.messageText}`, id: 'messageText' });
    this.messageFooter = new Component('div', { className: `${classes.messageFooter}`, id: 'messageFooter' });
    this.messageFooterStatus = new Component('label', { className: `${classes.messageFooterStatus}`, id: 'messageFooterStatus' });

    this.buildMessageElement();
  }

  private buildMessageElement(): void {
    this.messageHeader.appendChildren([this.messageHeaderUser, this.messageHeaderDate]);
    this.messageFooter.appendChild(this.messageFooterStatus);
    this.messageContent.appendChildren([this.messageHeader, this.messageText, this.messageFooter]);
    this.appendChild(this.messageContent);
  }

  public setMessageData(options: MessageData, attributeValue: string): void {
    console.log(options);
    const { text, datetime, from, status, id } = options;
    this.messageText.element.innerText = text;
    this.messageHeaderDate.element.innerText = formatDateTimeFromTimestamp(datetime);
    const statusString = getMessageStatus(status);
    this.messageFooterStatus.element.innerText = statusString;
    this.messageHeaderUser.element.innerText = from;
    this.messageContent.setAttribute('data-user', `${attributeValue}`);
    this.messageFooterStatus.setAttribute('data-user', `sensing-status`);
    this.setAttribute('id', `${id}`);
  }
}
