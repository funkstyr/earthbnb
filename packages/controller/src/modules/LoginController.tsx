import * as React from "react";
import {
  graphql,
  ChildMutateProps,
  withApollo,
  WithApolloClient
} from "react-apollo";
import gql from "graphql-tag";

import { LoginMutation, LoginMutationVariables } from "../genTypes";
import { formatErrors } from "../utils/formatErrors";
import { NormalizedErrorMap } from "../types";

interface Props {
  children: (
    data: {
      submit: (
        values: LoginMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
  onSessionId?: (sessionId: string) => void;
}

class C extends React.PureComponent<
  ChildMutateProps<
    WithApolloClient<Props>,
    LoginMutation,
    LoginMutationVariables
  >
> {
  submit = async (values: LoginMutationVariables) => {
    const {
      data: {
        login: { errors, sessionId }
      }
    } = await this.props.mutate({
      variables: values
    });

    console.log("GQL Response - Login:", errors);

    // error from api: [{path: '', message: ''}]

    if (errors) {
      return formatErrors(errors);
    }

    if (sessionId && this.props.onSessionId) {
      this.props.onSessionId(sessionId);
    }

    await this.props.client.resetStore();

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

export const LoginController = graphql<
  Props,
  LoginMutation,
  LoginMutationVariables
>(loginMutation)(withApollo<Props>(C as any));
