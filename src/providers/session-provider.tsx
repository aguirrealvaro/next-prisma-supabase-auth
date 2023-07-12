"use client";

import { createContext, FunctionComponent, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/client/query-fns";

type SessionProviderProps = {
  children: ReactNode;
};

type SessionContextValue = {
  isAuth: boolean;
};

export const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const sessionQuery = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  if (sessionQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!sessionQuery.data) return null;

  const email = sessionQuery.data.session?.user.email;
  const isAuth = Boolean(sessionQuery.data.session);

  console.log({ isAuth, email });

  return <SessionContext.Provider value={{ isAuth }}>{children}</SessionContext.Provider>;
};
