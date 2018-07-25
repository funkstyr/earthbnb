import { v4 } from "uuid";
import { Redis } from "ioredis";

import { forgotPasswordPrefix } from "../constants";
import { removeUserSessions } from "../redis";
import { User } from "../../entity/User";

const expiresInSeconds = 60 * 20; // 20 minutes

export const createForgotpasswordLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();

  await redis.set(
    `${forgotPasswordPrefix}${id}`,
    userId,
    "ex",
    expiresInSeconds
  );

  return `${url}/password/${id}`;
};

export const forgotPasswordLockAccount = async (
  userId: string,
  redisContext: Redis
) => {
  await User.update({ id: userId }, { forgotPasswordLocked: true });
  await removeUserSessions(userId, redisContext);
};
