import { ChatModel } from '../models/ChatModel';
import type { ChatPage } from '../pages/chatPage/ChatPage';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { eventGetUsersBus } from '../utils/eventBus';

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
  }

  public start(): void {
    console.log(`chatModel `, this.chatModel);
    console.log(`webSocketAPI `, this.webSocketAPI);
  }
}
