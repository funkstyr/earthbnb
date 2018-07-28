import * as bcrypt from "bcryptjs";
import { newPasswordSchema } from "@earthbnb/common";

import { ResolverMap } from "../../../types/graphql-utils";
import { createForgotpasswordLink } from "../../../utils/email/forgotPassword";
import { User } from "../../../entity/User";
import { forgotPasswordPrefix } from "../../../utils/constants";

import { expiredKey } from "./errorMessages";

import { formatYupError } from "../../../utils/formatError";
import { sendEmail } from "../../../utils/email/sendEmail";

const error = [
  {
    path: "newPassword",
    message: expiredKey
  }
];

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

      // await forgotPasswordLockAccount(user.id, redis);
      const url = await createForgotpasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      const emailUrl = await sendEmail(email, url, "Rest Password");

      console.log("Returning url:", emailUrl);

      return emailUrl;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;
      const userId = await redis.get(redisKey);

      if (!userId) {
        return error;
      }

      try {
        await newPasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 15);

      const updatePromise = User.update(
        { id: `${userId}` },
        { forgotPasswordLocked: false, password: hashedPassword }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      // set cookie - for auto login
      // session.userId = userId;

      // if(req.sessionID) {
      //   await redis.lpush(`${userSessionIdPrefix}${userId}`, req.sessionID);
      // }

      // return { sessionId: req.sessionID}

      return null;
    }
  }
};
