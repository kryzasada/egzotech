import { useSession } from "next-auth/react";
import { UNAUTHORIZED } from "@/consts";
import {
  type UpdateUserExerciseParams,
  updateUserExercise,
} from "@/db/queries/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserExercise = () => {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return useMutation({
    mutationKey: ["update-user-exercise"],
    mutationFn: async (params: UpdateUserExerciseParams) => {
      if (!isAuthenticated) throw new Error(UNAUTHORIZED);

      await new Promise((resolve) =>
        setTimeout(resolve, params.status === "DONE" ? 5000 : 2000),
      );

      return await updateUserExercise(params);
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-exercises"] });
    },
  });
};
