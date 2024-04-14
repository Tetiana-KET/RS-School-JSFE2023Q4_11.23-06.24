export interface User {
  login: string;
  password: string;
}

export interface CurrentUser extends User {
  id: string;
  isOnline: boolean;
}

export interface AuthMessage {
  id: string;
  type: string;
  payload: {
    user: User;
  };
}
