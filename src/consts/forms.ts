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

export enum PERSONAL_FORM_ERROR_MESSAGE {
  UpdateFailed = "Failed to update data. Please try again later",
  HeightInvalid = "Height must be between 100 and 250 cm",
  WeightInvalid = "Weight must be between 20 and 500 kg",
}

export enum AUTH_FORM_ERROR_MESSAGE {
  UpdateFailed = "Failed to update data. Please try again later",
  PasswordInvalid = "Password must be at least 8 characters, uppercase letter and number",
  PasswordsDoNotMatch = "Passwords do not match",
}
