import { MessageComponent } from '../components/message/messageComponent';
import type { MSGSentServerResponse, User } from '../interfaces';
import { ChatModel } from '../models/ChatModel';
import type { ChatPage } from '../pages/chatPage/ChatPage';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { formatDateTimeFromTimestamp, getUserFromSessionStorage } from '../utils/commonUtils';
import {
  eventGetUsersBus,
  eventExternalUserBus,
  eventNewUserAuthBus,
  eventBus,
  eventSearchInputChangedBus,
  eventUserSelectedBus,
  eventMessageSentBus,
  eventMSGSentServerResponseBus,
} from '../utils/eventBus';

export class ChatController {
  public chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;
  public chatPage: ChatPage;

  constructor(webSocketAPI: WebSocketAPI, chatPage: ChatPage) {
    this.webSocketAPI = webSocketAPI;
    this.chatPage = chatPage;
    this.chatModel = new ChatModel();

    eventGetUsersBus.subscribe('USER_ACTIVE_data', responseData => {
      this.chatModel.updateActiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.renderUsers(this.chatModel.activeUsers, asideUsersList);
      }
    });
    eventGetUsersBus.subscribe('USER_INACTIVE_data', responseData => {
      this.chatModel.updateInactiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.renderUsers(this.chatModel.inactiveUsers, asideUsersList);
      }
    });
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGIN', responseData => {
      const { user } = responseData.payload;
      if (user) {
        this.chatPage.displayUpdatedStatus(user);
        this.chatModel.updateUserStatusArrays(user);
      }
    });
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGOUT', responseData => {
      const { user } = responseData.payload;
      if (user) {
        this.chatPage.displayUpdatedStatus(user);
        this.chatModel.updateUserStatusArrays(user);
      }
    });
    eventNewUserAuthBus.subscribe('newUserAuth', this.callDrawNewUser.bind(this));
    eventBus.subscribe('successLogin', this.setCurUser.bind(this));
    eventSearchInputChangedBus.subscribe('searchInputChanged', this.callSearchHandler.bind(this));
    eventUserSelectedBus.subscribe('userToChatWithSelected', this.userToChatWithSelectedHandler.bind(this));
    eventMessageSentBus.subscribe('eventMessageSent', this.messageSentHandler.bind(this));
    eventMSGSentServerResponseBus.subscribe('MSG_SEND', this.messageSentToServerHandler.bind(this));
  }

  private messageSentHandler(message: string): void {
    // default message in chat body
    const el = document.getElementById('dialogBodyText');
    this.chatModel.mode = 'dialogStarted';
    if (el) {
      this.chatPage.renderDialogBodyText(this.chatModel.mode, el);
    }
    // send message to server
    const messageText = message;
    this.webSocketAPI.sendMessage(messageText, this.chatModel.recipient);
  }

  // after got response from server
  private messageSentToServerHandler(responseData: MSGSentServerResponse): void {
    const dialogBody = document.getElementById('dialogBody');

    const time = formatDateTimeFromTimestamp(responseData.payload.message.datetime);
    const status = responseData.payload.message.status.isDelivered || false;
    const message = responseData.payload.message.text;

    let { from } = responseData.payload.message;
    const attributeValue = this.chatModel.currentUser?.login === from ? 'current' : 'recipient';
    from = this.chatModel.currentUser?.login === from ? 'You' : from;

    const options = { time, status, message, from, attributeValue };

    console.log(options);

    const messageBlock = new MessageComponent();
    messageBlock.setMessageData(options);

    if (dialogBody) {
      dialogBody.append(messageBlock.element);
    }
  }

  private userToChatWithSelectedHandler(id: string): void {
    this.chatModel.recipient = id;
    console.log(`this.chatModel.recipient `, this.chatModel.recipient);

    const spanText = document.getElementById('dialogBodyText');
    const dialogInput = document.getElementById('dialogInput');
    this.chatModel.mode = 'userSelected';
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
      if (asideUsersList) {
        this.chatPage.drawNewLoggedUser(UserToUpdate, asideUsersList);
      }
    }
  }

  private setCurUser(): void {
    const user = getUserFromSessionStorage();
    if (user) {
      this.chatModel.setCurrentUser(user);
    }
  }

  public start(): void {
    this.setCurUser();
    this.webSocketAPI.start();
  }
}
