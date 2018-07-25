import { Resolver, Middleware } from "../types/graphql-utils";

export const createMiddleware = (
  middleware: Middleware,
  resolver: Resolver
) => (parent: any, args: any, context: any, info: any) =>
  middleware(resolver, parent, args, context, info);
