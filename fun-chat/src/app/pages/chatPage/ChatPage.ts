import { Component } from '../../components/Component';
import { ChatController } from '../../controllers/chatController';
import classes from './ChatPage.module.css';

export class ChatPage extends Component<'section'> {
  private controller: ChatController;
  private aside: Component<'aside'>;
  private contactSearch: Component<'input'>;
  private usersList: Component<'ul'>;
  private userLine: Component<'li'>;
  private dialogContainer: Component<'article'>;
  private dialogHeader: Component<'h3'>;
  private dialogHeaderUserName: Component<'span'>;
  private dialogHeaderUserStatus: Component<'span'>;

  private dialogBody: Component<'div'>;
  private dialogForm: Component<'form'>;
  private dialogInput: Component<'input'>;
  private dialogFormButton: Component<'button'>;

  constructor() {
    super('section', { className: `${classes.chatPage}`, id: 'chatPage' });
    this.controller = new ChatController();
    this.aside = new Component('aside', { className: `${classes.chatPageAside}`, id: 'chatPageAside' });
    this.contactSearch = new Component('input', { className: `${classes.asideContactSearch}`, id: 'asideContactSearch' });
    this.usersList = new Component('ul', { className: `${classes.asideUsersList}`, id: 'asideUsersList' });
    this.userLine = new Component('li', { className: `${classes.asideUserLine}`, id: 'asideUserLine' });
    this.dialogContainer = new Component('article', { className: `${classes.chatPageDialog}`, id: 'chatPageDialog' });
    this.dialogHeader = new Component('h3', { className: `${classes.dialogHeader}`, id: 'dialogHeader' });
    this.dialogHeaderUserName = new Component('span', { className: `${classes.dialogHeaderUserName}`, text: 'Tatiana-KET', id: 'dialogUserName' });
    this.dialogHeaderUserStatus = new Component('span', { className: `${classes.dialogHeaderUserStatus}`, text: 'online', id: 'dialogUserStatus' });
    this.dialogBody = new Component('div', { className: `${classes.dialogBody}`, id: 'dialogBody' });
    this.dialogForm = new Component('form', { className: `${classes.dialogForm}`, id: 'dialogForm' });
    this.dialogInput = new Component('input', { className: `${classes.dialogInput}`, id: 'dialogInput' });
    this.dialogFormButton = new Component('button', { className: `${classes.dialogFormButton}`, text: 'Send', id: 'dialogFormButton' });

    this.constructPage();
  }

  private constructPage(): void {
    this.dialogFormButton.setAttribute('disabled', 'true');
    this.dialogInput.setAttribute('placeholder', 'Enter your message...');
    this.contactSearch.setAttribute('placeholder', 'Search...');
    this.aside.appendChildren([this.contactSearch, this.usersList]);
    this.dialogHeader.appendChildren([this.dialogHeaderUserName, this.dialogHeaderUserStatus]);
    this.dialogForm.appendChildren([this.dialogInput, this.dialogFormButton]);
    this.dialogContainer.appendChildren([this.dialogHeader, this.dialogBody, this.dialogForm]);
    this.appendChildren([this.aside, this.dialogContainer]);
  }
}
