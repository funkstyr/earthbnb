import * as React from "react";
import { LoginController } from "@earthbnb/controller";

import Login from "./Login";
import { RouteComponentProps } from "react-router-dom";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <Login submit={submit} onFinish={this.onFinish} />}
      </LoginController>
    );
  }
}

// container -> view
// container -> connector -> view

// naming convention
// controller -> connector -> view(web/native)
