import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../type/graphql-utils";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const existingUser = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (existingUser)
        return [
          {
            path: "email",
            message: "unavailable"
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
