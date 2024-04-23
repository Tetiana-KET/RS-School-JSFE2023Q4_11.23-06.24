import { MessageComponent } from '../components/message/messageComponent';
import type { EventResponse, FetchHistoryResponse, MessageDataMap, MessageReadStatusChange, MSGSentServerResponse, User } from '../interfaces';
import { ChatModel } from '../models/ChatModel';
import type { ChatPage } from '../pages/chatPage/ChatPage';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { getUserFromSessionStorage, scrollToNewMessage } from '../utils/commonUtils';
import {
  eventGetUsersBus,
  eventExternalUserBus,
  eventNewUserAuthBus,
  eventBus,
  eventSearchInputChangedBus,
  eventUserSelectedBus,
  eventMessageSentBus,
  eventFetchHistoryBus,
  eventMSGSentServerResponseBus,
  eventMessageReadBus,
} from '../utils/eventBus';

export class ChatController {
  public chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;
  public chatPage: ChatPage;
  private messageMap: MessageDataMap;

  constructor(webSocketAPI: WebSocketAPI, chatPage: ChatPage) {
    this.webSocketAPI = webSocketAPI;
    this.chatPage = chatPage;
    this.chatModel = new ChatModel();
    this.messageMap = {};

    this.addSubscriptions();
  }

