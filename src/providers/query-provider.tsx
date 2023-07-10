"use client";

import { FunctionComponent, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      // staleTime: Infinity: data will be always "fresh", avoiding background fetchs
      // I will update the data manually through events (invalidating queries)
      // using this method I should use `isFetching` instead of `isLoading`
      // pros: avoid background fetchs, avoid hard refreshs (without a loading state)
      // cons: The data may not always be up to date (third users interacting with the data).
      staleTime: Infinity,
    },
  },
});

type QueryProviderProps = {
  children: ReactNode;
};

const QueryProvider: FunctionComponent<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };
