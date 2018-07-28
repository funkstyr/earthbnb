import * as Redis from "ioredis";
import { Connection } from "typeorm";
import { shortPassword } from "@earthbnb/common";

import { createTypeormConnection } from "../../../utils/create/createConnection";
import { User } from "../../../entity/User";
import { TestClient } from "../../../utils/test/testClient";
import {
  createForgotpasswordLink,
  forgotPasswordLockAccount
} from "../../../utils/email/forgotPassword";
import { passwordLocked } from "../login/errorMessages";

import { expiredKey } from "./errorMessages";

let connection: Connection;
let userId: string;
const redis = new Redis();
const host = process.env.TEST_HOST as string;
const email = "new@test.com";
const password = "logged";
const newPassword_valid = "new logged";
const newPassword_short = "l";

beforeAll(async () => {
  connection = await createTypeormConnection();

  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();

  userId = user.id;
});

afterAll(async () => {
  connection.close();
});

describe("Forgot Password", async () => {
  test("change password", async () => {
    const client = new TestClient(host);

    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotpasswordLink("", userId, redis);
    expect(await client.login(email, password)).toEqual({
      data: {
        login: [
          {
            path: "login",
            message: passwordLocked
          }
        ]
      }
    });

    const urlParts = url.split("/");
    const key = urlParts[urlParts.length - 1];

    const response = await client.forgotPasswordChange(newPassword_valid, key);
    expect(response.data.forgotPasswordChange).toBeNull();
    expect(await client.forgotPasswordChange("as", key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "newPassword",
            message: expiredKey
          }
        ]
      }
    });
    expect(client.login(email, newPassword_valid)).toEqual({
      data: {
        login: null
      }
    });
  });

  test("change password short", async () => {
    const client = new TestClient(host);

    await forgotPasswordLockAccount(userId, redis);
    const url = await createForgotpasswordLink("", userId, redis);

    const urlParts = url.split("/");
    const key = urlParts[urlParts.length - 1];

    const response = await client.forgotPasswordChange(newPassword_valid, key);
    expect(response.data.forgotPasswordChange).toBeNull();

    expect(client.login(email, newPassword_short)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "newPassword",
            message: shortPassword
          }
        ]
      }
    });
  });
});
