import axios from "axios";
import { createTypeormConnection } from "../../utils/createConnection";
import { User } from "../../entity/User";
import { Connection } from "typeorm";

let connection: Connection;
let userId: string;
const host = process.env.TEST_HOST as string;
const email = "logged@test.com";
const password = "logged";

const loginMutation = `
    mutation {
        login(email: ${email}, password: ${password}) {
            path
            message
        }
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
  test("not logged in", async () => {});

  test("logged in", async () => {
    await axios.post(
      host,
      {
        query: loginMutation
      },
      { withCredentials: true }
    );

    const response = await axios.post(
      host,
      {
        query: meQuery
      },
      { withCredentials: true }
    );

    expect(response.data.data.me.email).toEqual(email);
    expect(response.data.data.me.id).toEqual(userId);
  });
});
