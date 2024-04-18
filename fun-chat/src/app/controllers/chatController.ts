// import type { AuthMessage, User } from '../interfaces';
import { ChatModel } from '../models/ChatModel';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { eventGetUsersBus } from '../utils/eventBus';
// import { generateRandomNumber } from '../utils/commonUtils';

export class ChatController {
  public chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;

  constructor(webSocketAPI: WebSocketAPI) {
    this.webSocketAPI = webSocketAPI;
    this.chatModel = new ChatModel();

    eventGetUsersBus.subscribe('USER_ACTIVE_data', responseData => {
      this.chatModel.updateActiveUsers(responseData.payload.users);
    });

    eventGetUsersBus.subscribe('USER_INACTIVE_data', responseData => {
      this.chatModel.updateInactiveUsers(responseData.payload.users);
    });
  }

  public start(): void {
    console.log(`chatModel `, this.chatModel);
    console.log(`webSocketAPI `, this.webSocketAPI);
  }
}
