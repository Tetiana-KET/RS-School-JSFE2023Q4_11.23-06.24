export interface User {
  login: string;
  password?: string;
}

export interface CurrentUser extends User {
  id: string;
  isLogined: boolean;
}

export interface AuthMessage {
  id: string;
  type: string;
  payload: {
    user: User;
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

export interface UserLoginResponse {
  id: string;
  type: string;
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}
