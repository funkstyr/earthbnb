import * as bcrypt from "bcryptjs";
import * as yup from "yup";

import { ResolverMap } from "../../type/graphql-utils";
import { formatYupError } from "../../util/formatError";
import {
  duplicateEmail,
  shortEmail,
  invalidEmail,
  shortPassword
} from "./errorMessages";
import { User } from "../../entity/User";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, shortEmail)
    .max(255)
    .email(invalidEmail),
  password: yup
    .string()
    .min(3, shortPassword)
    .max(255)
});

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const existingUser = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (existingUser)
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];

      const passwordHash = await bcrypt.hash(password, 15);

      const user = User.create({
        email,
        password: passwordHash
      });

      await user.save();

      return null;
    }
  }
};
