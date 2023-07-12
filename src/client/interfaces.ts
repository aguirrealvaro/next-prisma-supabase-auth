export type SignCredentialsType = {
  email: string;
  password: string;
};

type User = {
  id: string;
  role: string;
  email: string;
};

type Session = {
  access_token: string;
  user: User;
};

export type LoginResponse = {
  user: User;
  session?: Session;
};

export type SessionResponse = {
  session?: Session;
};
