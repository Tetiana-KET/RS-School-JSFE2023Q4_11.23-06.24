import type { User } from '../interfaces';

export class ChatModel {
  public activeUsers: User[] = [];
  public inactiveUsers: User[] = [];
  public allUsers: User[] = [];

  // constructor() {}

  public updateActiveUsers(users: User[]): void {
    this.activeUsers = users;
    console.log('active Users:', this.activeUsers);
  }

  public updateInactiveUsers(users: User[]): void {
    this.inactiveUsers = users;
    console.log('Inactive Users:', this.inactiveUsers);
  }
}
