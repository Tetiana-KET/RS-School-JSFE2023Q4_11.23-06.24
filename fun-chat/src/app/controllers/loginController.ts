import type { AuthMessage, User } from '../interfaces';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { generateRandomNumber } from '../utils/commonUtils';

export class LoginController {
  private webSocketAPI: WebSocketAPI;
  constructor(webSocketAPI: WebSocketAPI) {
    this.webSocketAPI = webSocketAPI;
  }

  // Validation for username
  public validateUserName(userName: string): boolean {
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z_-]*\d?[a-zA-Z_-]*$/;
    const isUsernameValid = usernameRegex.test(userName) && userName.length >= 4;
    return isUsernameValid;
  }

  // Validation for password
  public validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\da-zA-Z]).{8,}$/;
    const isPasswordValid = passwordRegex.test(password) && password.length >= 8;
    return isPasswordValid;
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
  }
}
