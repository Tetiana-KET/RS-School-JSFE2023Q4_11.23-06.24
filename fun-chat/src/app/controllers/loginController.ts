import { ChatModel } from '../models/ChatModel';
import type User from '../models/UserModel';

export class LoginController {
  private chatModel: ChatModel;

  constructor() {
    this.chatModel = new ChatModel();
  }

  public handleUserNameValidation(userName: string): boolean {
    return this.chatModel.validateUserName(userName);
  }

  public handlePasswordValidation(password: string): boolean {
    return this.chatModel.validatePassword(password);
  }

  public handleFormSubmit(userData: User): void {
    this.chatModel.setCurrentUserData(userData);
  }
}
