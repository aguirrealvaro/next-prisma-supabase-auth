export type SignCredentialsType = {
  email: string;
  password: string;
};

export type User = {
  user: {
    id: string;
    email: string;
  };
  session: Session;
};

export type Session = {
  session: {
    user: User;
  };
};
