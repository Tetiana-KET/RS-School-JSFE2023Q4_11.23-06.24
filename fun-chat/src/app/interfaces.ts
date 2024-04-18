export interface User {
  login: string;
  password?: string;
  id?: string;
  isLogined?: boolean;
}

export interface AuthMessage {
  id: string;
  type: string;
  payload: {
    user: User;
  };
}

export interface RequestForAllUsers {
  id: string;
  type: string;
  payload: null;
}

export interface ResponseForAllUsers {
  id: string;
  type: string;
  payload: {
    users: [];
  };
}

export interface EventResponse {
  id: string;
  type: string;
  payload: {
    user?: { login: string; isLogined: boolean };
    error?: string;
  };
}

export interface UsersResponseData {
  id: string;
  type: string;
  payload: {
    users: User[];
  };
}
