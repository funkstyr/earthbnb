import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import {
  CreateListingMutation,
  CreateListingMutationVariables
} from "../genTypes";

export const createListingMutation = gql`
  mutation CreateListingMutation(
    $name: String!
    $category: String!
    $description: String!
    $picture: Upload
    $price: Int!
    $beds: Int!
    $baths: Int!
    $guests: Int!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String!]!
  ) {
    createListing(
      input: {
        name: $name
        category: $category
        description: $description
        picture: $picture
        price: $price
        beds: $beds
        baths: $baths
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
      }
    )
  }
` as any & React.AbstractView;

export interface NewPropsCreateListing {
  createListing: (variables: CreateListingMutationVariables) => void;
}

export const withCreateListing = graphql<
  any,
  CreateListingMutation,
  CreateListingMutationVariables,
  NewPropsCreateListing
>(createListingMutation, {
  props: ({ mutate }) => ({
    createListing: async variables => {
      if (!mutate) {
        return;
      }

      const response = await mutate({
        variables
      });

      console.log("Create Listing Resposne -", response);
    }
  })
});
