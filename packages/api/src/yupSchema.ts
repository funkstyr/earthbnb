import * as yup from "yup";
import {
  shortEmail,
  invalidEmail,
  shortPassword
} from "./module/user/register/errorMessages";

export const emailValidation = yup
  .string()
  .min(3, shortEmail)
  .max(255)
  .email(invalidEmail);

export const passwordValidation = yup
  .string()
  .min(3, shortPassword)
  .max(255);
