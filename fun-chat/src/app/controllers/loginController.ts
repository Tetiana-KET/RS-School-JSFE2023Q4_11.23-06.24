import type { AuthMessage, User } from '../interfaces';
import { ChatModel } from '../models/ChatModel';
import { WebSocketAPI } from '../services/WebSocketAPI';
import { generateRandomNumber } from '../utils/commonUtils';

export class LoginController {
  private chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;

  constructor() {
    this.chatModel = new ChatModel();
    this.webSocketAPI = new WebSocketAPI();
  }

  public handleUserNameValidation(userName: string): boolean {
    return this.chatModel.validateUserName(userName);
  }

  public handlePasswordValidation(password: string): boolean {
    return this.chatModel.validatePassword(password);
  }

  public handleFormSubmit(userData: User): void {
    const authMessage: AuthMessage = {
      id: generateRandomNumber().toString(),
      type: 'USER_LOGIN',
      payload: {
        user: userData,
      },
    };
    this.webSocketAPI.userAuthentication(authMessage);
    this.chatModel.setCurrentUserData(userData);
  }
}
