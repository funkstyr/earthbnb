import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

import { RegisterMutation, RegisterMutationVariables } from "../genTypes";
import { NormalizedErrorMap } from "../types";
import { formatErrors } from "../utils/formatErrors";

interface Props {
  children: (
    data: {
      submit: (
        values: RegisterMutationVariables
      ) => Promise<NormalizedErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (values: RegisterMutationVariables) => {
    console.log("register values:", values);

    const {
      data: { register }
    } = await this.props.mutate({
      variables: values
    });

    console.log("GQL Response - Register:", register);

    if (register) {
      return formatErrors(register);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      path
      message
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
