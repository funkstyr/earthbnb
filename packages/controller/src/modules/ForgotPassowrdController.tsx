import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
} from "../genTypes";

interface Props {
  children: (
    data: {
      submit: (values: ForgotPasswordMutationVariables) => Promise<null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
> {
  submit = async (values: ForgotPasswordMutationVariables) => {
    console.log("fp values:", values);

    const { data } = await this.props.mutate({
      variables: values
    });

    console.log("GQL Response - Forgot Password:", data);

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation ForgotPasswordMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const ForgotPasswordController = graphql<
  Props,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>(forgotPasswordMutation)(C);
