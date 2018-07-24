import * as path from "path";
import * as fs from "fs";
import { createConnection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

// import { createConnection, getConnectionOptions } from "typeorm";

const schemas: GraphQLSchema[] = [];
const folders = fs.readdirSync(path.join(__dirname, "../module"));

folders.forEach(folder => {
  const { resolvers } = require(`../module/${folder}/resolvers`);
  const typeDefs = importSchema(
    path.join(__dirname, `../module/${folder}/schema.graphql`)
  );

  schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
});

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas })
  } as any);

  // const options = await getConnectionOptions(process.env.NOVE_ENV);
  // await createConnection({ ...options, name: "default" });
  // cannot find default connection

  createConnection();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });

  console.log("Server is running on localhost:4000");

  return app;
};
