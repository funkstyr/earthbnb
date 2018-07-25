import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utils";

import { User } from "../../entity/User";
import { invalidLogin, confirmEmail } from "./errorMessages";

const error = [
  {
    path: "login",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, args: GQL.ILoginOnMutationArguments, { session }) => {
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

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return error;
      }

      session.userId = user.id;

      return null;
    }
  }
};
