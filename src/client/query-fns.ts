import { fetcher } from "./fetcher";
import { SignCredentialsType, LoginResponse } from "@/client/interfaces";

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

export const logOutSession = (): Promise<string> => {
  return fetcher("auth/logout", { method: "POST" });
};
