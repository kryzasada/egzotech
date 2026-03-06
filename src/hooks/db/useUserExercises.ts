"use client";

import { useSession } from "next-auth/react";
import { getUserExercises } from "@/db/queries/data";
import { useQuery } from "@tanstack/react-query";

export const useUserExercises = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useQuery({
    queryKey: ["user-exercises", session?.user?.id],
    queryFn: getUserExercises,
    enabled: isAuthenticated,
  });
};
