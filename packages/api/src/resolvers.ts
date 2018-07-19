import * as bcrypt from "bcryptjs";

import { ResolverMap } from "./types/graphql-utils";
import { User } from "./entity/User";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const passwordHash = await bcrypt.hash(password, 15);

      const user = User.create({
        email,
        password: passwordHash
      });

      await user.save();

      return true;
    }
  }
};
