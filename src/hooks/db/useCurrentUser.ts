"use client";

import { useSession } from "next-auth/react";
import { getUserProfile } from "@/db/queries";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useQuery({
    queryKey: ["current-user", session?.user?.id],
    queryFn: getUserProfile,
    enabled: isAuthenticated,
  });
};
