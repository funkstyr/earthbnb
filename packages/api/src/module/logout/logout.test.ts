import { createTypeormConnection } from "../../utils/createConnection";
import { User } from "../../entity/User";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/test/testClient";

let connection: Connection;
let userId: string;
const host = process.env.TEST_HOST as string;
const email = "logout@test.com";
const password = "logged";

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

describe("Logout", async () => {
  test("destroy cookie", async () => {
    const client = new TestClient(host);

    await client.login(email, password);

    const loggedIn = await client.me();
    expect(loggedIn.data.me).toEqual({
      id: userId,
      email
    });

    await client.logout();

    const response = await client.me();
    expect(response.data.me).toBeNull();
  });
});
