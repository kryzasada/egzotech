import { useSession } from "next-auth/react";
import { updateUserData } from "@/db/queries/data";
import { PersonalFormSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserData = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useMutation({
    mutationKey: ["update-user-data"],
    mutationFn: async (userData: PersonalFormSchema) => {
      if (!isAuthenticated) return new Error("UNAUTHORIZED");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await updateUserData({ ...userData });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};
