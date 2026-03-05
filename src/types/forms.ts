import { InputType } from "@/components/ui";

export interface AuthFieldConfig {
  label: string;
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  isInvalid?: boolean;
}

export enum REGISTER_USER_ERROR_MESSAGE {
  RegisterError = "Something went wrong. Please try again later",
  PasswordsDoNotMatch = "Passwords do not match",
  UserAlreadyExists = "User with this email already exists",
  PasswordWeek = "Password is too weak. It should be at least 8 characters, uppercase letter and number",
}

export enum LOGIN_USER_ERROR_MESSAGE {
  InvalidEmailOrPassword = "Invalid email or password",
  LoginError = "Something went wrong. Please try again later",
}

export enum USERTYPE {
  Patient = "Patient",
  Doctor = "Doctor",
  Admin = "Admin",
}
