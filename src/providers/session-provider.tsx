"use client";

import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/client/query-fns";

type SessionProviderProps = {
  children: ReactNode;
};

type SessionContextValue = {
  isAuth: boolean;
};

const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: FunctionComponent<SessionProviderProps> = ({ children }) => {
  const sessionQuery = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  if (sessionQuery.isLoading) {
    return <div>Loading!</div>;
  }

  const isAuth = Boolean(sessionQuery.data);

  return (
    <SessionContext.Provider
      value={{
        isAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
