import { request } from "graphql-request";

import { User } from "../../entity/User";
import { startServer } from "../../util/startServer";

let host = "http://localhost:4000";
const email = "tester@test.com";
const password = "test";

beforeAll(async () => {
  const app = await startServer();
  const { port }: any = app.address();
  host = `http://localhost:${port}`;
});

const mutation = `
    mutation {
        register(email: "${email}", password: "${password}")
    }
`;

test("Register user", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });

  const users = await User.find({ where: email });
  expect(users).toHaveLength(1);

  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
