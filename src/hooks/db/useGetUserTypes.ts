"use client";

import { getUserTypes } from "@/db/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetUserTypes = () => {
  return useQuery({
    queryKey: ["user-types"],
    queryFn: () => getUserTypes(),
  });
};
