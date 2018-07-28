import * as React from "react";
import { RegisterController } from "../../../../controller/dist";

import Register from "./Register";

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <Register submit={submit} />}
      </RegisterController>
    );
  }
}
