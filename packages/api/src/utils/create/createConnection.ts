import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../../entity/User";
import { Listing } from "../../entity/Listing";

export const createTypeormConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        name: "default",
        url: process.env.DATABASE_URL as string,
        entities: [User, Listing]
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
