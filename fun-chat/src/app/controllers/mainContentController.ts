import { ChatModel } from '../models/ChatModel';

import { WebSocketAPI } from '../services/WebSocketAPI';

export class MainContentController {
  public chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;

  constructor() {
    this.chatModel = new ChatModel();
    this.webSocketAPI = new WebSocketAPI();
  }
  public navigateToAbout(): void {
    this.chatModel.router.navigateTo('#/about');
  }
  public navigateToLogin(): void {
    this.chatModel.router.navigateTo('#/login');
  }
  public navigateToChat(): void {
    this.chatModel.router.navigateTo('#/chat');
  }
}
