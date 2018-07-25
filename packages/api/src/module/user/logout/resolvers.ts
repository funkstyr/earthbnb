import { ResolverMap } from "../../../types/graphql-utils";
import { removeUserSessions } from "../../../utils/redis";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;

      if (userId) {
        await removeUserSessions(userId, redis);

        session.destroy(err => {
          if (err) {
            console.log("logout session:", err);
          }
        });

        return true;
      }

      return false;
    }
  }
};
