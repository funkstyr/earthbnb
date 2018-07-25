import * as path from "path";
import * as fs from "fs";
import * as glob from "glob";
import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes, MergeResolvers } from "merge-graphql-schemas";

export const genSchema = () => {
  const pathToModules = path.join(__dirname, "../module");

  const types = glob
    .sync(`${pathToModules}/**.*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(r => require(r).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(types),
    resolvers: MergeResolvers(resolvers)
  });
};
