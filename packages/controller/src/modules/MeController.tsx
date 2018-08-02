// @ts-ignore
import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { MeQuery } from "../genTypes";

const meTwoQuery = gql`
  query MeTwoQuery {
    me {
      email
    }
  }
`;

export interface WithMe {
  loading: boolean;
  me: any;
}

export const withMe = graphql<any, MeQuery, {}, WithMe>(meTwoQuery, {
  props: ({ data }) => {
    if (!data) return { loading: false, me: null };

    return { me: data.me, loading: data ? data.loading : false };
  }
});
