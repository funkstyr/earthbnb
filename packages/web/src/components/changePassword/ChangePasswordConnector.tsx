import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChangePasswordController } from "@earthbnb/controller";

import ChangePassword from "./ChangePassword";

export class ChangePasswordConnector extends React.PureComponent<
  RouteComponentProps<{ key: string }>
> {
  onFinish = () => {
    this.props.history.push("/login");
  };

  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;

    return (
      <ChangePasswordController>
        {({ submit }) => (
          <ChangePassword
            submit={({ newPassword }) => submit({ key, newPassword })}
            onFinish={this.onFinish}
          />
        )}
      </ChangePasswordController>
    );
  }
}
