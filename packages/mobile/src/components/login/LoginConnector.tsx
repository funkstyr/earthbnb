import * as React from "react";
import { LoginController } from "@earthbnb/controller";

import Login from "./Login";
import { RouteComponentProps } from "react-router-native";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/me");
  };

  render() {
    return (
      <LoginController onFinish={this.onFinish}>
        {({ submit }) => <Login submit={submit} />}
      </LoginController>
    );
  }
}
