import * as shortid from "shortid";
import { createWriteStream } from "fs";
import { listingSchema } from "@earthbnb/common";
import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { formatYupError } from "../../../utils/formatError";

const storeUpload = async ({ stream, mimetype }: any): Promise<any> => {
  const id = shortid.generate();
  const extension = mimetype.split("/")[1];

  const path = `images/${id}.${extension}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const fileUpload = await upload;

  if (fileUpload) {
    const { stream, filename, mimetype } = fileUpload;
    const { path } = await storeUpload({ stream, filename, mimetype });

    return path;
  }

  return "images/default.jpg";
};

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (
      _,
      { input: { picture, ...data } }: GQL.ICreateListingOnMutationArguments,
      { session }
    ) => {
      const pictureUrl = await processUpload(picture);

      console.log("pictureUrl:", pictureUrl);

      const args = {
        ...data,
        pictureUrl,
        userId: session.userId
      };

      console.log("Args: ", args);

      try {
        await listingSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      await Listing.create().save();

      return true;
    }
  }
};
