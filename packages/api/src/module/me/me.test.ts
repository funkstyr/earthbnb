import { createTypeormConnection } from "../../utils/createConnection";
import { User } from "../../entity/User";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/test/testClient";

let connection: Connection;
let userId: string;
const host = process.env.TEST_HOST as string;
const email = "logged@test.com";
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

describe("Me", async () => {
  test("no cookie available", async () => {
    const client = new TestClient(host);

    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  test("cookie set", async () => {
    const client = new TestClient(host);

    await client.login(email, password);

    const response = await client.me();
    expect(response.data.me).toEqual({
      id: userId,
      email
    });
  });
});
