import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      const listing = await Listing.findOne({ where: { id } });

      if (!listing) {
        throw new Error("does nto exist");
      }

      if (session.userId !== listing.userId) {
        console.log("Unauthorized removing lisitng", session.userId);
        throw new Error("not authorized");
      }

      await Listing.remove(listing);

      return true;
    }
  }
};
