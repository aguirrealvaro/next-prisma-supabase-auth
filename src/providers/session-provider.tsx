"use client";

import { createContext, FunctionComponent, ReactNode } from "react";
import { Session, User } from "@/client/interfaces";

type SessionProviderProps = {
  children: ReactNode;
  session: Session | null;
};

type SessionContextValue = {
  isAuth: boolean;
  user: User | undefined;
};

export const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({
  children,
  session,
}) => {
  const isAuth = Boolean(session);
  const user = session?.user;

  // eslint-disable-next-line no-console
  console.log({ isAuth, user });

  return (
    <SessionContext.Provider value={{ isAuth, user }}>{children}</SessionContext.Provider>
  );
};
