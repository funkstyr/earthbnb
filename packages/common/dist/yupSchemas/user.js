"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.shortEmail = "email must be at least 3 characters";
exports.invalidEmail = "must be a valid email";
exports.shortPassword = "password must be at least 3 characters";
exports.emailValidation = yup
    .string()
    .min(3, exports.shortEmail)
    .max(255)
    .email(exports.invalidEmail)
    .required();
exports.passwordValidation = yup
    .string()
    .min(3, exports.shortPassword)
    .max(255)
    .required();
exports.registerSchema = yup.object().shape({
    email: exports.emailValidation,
    password: exports.passwordValidation
});
//# sourceMappingURL=user.js.map