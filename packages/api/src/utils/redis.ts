import * as Redis from "ioredis";

import { userSessionIdPrefix, redisSessionPrefix } from "./constants";

export const redis = new Redis();

export const removeUserSessions = async (
  userId: string,
  redisContext: Redis.Redis
) => {
  const sessionIds = await redisContext.lrange(
    `${userSessionIdPrefix}${userId}`,
    0,
    -1
  );

  const promises = [];
  for (let i = 0; i < sessionIds.length; i++) {
    promises.push(redisContext.del(`${redisSessionPrefix}${sessionIds[i]}`));
  }

  await Promise.all(promises);
};
