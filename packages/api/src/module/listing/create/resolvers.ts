import * as shortid from "shortid";
import { createWriteStream } from "fs";
import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";

const storeUpload = async ({ stream, mimetype }: any): Promise<any> => {
  const id = shortid.generate();
  const extension = mimetype.split("/")[1];

  console.log("entension type:", extension);

  const path = `images/${id}.${extension}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const { stream, filename, mimetype } = await upload;
  const { id } = await storeUpload({ stream, filename, mimetype });
  return id;
};

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data } }, { session }) => {
      const pictureUrl = await processUpload(picture);

      await Listing.create({
        ...data,
        pictureUrl,
        userId: session.userId
      }).save();

      return true;
    }
  }
};
