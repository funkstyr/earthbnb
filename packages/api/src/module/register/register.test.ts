import { request } from "graphql-request";

import { User } from "../../entity/User";
import {
  duplicateEmail,
  invalidEmail,
  shortEmail,
  shortPassword
} from "./errorMessages";
import { createTypeormConnection } from "../../utils/createConnection";

const host = process.env.TEST_HOST as string;
const email_valid = "tester@test.com";
const email_short = "t";
const email_invalid = "tester";
const password_valid = "test";
const password_short = "p";

const mutation = (email: string, password: string) => `
    mutation {
        register(email: "${email}", password: "${password}") {
          path
          message
        }
    }
`;

// test error: ConnectionNotFoundError: Connection "default" was not found
// existing user test passes

beforeAll(async () => {
  await createTypeormConnection;
});

describe("Register User", async () => {
  test("valid user", async () => {
    const response = await request(host, mutation(email_valid, password_valid));
    expect(response).toEqual({ register: null });

    const users = await User.find({ where: email_valid });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(email_valid);
    expect(user.password).not.toEqual(password_valid);
  });

  test("existing user", async () => {
    const response: any = await request(
      host,
      mutation(email_valid, password_valid)
    );
    expect(response.register).toHaveLength(1);
    expect(response.register[0]).toEqual({
      path: "email",
      message: duplicateEmail
    });
  });

  test("short email", async () => {
    const response: any = await request(
      host,
      mutation(email_short, password_valid)
    );
    expect(response.register).toEqual([
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
    const response: any = await request(
      host,
      mutation(email_invalid, password_valid)
    );
    expect(response.register).toEqual([
      {
        path: "email",
        message: invalidEmail
      }
    ]);
  });

  test("short password", async () => {
    const response: any = await request(
      host,
      mutation(email_valid, password_short)
    );
    expect(response.register).toEqual([
      {
        path: "password",
        message: shortPassword
      }
    ]);
  });
});
