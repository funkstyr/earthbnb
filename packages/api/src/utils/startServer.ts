import "dotenv/config";
import "reflect-metadata";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { GraphQLServer } from "graphql-yoga";

import { redis } from "./redis";
import { createTypeormConnection } from "./create/createConnection";
import { confirmEmail } from "../routes/confirmEmail";
import { genSchema } from "./create/genSchema";

const timeInMilliseconds = 1000 * 60 * 60 * 24 * 7; //7 days
const RedisStore = connectRedis(session);
const redisStoreOptions = {};

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }: any) => ({
      redis,
      session: request.session,
      url: `${request.protocol}://${request.get("host")}`
    })
  } as any);

  server.express.use(
    session({
      name: "qid",
      store: new RedisStore(redisStoreOptions),
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: timeInMilliseconds
      }
    })
  );

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeormConnection();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
    cors
  });

  console.log("\nServer is running on localhost");

  return app;
};
