import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRedisStore from "rate-limit-redis";
import { GraphQLServer } from "graphql-yoga";
import { applyMiddleware } from "graphql-middleware";

import { redis } from "./redis";
import { createTypeormConnection } from "./create/createConnection";
import { confirmEmail } from "../routes/confirmEmail";
import { genSchema } from "./genSchema";
import { redisSessionPrefix } from "./constants";
import { createTestConnection } from "./test/createTestConnection";
import { middleware } from "./graphqlMiddleware";
import { userLoader } from "../loaders/userLoader";

const timeInMilliseconds = 1000 * 60 * 60 * 24 * 7; //7 days
const RedisStore = connectRedis(session);
const redisStoreOptions = {
  client: redis as any,
  prefix: redisSessionPrefix
};

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const schema = genSchema() as any;
  applyMiddleware(schema, middleware);

  const server = new GraphQLServer({
    schema,
    context: ({ request, response }: any) => ({
      redis,
      session: request.session,
      req: request,
      res: response,
      url: `${request.protocol}://${request.get("host")}`,
      userLoader: userLoader()
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
        secure: false,
        maxAge: timeInMilliseconds
      }
    })
  );

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit IP to 100 request
      delayMs: 0
    })
  );

  server.express.use("/images", express.static("images"));

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConnection(true);
  } else {
    const connection = await createTypeormConnection();
    await connection.runMigrations();
  }

  const port = process.env.PORT || 4000;

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : port,
    cors
  });

  console.log("\nServer is running on localhost");

  return app;
};
