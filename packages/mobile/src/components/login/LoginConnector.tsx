import * as React from "react";
import { SecureStore } from "expo";
import { LoginController } from "@earthbnb/controller";

import Login from "./Login";

import { sid_key } from "../shared/constants";

export class LoginConnector extends React.PureComponent {
  saveSessionId = (sid: string) => {
    SecureStore.setItemAsync(sid_key, sid);
  };

  render() {
    return (
      <LoginController onSessionId={this.saveSessionId}>
        {({ submit }) => <Login submit={submit} />}
      </LoginController>
    );
  }
}
