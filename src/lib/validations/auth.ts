import { REGISTER_USER_ERROR_MESSAGE } from "@/types";
import { z } from "zod";

export const registerUserFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: REGISTER_USER_ERROR_MESSAGE.PasswordWeek })
      .regex(/[A-Z]/, { message: REGISTER_USER_ERROR_MESSAGE.PasswordWeek })
      .regex(/\d/, { message: REGISTER_USER_ERROR_MESSAGE.PasswordWeek }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: REGISTER_USER_ERROR_MESSAGE.PasswordsDoNotMatch,
    path: ["repeatPassword"],
  });

export type RegisterUserFormSchema = z.infer<typeof registerUserFormSchema>;

export const registerUserDbSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
  patientType: z.object(
    { id: z.string() },
    { message: "User type 'pacjent' not found" },
  ),
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
