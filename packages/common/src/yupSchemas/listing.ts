import * as yup from "yup";

export const shortText = "must be over 4 charcteers";

export const nameValidation = yup
  .string()
  .min(5, shortText)
  .max(255)
  .required();

export const categoryValidation = yup
  .string()
  .min(3, "must be over 2 characters")
  .max(255);

export const descriptionValidation = yup
  .string()
  .min(5, shortText)
  .max(255);

export const pictureUrlValidation = yup.string().max(255);

export const priceValication = yup
  .number()
  .min(1)
  .max(10000)
  .positive()
  .integer();
export const guestsValication = yup
  .number()
  .min(1)
  .max(100)
  .positive()
  .integer();
export const bedsValication = yup
  .number()
  .min(1)
  .max(30)
  .positive()
  .integer();
export const bathsValication = yup
  .number()
  .min(1)
  .max(20)
  .positive()
  .integer();

export const longituteValication = yup
  .number()
  .min(-180)
  .max(180);
export const latitudeValication = yup
  .number()
  .min(-180)
  .max(180);

export const amenitiesValidation = yup
  .array(yup.string())
  .max(30)
  .ensure()
  .cast(null);

export const listingSchema = yup.object().shape({
  name: nameValidation,
  category: categoryValidation,
  description: descriptionValidation,
  pictureUrl: pictureUrlValidation,
  price: priceValication,
  guests: guestsValication,
  beds: bedsValication,
  baths: bathsValication,
  latitude: latitudeValication,
  longitude: longituteValication
});
