import { fetcher } from "./fetcher";
import { SignCredentialsType, User, Session } from "@/client/interfaces";

export const signUpUser = (body: SignCredentialsType): Promise<User> => {
  return fetcher("auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const signInUser = (body: SignCredentialsType): Promise<User> => {
  return fetcher("auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const getSession = (): Promise<Session> => {
  return fetcher("auth/session");
};
