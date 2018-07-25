import { ResolverMap } from "../../types/graphql-utils";
import { userSessionIdPrefix, redisSessionPrefix } from "../../utils/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;

      if (userId) {
        const sessionIds = await redis.lrange(
          `${userSessionIdPrefix}${userId}`,
          0,
          -1
        );

        const promises = [];
        for (let i = 0; i < sessionIds.length; i++) {
          promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
        }

        await Promise.all(promises);

        return true;
      }

      return false;
    }
  }
};
