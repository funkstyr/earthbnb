import { v4 } from "uuid";
import { Redis } from "ioredis";

const expiresInSeconds = 60 * 60 * 24; // 1 day

export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();

  await redis.set(id, userId, "ex", expiresInSeconds);

  return `${url}/confirm/${id}`;
};
