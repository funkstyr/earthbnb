import * as path from "path";
import * as fs from "fs";

import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

export const genSchema = () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "../module"));

  folders.forEach(folder => {
    const { resolvers } = require(`../module/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `../module/${folder}/schema.graphql`)
    );

    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  return mergeSchemas({ schemas });
};
