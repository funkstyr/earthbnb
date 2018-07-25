import { Request, Response } from "express";

import { User } from "../entity/User";
import { redis } from "../utils/redis";
import { confirmEmailPrefix } from "../utils/constants";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = await redis.get(`${confirmEmailPrefix}${id}`);

  if (userId) {
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(`${confirmEmailPrefix}${id}`);

    res.send("ok"); // redirect to front-end
  } else {
    res.send("invalid");
  }
};
