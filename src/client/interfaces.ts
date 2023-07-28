export type SignCredentialsType = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  role?: string;
  email?: string;
};

export type Session = {
  access_token: string;
  user: User;
};

export type LoginResponse = {
  user: User;
  session?: Session;
};
