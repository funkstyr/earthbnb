import * as React from "react";
// import { LogoutController } from "@earthbnb/controller";
// import { CallLogout } from "./CallLogout";
import { RouteComponentProps } from "react-router-dom";

export class Logout extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      // <LogoutController>
      //   {({ logout }) => (
      //     <CallLogout logout={logout} onFinish={this.onFinish} />
      //   )}
      // </LogoutController>
      <div>logout</div>
    );
  }
}
