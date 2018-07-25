import { Resolver } from "../../types/graphql-utils";
// import { User } from "../../entity/User";

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session || !context.session.userId) {
    // user not logged in
    return null;
  }

  // check permissions
  //   const user = await User.findOne({ where: { id: context.session.userId}});

  //   if(!user || !user.admin) {
  //       return null
  //   }

  //middleware
  const result = await resolver(parent, args, context, info);

  //afterware

  return result;
};
