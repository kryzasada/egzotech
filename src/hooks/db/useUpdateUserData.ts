import { useSession } from "next-auth/react";
import { UNAUTHORIZED } from "@/consts";
import { updateUserData } from "@/db/queries";
import { PersonalFormSchema } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useMutation({
    mutationKey: ["update-user-data"],
    mutationFn: async (userData: PersonalFormSchema) => {
      if (!isAuthenticated) throw new Error(UNAUTHORIZED);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await updateUserData({ ...userData });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
};
