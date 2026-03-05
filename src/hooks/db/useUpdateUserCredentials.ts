import { useSession } from "next-auth/react";
import { updateUserCredentials } from "@/db/queries/data";
import { AuthFormSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserCredentials = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useMutation({
    mutationKey: ["update-user-data"],
    mutationFn: async (userData: AuthFormSchema) => {
      if (!isAuthenticated) return new Error("UNAUTHORIZED");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await updateUserCredentials(userData.newPassword);
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};
