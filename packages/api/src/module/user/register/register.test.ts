import { Connection } from "typeorm";
import { invalidEmail, shortEmail, shortPassword } from "@earthbnb/common";

import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { TestClient } from "../../../utils/test/testClient";
import { createTestConnection } from "../../../utils/test/createTestConnection";

const host = process.env.TEST_HOST as string;
const email_valid = "tester@test.com";
const email_short = "t";
const email_invalid = "tester";
const password_valid = "test";
const password_short = "p";

let connection: Connection;
const client = new TestClient(host);

beforeAll(async () => {
  connection = await createTestConnection();
});

afterAll(async () => {
  connection.close();
});

describe("Register User", async () => {
  test("short email", async () => {
    const response = await client.register(email_short, password_valid);
    console.log("response:", response);
    expect(response.data.register).toEqual([
      {
        path: "email",
        message: shortEmail
      },
      {
        path: "email",
        message: invalidEmail
      }
    ]);
  });

  test("invalid email", async () => {
    const response = await client.register(email_invalid, password_valid);
    expect(response.data.register).toEqual([
      {
        path: "email",
        message: invalidEmail
      }
    ]);
  });

  test("short password", async () => {
    const response = await client.register(email_valid, password_short);
    expect(response.data.register).toEqual([
      {
        path: "password",
        message: shortPassword
      }
    ]);
  });

  test("valid user", async () => {
    const response = await client.register(email_valid, password_valid);
    expect(response.data).toEqual({ register: null });

    const users = await User.find({ where: { email: email_valid } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email_valid);
    expect(user.password).not.toEqual(password_valid);
  });

  test("existing user", async () => {
    const response = await client.register(email_valid, password_valid);
    expect(response.data.register).toHaveLength(1);
    expect(response.data.register[0]).toEqual({
      path: "email",
      message: duplicateEmail
    });
  });
});
