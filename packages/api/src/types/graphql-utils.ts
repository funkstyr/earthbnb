import { Redis } from "ioredis";
import { userLoader } from "../loaders/userLoader";

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
  userLoader: ReturnType<typeof userLoader>;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Middleware = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface Session extends Express.Session {
  userId?: string;
}

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
