"use client";

import { useSession } from "next-auth/react";
import { getUserProfile } from "@/db/queries/data";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data: session } = useSession();
  console.log(session);
  const email = session?.user?.email;

  return useQuery({
    queryKey: ["current-user", email],
    queryFn: async () => {
      if (!email) return null;
      return getUserProfile(email);
    },
    enabled: !!email,
  });
};
