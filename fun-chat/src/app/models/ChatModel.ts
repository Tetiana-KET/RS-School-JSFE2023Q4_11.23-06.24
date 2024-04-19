import type { User } from '../interfaces';
import { eventNewUserAuthBus } from '../utils/eventBus';

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

  public addNewActiveUsers(user: User): void {
    this.activeUsers.push(user);
  }

  public updateUserStatusArrays(UserToUpdate: User): void {
    const activeUserIndex = this.activeUsers.findIndex(user => user.login === UserToUpdate.login);
    const inActiveUserIndex = this.inactiveUsers.findIndex(user => user.login === UserToUpdate.login);
    if (activeUserIndex !== -1) {
      this.activeUsers[activeUserIndex].isLogined = UserToUpdate.isLogined;
      this.inactiveUsers.push(...this.activeUsers.splice(activeUserIndex, 1));
    } else if (inActiveUserIndex !== -1) {
      this.inactiveUsers[inActiveUserIndex].isLogined = UserToUpdate.isLogined;
      this.activeUsers.push(...this.inactiveUsers.splice(inActiveUserIndex, 1));
    } else if (activeUserIndex === -1 && inActiveUserIndex === -1) {
      this.addNewActiveUsers(UserToUpdate);
      eventNewUserAuthBus.emit('newUserAuth', UserToUpdate);
    }
  }
}
