import { ResolverMap } from "../../types/graphql-utils";
import { removeUserSessions } from "../../utils/redis";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;

      if (userId) {
        await removeUserSessions(userId, redis);

        return true;
      }

      return false;
    }
  }
};
