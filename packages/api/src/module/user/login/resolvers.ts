import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utils";

import { User } from "../../entity/User";
import { invalidLogin, confirmEmail, passwordLocked } from "./errorMessages";
import { userSessionIdPrefix } from "../../utils/constants";

const error = [
  {
    path: "login",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      args: GQL.ILoginOnMutationArguments,
      { session, redis, req }
    ) => {
      const { email, password } = args;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return error;
      }

      if (!user.confirmed) {
        return [
          {
            path: "login",
            message: confirmEmail
          }
        ];
      }

      if (user.forgotPasswordLocked) {
        return [
          {
            path: "login",
            message: passwordLocked
          }
        ];
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return error;
      }

      session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      return null;
    }
  }
};
