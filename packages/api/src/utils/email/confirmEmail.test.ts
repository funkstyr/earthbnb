import * as Redis from "ioredis";
import fetch from "node-fetch";
import { Connection } from "typeorm";

import { createConfirmEmailLink } from "./confirmEmail";
import { createTypeormConnection } from "../create/createConnection";
import { User } from "../../entity/User";

const redis = new Redis();
const host = process.env.TEST_HOST as string;
let userId = "";
let connection: Connection;

beforeAll(async () => {
  connection = await createTypeormConnection();

  const user = await User.create({
    email: "link@test.com",
    password: "tester"
  }).save();

  userId = user.id;
});

afterAll(async () => {
  connection.close();
});

describe("Create Confirmation Link", async () => {
  test("confirms user and clears key in redis", async () => {
    const url = await createConfirmEmailLink(host, userId as string, redis);

    const response = await fetch(url);
    const text = await response.text();
    expect(text).toEqual("ok");

    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();

    const urlChunks = url.split("/");
    const key = urlChunks[urlChunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });
});
