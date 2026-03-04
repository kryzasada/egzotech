"use client";

import React from "react";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";

function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

export default Providers;
