import type User from './UserModel';

export class ChatModel {
  private user: User;
  private usersBase: User[] = [];

  constructor() {
    this.user = {
      userName: '',
      password: '',
      isLogged: false,
    };
  }

  // Validation for username
  public validateUserName(userName: string): boolean {
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z_-]*\d?[a-zA-Z_-]*$/;
    const isUsernameValid = usernameRegex.test(userName) && userName.length >= 4;
    return isUsernameValid;
  }

  // Validation for password
  public validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\da-zA-Z]).{6,}$/;
    const isPasswordValid = passwordRegex.test(password) && password.length >= 6;
    return isPasswordValid;
  }

  public handleFormSubmit(): void {
    // const firstName = this.getFirstName();
    // const surname = this.getSurname();
    // const isLoggedIn = true;
  }

  public setCurrentUserData(userData: User): void {
    this.user.userName = userData.userName;
    this.user.password = userData.password;
    this.user.isLogged = userData.isLogged;
    console.log(this.user);
  }
}
