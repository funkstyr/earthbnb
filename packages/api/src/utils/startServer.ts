import { GraphQLServer } from "graphql-yoga";

import { redis } from "./redis";
import { createTypeormConnection } from "./createConnection";
import { confirmEmail } from "../routes/confirmEmail";
import { genSchema } from "./genSchema";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }: any) => ({
      redis,
      url: `${request.protocol}://${request.get("host")}`
    })
  } as any);

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeormConnection();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });

  console.log("\nServer is running on localhost");

  return app;
};
