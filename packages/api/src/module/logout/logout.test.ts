import axios from "axios";
import { createTypeormConnection } from "../../utils/createConnection";
import { User } from "../../entity/User";
import { Connection } from "typeorm";

let connection: Connection;
const host = process.env.TEST_HOST as string;
const email = "logout@test.com";
const password = "logged";

const loginMutation = `
    mutation {
        login(email: ${email}, password: ${password}) {
            path
            message
        }
    }
`;

const logoutMutation = `
    mutation {
        logout
    }
`;

const meQuery = `
    {
        me {
            id
            email
        }
    }
`;

beforeAll(async () => {
  connection = await createTypeormConnection();

  await User.create({
    email,
    password,
    confirmed: true
  }).save();
});

afterAll(async () => {
  connection.close();
});

describe("Logout", async () => {
  test("destroy cookie", async () => {
    await axios.post(
      host,
      {
        query: loginMutation
      },
      { withCredentials: true }
    );

    await axios.post(
      host,
      {
        query: logoutMutation
      },
      { withCredentials: true }
    );

    const response = await axios.post(
      host,
      { query: meQuery },
      { withCredentials: true }
    );
    expect(response.data.data.me).toBeNull();
  });
});
