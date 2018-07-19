interface ResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: {}, info: any) => any;
  };
}

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`
  },
  Mutation: {
    register: (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
      return email + password;
    }
  }
};
