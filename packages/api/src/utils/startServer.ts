import * as path from "path";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { createConnection, getConnectionOptions } from "typeorm";

import { resolvers } from "../resolvers";

const typeDefs = importSchema(path.join(__dirname, "../schema.graphql"));

export const startServer = async () => {
  const server = new GraphQLServer({ typeDefs, resolvers });

  const options = await getConnectionOptions(process.env.NOVE_ENV);

  await createConnection({ ...options, name: "default" });

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });

  console.log("Server is running on localhost:4000");

  return app;
};
