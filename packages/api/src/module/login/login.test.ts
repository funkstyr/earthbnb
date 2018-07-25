import { invalidLogin, confirmEmail } from "./errorMessages";
import { User } from "../../entity/User";
import { createTypeormConnection } from "../../utils/createConnection";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/test/testClient";

const host = process.env.TEST_HOST as string;
const email_valid = "tester@test.com";
const password_valid = "test";
const password_wrong = "long";

let connection: Connection;
const client = new TestClient(host);

beforeAll(async () => {
  connection = await createTypeormConnection();
});

afterAll(async () => {
  connection.close();
});

describe("Login User", async () => {
  test("unregistered login", async () => {
    const response = await client.login(email_valid, password_valid);
    expect(response.data).toEqual({
      login: [
        {
          path: "login",
          message: invalidLogin
        }
      ]
    });
  });

  test("email not confirmed", async () => {
    await client.register(email_valid, password_valid);

    const response = await client.login(email_valid, password_valid);
    expect(response.data).toEqual({
      login: [
        {
          path: "login",
          message: confirmEmail
        }
      ]
    });
  });

  test("email confirmed", async () => {
    await User.update({ email: email_valid }, { confirmed: true });

    const response = await client.login(email_valid, password_valid);
    expect(response.data).toEqual({
      login: null
    });
  });

  test("invalid password", async () => {
    const response = await client.login(email_valid, password_wrong);
    expect(response.data).toEqual({
      login: [
        {
          path: "login",
          message: invalidLogin
        }
      ]
    });
  });
});
