import { checkIfUserExists, registerUser } from "@/db/queries";
import {
  RegisterUserFormSchema,
  registerUserDbSchema,
} from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_USER_ERROR_MESSAGE, USERTYPE } from "@/types/forms";
import { useGetUserTypes } from "./useGetUserTypes";

export const useRegisterUser = () => {
  const { data: userTypes } = useGetUserTypes();

  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: RegisterUserFormSchema) => {
      const userExists = await checkIfUserExists(newUser.email);

      if (userExists) {
        throw new Error(REGISTER_USER_ERROR_MESSAGE.UserAlreadyExists);
      }

      const patientType = userTypes?.find(
        (type: { name: string }) => type.name === USERTYPE.Patient,
      );

      const validatedNewUser = registerUserDbSchema.parse({
        ...newUser,
        patientType,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await registerUser({
        ...validatedNewUser,
        userTypeId: validatedNewUser.patientType.id,
      });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};
