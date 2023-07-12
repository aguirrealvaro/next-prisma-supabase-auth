import { fetcher } from "./fetcher";
import { SignCredentialsType, LoginResponse, SessionResponse } from "@/client/interfaces";

export const signUpUser = (body: SignCredentialsType): Promise<LoginResponse> => {
  return fetcher("auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const signInUser = (body: SignCredentialsType): Promise<LoginResponse> => {
  return fetcher("auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const getSession = (): Promise<SessionResponse> => {
  return fetcher("auth/session");
};

export const logOutSession = (): Promise<string> => {
  return fetcher("auth/logout", { method: "POST" });
};
