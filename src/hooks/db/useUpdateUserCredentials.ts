import { useSession } from "next-auth/react";
import { UNAUTHORIZED } from "@/consts";
import { updateUserCredentials } from "@/db/queries";
import { AuthFormSchema } from "@/lib/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserCredentials = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useMutation({
    mutationKey: ["update-user-credentials"],
    mutationFn: async (userData: AuthFormSchema) => {
      if (!isAuthenticated) throw new Error(UNAUTHORIZED);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await updateUserCredentials(userData.newPassword);
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
