import * as React from "react";
import { RegisterController } from "@earthbnb/controller";

import Register from "./Register";
import { RouteComponentProps } from "react-router-dom";

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/confirm", {
      message: "Please confirm your account. We sent you an email."
    });
  };

  render() {
    return (
      <RegisterController>
        {({ submit }) => <Register submit={submit} onFinish={this.onFinish} />}
      </RegisterController>
    );
  }
}

// container -> view
// container -> connector -> view

// naming convention
// controller -> connector -> view(web/native)
