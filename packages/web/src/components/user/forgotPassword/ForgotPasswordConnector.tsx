import * as React from "react";
import { ForgotPasswordController } from "@earthbnb/controller";
import { RouteComponentProps } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";

export class ForgotPasswordConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/reset", {
      message: "We sent you an email."
    });
  };

  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => (
          <ForgotPassword submit={submit} onFinish={this.onFinish} />
        )}
      </ForgotPasswordController>
    );
  }
}
