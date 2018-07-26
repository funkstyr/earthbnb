import * as yup from "yup";
export declare const shortEmail = "email must be at least 3 characters";
export declare const invalidEmail = "must be a valid email";
export declare const shortPassword = "password must be at least 3 characters";
export declare const emailValidation: yup.StringSchema;
export declare const passwordValidation: yup.StringSchema;
export declare const registerSchema: yup.ObjectSchema<{}>;
