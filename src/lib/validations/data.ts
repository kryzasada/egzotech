import { AUTH_FORM_ERROR_MESSAGE, PERSONAL_FORM_ERROR_MESSAGE } from "@/consts";
import { genderEnum } from "@/db/schema";
import { z } from "zod";

export const personalFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(genderEnum.enumValues),
  height: z
    .number()
    .min(100, { message: PERSONAL_FORM_ERROR_MESSAGE.HeightInvalid })
    .max(250, { message: PERSONAL_FORM_ERROR_MESSAGE.HeightInvalid }),
  weight: z
    .number()
    .min(20, { message: PERSONAL_FORM_ERROR_MESSAGE.WeightInvalid })
    .max(500, { message: PERSONAL_FORM_ERROR_MESSAGE.WeightInvalid }),
});

export type PersonalFormSchema = z.infer<typeof personalFormSchema>;

export const authFormSchema = z
  .object({
    email: z.string(),
    newPassword: z
      .string()
      .min(8, { message: AUTH_FORM_ERROR_MESSAGE.PasswordInvalid })
      .regex(/[A-Z]/, { message: AUTH_FORM_ERROR_MESSAGE.PasswordInvalid })
      .regex(/\d/, { message: AUTH_FORM_ERROR_MESSAGE.PasswordInvalid }),
    repeatNewPassword: z.string({
      message: AUTH_FORM_ERROR_MESSAGE.PasswordsDoNotMatch,
    }),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: AUTH_FORM_ERROR_MESSAGE.PasswordsDoNotMatch,
    path: ["repeatNewPassword"],
  });

export type AuthFormSchema = z.infer<typeof authFormSchema>;
