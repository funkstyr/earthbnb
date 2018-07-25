// import * as bcrypt from "bcryptjs";
import * as yup from "yup";

import { ResolverMap } from "../../../types/graphql-utils";
import {
  forgotPasswordLockAccount,
  createForgotpasswordLink
} from "../../../utils/email/forgotPassword";
import { User } from "../../../entity/User";
import { forgotPasswordPrefix } from "../../../utils/constants";

import { expiredKey } from "./errorMessages";
import { passwordValidation } from "../../../yupSchema";
import { formatYupError } from "../../../utils/formatError";

const error = [
  {
    path: "newPassword",
    message: expiredKey
  }
];

const schema = yup.object().shape({
  newPassword: passwordValidation
});

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return false;
      }

      await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotpasswordLink("", user.id, redis);
      console.log("fp link:", url);
      //send email

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;
      const userId = redis.get(redisKey);

      if (!userId) {
        return error;
      }

      try {
        await schema.validate({ newPassword }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const updatePromise = User.update(
        { id: `${userId}` },
        { forgotPasswordLocked: false, password: newPassword }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
