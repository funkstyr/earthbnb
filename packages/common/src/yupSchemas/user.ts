import * as yup from "yup";

export const shortEmail = "email must be at least 3 characters";
export const invalidEmail = "must be a valid email";
export const invalidLogin = "invalid login";
export const shortPassword = "password must be at least 3 characters";

export const emailValidation = yup
  .string()
  .min(3, shortEmail)
  .max(255)
  .email(invalidEmail)
  .required();

export const passwordValidation = yup
  .string()
  .min(3, shortPassword)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
});

export const newPasswordSchema = yup.object().shape({
  newPassword: passwordValidation
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, shortEmail)
    .max(255)
    .email(invalidLogin)
    .required(),
  password: passwordValidation
});