  private addSubscriptions(): void {
    eventGetUsersBus.subscribe('USER_ACTIVE_data', responseData => {
      this.chatModel.updateActiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.renderUsers(this.chatModel.activeUsers, asideUsersList, this.messageMap);
      }
    });
    eventGetUsersBus.subscribe('USER_INACTIVE_data', responseData => {
      this.chatModel.updateInactiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.renderUsers(this.chatModel.inactiveUsers, asideUsersList, this.messageMap);
      }
    });
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGIN', this.handleUSER_EXTERNAL_LOG_IN_OUT.bind(this));
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGOUT', this.handleUSER_EXTERNAL_LOG_IN_OUT.bind(this));
    eventNewUserAuthBus.subscribe('newUserAuth', this.callDrawNewUser.bind(this));
    eventBus.subscribe('successLogin', this.setCurUser.bind(this));
    eventSearchInputChangedBus.subscribe('searchInputChanged', this.callSearchHandler.bind(this));
    eventUserSelectedBus.subscribe('userToChatWithSelected', this.userToChatWithSelectedHandler.bind(this));
    eventMessageSentBus.subscribe('eventMessageSent', this.messageSentHandler.bind(this));
    eventMSGSentServerResponseBus.subscribe('MSG_SEND', this.messageSentFromServerHandler.bind(this));
    eventFetchHistoryBus.subscribe('MSG_FROM_USER_Fetched', this.historyFetchedHandler.bind(this));
    eventMessageReadBus.subscribe('MSG_READ', this.messageReadHandler.bind(this));
  }

  private messageReadHandler(data: MessageReadStatusChange): void {
    console.log(data);
  }

  private handleUSER_EXTERNAL_LOG_IN_OUT(responseData: EventResponse): void {
    const { user } = responseData.payload;
    if (user) {
      this.chatPage.displayUpdatedStatus(user);
      this.chatModel.updateUserStatusArrays(user);
    }
    if (user && this.chatModel.recipient === user.login) {
      this.chatPage.updateStatusInDialogueHeader(user);
    }
    if (responseData.type === 'USER_EXTERNAL_LOGIN') {
      Array.from(document.querySelectorAll('label[data-user="sensing-status"]')).forEach(label => {
        const el = label;
        el.textContent = 'delivered';
      });
    }
  }

  // after got response from server render for recipient
  private messageSentFromServerHandler(responseData: MSGSentServerResponse): void {
    const { datetime, text, from, to } = responseData.payload.message;
    const status = responseData.payload.message.status.isDelivered;

    const dialogueOpenWith = document.getElementById('dialogUserName')?.innerText;
    const message = text;
    const dialogBody = document.getElementById('dialogBody');

    if (dialogBody && this.chatModel.mode === 'dialogStarted' && this.chatModel.currentUser?.login === to && dialogueOpenWith === to) {
      const options = { datetime, message, from, attributeValue: 'recipient', status };
      const messageBlock = new MessageComponent();
      messageBlock.setMessageData(options);
      dialogBody.append(messageBlock.element);
      scrollToNewMessage(dialogBody, messageBlock.element);
    }
  }

  // when send a msg render for sender
  private messageSentHandler(message: string): void {
    // default message in chat body
    const el = document.getElementById('dialogBodyText');
    this.chatModel.mode = 'dialogStarted';
    if (el) {
      this.chatPage.renderDialogBodyText(this.chatModel.mode, el);
    }

    // render own sent message
    const dialogBody = document.getElementById('dialogBody');
    const datetime = new Date().getTime();
    console.log(datetime);
    const to = document.getElementById('dialogUserName')?.textContent || '';
    const status = this.chatModel.setStatus(to);
    const options = { datetime, status, message, from: 'You', attributeValue: 'current' };
    const messageBlock = new MessageComponent();
    messageBlock.setMessageData(options);
    if (dialogBody && this.chatModel.mode === 'dialogStarted') {
      dialogBody.append(messageBlock.element);
      scrollToNewMessage(dialogBody, messageBlock.element);
    }
    // send message to server
    this.webSocketAPI.sendMessage(message, this.chatModel.recipient);
  }

  // when open a dialogue check the history and render all messages
  private historyFetchedHandler(data: FetchHistoryResponse): void {
    const { length } = data.payload.messages;
    const { messages } = data.payload;
    const dialogBody = document.getElementById('dialogBody');
    if (dialogBody) {
      dialogBody.innerHTML = '';
    }
    if (length) {
      this.chatModel.mode = 'dialogStarted';
      const el = document.getElementById('dialogBodyText');

      if (el) {
        this.chatPage.renderDialogBodyText(this.chatModel.mode, el);
      }

      messages.forEach(item => {
        const { datetime } = item;
        const status = item.status.isDelivered || false;
        const message = item.text;
        let { from } = item;
        const attributeValue = this.chatModel.currentUser?.login === from ? 'current' : 'recipient';
        from = this.chatModel.currentUser?.login === from ? 'You' : from;
        const options = { datetime, status, message, from, attributeValue };
        const messageBlock = new MessageComponent();
        messageBlock.setMessageData(options);

        if (dialogBody) {
          dialogBody.append(messageBlock.element);
        }
      });
    }
  }

  private userToChatWithSelectedHandler(id: string): void {
    this.chatModel.recipient = id;
    const spanText = document.getElementById('dialogBodyText');
    const dialogInput = document.getElementById('dialogInput');
    this.chatModel.mode = 'userSelected';
    this.webSocketAPI.fetchMessageHistoryWithUser(id);
    if (spanText) {
      this.chatPage.renderDialogBodyText(this.chatModel.mode, spanText);
    }
    if (dialogInput) {
      dialogInput.removeAttribute('disabled');
    }
  }

  private callSearchHandler(searchString: string): void {
    this.chatModel.searchUser(searchString, this.chatPage.renderUsers);
  }

  private callDrawNewUser(UserToUpdate: User): void {
    if (UserToUpdate.login !== this.chatModel.currentUser?.login) {
      const asideUsersList = document.getElementById('asideUsersList');
      if (this.chatModel.activeUsers.includes(UserToUpdate) && this.chatModel.inactiveUsers.includes(UserToUpdate)) {
        return;
      }
      if (asideUsersList) {
        this.chatPage.drawNewLoggedUser(UserToUpdate, asideUsersList);
      }
    }
  }

  private setUnreadMessages(): void {
    this.chatModel.activeUsers.forEach(user => {
      this.webSocketAPI.fetchMessageHistoryWithUser(user.login);
    });
    this.chatModel.inactiveUsers.forEach(user => {
      this.webSocketAPI.fetchMessageHistoryWithUser(user.login);
    });
  }

  private setCurUser(): void {
    const user = getUserFromSessionStorage();
    // Восстанавливаем messageMap из сессионного хранилища
    // const storedMessageMap = sessionStorage.getItem('messageMap');
    // if (storedMessageMap) {
    //   this.messageMap = JSON.parse(storedMessageMap);
    // }

    if (user) {
      this.chatModel.setCurrentUser(user);
      this.setUnreadMessages();
    }
  }

  public start(): void {
    this.setCurUser();
    this.webSocketAPI.start();
  }
}
