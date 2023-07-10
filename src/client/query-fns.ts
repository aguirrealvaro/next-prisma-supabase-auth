import { fetcher } from "./fetcher";
import { SignCredentialsType, User } from "@/client/interfaces";

export const signUpUser = (body: SignCredentialsType): Promise<User> => {
  return fetcher("auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
