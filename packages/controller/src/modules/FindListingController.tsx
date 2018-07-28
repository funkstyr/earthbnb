// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { FindListingsQuery_findListings, FindListingsQuery } from "../genTypes";

export const findListingsQuery = gql`
  query FindListingsQuery {
    findListings {
      id
      name
      description
      pictureUrl
      beds
      baths
      guests
      price
      amenities
      owner {
        id
        email
      }
    }
  }
`;

export interface WithFindListings {
  listings: FindListingsQuery_findListings[];
  loading: boolean;
}

export const withFindListings = graphql<
  any,
  FindListingsQuery,
  {},
  WithFindListings
>(findListingsQuery, {
  props: ({ data }) => {
    console.log("find listing values:", data);

    let listings: FindListingsQuery_findListings[] = [];

    if (data && !data.loading && data.findListings) {
      listings = data.findListings;
    }
    return { listings, loading: data ? data.loading : false };
  }
});
