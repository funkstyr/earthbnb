import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables
} from "../genTypes";
import { formatErrors } from "../utils/formatErrors";
import { NormalizedErrorMap } from "../types";

interface Props {
  children: (
    data: {
      submit: (
        values: ChangePasswordMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
> {
  submit = async (values: ChangePasswordMutationVariables) => {
    console.log("fp values:", values);

    const {
      data: { forgotPasswordChange }
    } = await this.props.mutate({
      variables: values
    });

    console.log("GQL Response - Change Password:", forgotPasswordChange);

    if (forgotPasswordChange) {
      return formatErrors(forgotPasswordChange);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const changePasswordMutation = gql`
  mutation ChangePasswordMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;

export const ChangePasswordController = graphql<
  Props,
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>(changePasswordMutation)(C);
