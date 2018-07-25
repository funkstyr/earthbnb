import * as fs from "fs";
import * as path from "path";
import { generateNamespace } from "@gql2ts/from-schema";
import { genSchema } from "./genSchema";

const types = generateNamespace("GQL", genSchema());

fs.writeFile(path.join(__dirname, "../../types/schema.d.ts"), types, err => {
  console.log(err);
});
