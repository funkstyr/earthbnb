import * as path from "path";
import * as fs from "fs";
import * as Redis from "ioredis";
import { GraphQLSchema } from "graphql";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

import { User } from "../entity/User";
import { createTypeormConnection } from "./createConnection";

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
  const redis = new Redis();

  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas }),
    context: ({ request }: any) => ({
      redis,
      url: `${request.protocol}://${request.get("host")}`
    })
  } as any);

  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;

    const userId = await redis.get(id);

    if (userId) {
      await User.update({ id: userId }, { confirmed: true });
      await redis.del(id);

      res.send("ok"); // redirect to front-end
    } else {
      res.send("invalid");
    }
  });

  await createTypeormConnection();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });

  console.log("\nServer is running on localhost");

  return app;
};
