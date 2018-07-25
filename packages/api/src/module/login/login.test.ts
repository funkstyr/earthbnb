import { request } from "graphql-request";
import { invalidLogin, confirmEmail } from "./errorMessages";
import { User } from "../../entity/User";
import { createTypeormConnection } from "../../utils/createConnection";
import { Connection } from "typeorm";

const host = process.env.TEST_HOST as string;
const email_valid = "tester@test.com";
const password_valid = "test";
const password_wrong = "long";

// call: register/login
const mutation = (call: string, email: string, password: string) => `
    mutation {
        ${call}(email: "${email}", password: "${password}") {
          path
          message
        }
    }
`;

let connection: Connection;

beforeAll(async () => {
  connection = await createTypeormConnection();
});

afterAll(async () => {
  connection.close();
});

describe("Login User", async () => {
  test("unregistered login", async () => {
    const response = await request(
      host,
      mutation("login", email_valid, password_valid)
    );
    expect(response).toEqual({
      login: [
        {
          path: "login",
          message: invalidLogin
        }
      ]
    });
  });

  test("email not confirmed", async () => {
    await request(host, mutation("register", email_valid, password_valid));

    const response = await request(
      host,
      mutation("login", email_valid, password_valid)
    );
    expect(response).toEqual({
      login: [
        {
          path: "login",
          message: confirmEmail
        }
      ]
    });
  });

  test("email confirmed", async () => {
    // await request(host, mutation("register", email_valid, password_valid));
    // await User.update({ email: email_valid }, { confirmed: true });
    await User.update({ email: email_valid }, { confirmed: true });

    const response = await request(
      host,
      mutation("login", email_valid, password_valid)
    );
    expect(response).toEqual({
      login: null
    });
  });

  test("invalid password", async () => {
    // await request(host, mutation("register", email_valid, password_valid));
    // await User.update({ email: email_valid }, { confirmed: true });

    const response = await request(
      host,
      mutation("login", email_valid, password_wrong)
    );
    expect(response).toEqual({
      login: [
        {
          path: "login",
          message: invalidLogin
        }
      ]
    });
  });
});
