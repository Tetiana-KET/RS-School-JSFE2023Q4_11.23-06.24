import type { CurrentUser, User } from '../interfaces';
import { Router } from '../pages/Router';

export class ChatModel {
  private currentUser: CurrentUser;
  private usersBase: User[] = [];
  public router: Router;

  constructor() {
    this.currentUser = {
      login: '',
      password: '',
      id: '',
      isOnline: false,
    };
    this.router = new Router();
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

  public setCurrentUserData(userData: User): void {
    this.currentUser.login = userData.login;
    this.currentUser.password = userData.password;
    console.log(this.currentUser);
  }

  public handleFormSubmit(): void {
    // const firstName = this.getFirstName();
    // const surname = this.getSurname();
  }
}
