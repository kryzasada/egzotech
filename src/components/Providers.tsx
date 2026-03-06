"use client";

import { ReactNode, useState } from "react";
import { SessionProvider, signOut } from "next-auth/react";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { UNAUTHORIZED } from "@/consts";

const handleQueryError = (error: unknown) => {
  if (error instanceof Error && error.message === UNAUTHORIZED) {
    signOut({ callbackUrl: "/login" });
  } else {
    console.error(error);
  }
};

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError: handleQueryError }),
        mutationCache: new MutationCache({ onError: handleQueryError }),
      }),
  );

  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default Providers;
