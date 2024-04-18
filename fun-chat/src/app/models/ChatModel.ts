import type { User } from '../interfaces';

export class ChatModel {
  private activeUsers: User[] = [];
  private inactiveUsers: User[] = [];
  // constructor() {}
  public updateActiveUsers(users: User[]): void {
    this.activeUsers.push(...users);
    //  rendering function to update the UI HERE
    this.renderActiveUsers();
  }
  public updateInactiveUsers(users: User[]): void {
    this.inactiveUsers.push(...users);
    // rendering function to update the UI HERE
    this.renderInactiveUsers();
  }
  private renderActiveUsers(): void {
    // render active users on the page
    console.log('Active Users:', this.activeUsers);
  }

  private renderInactiveUsers(): void {
    //  render inactive users on the page
    console.log('Inactive Users:', this.inactiveUsers);
  }
}
