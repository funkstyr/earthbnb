import * as React from "react";
import Register from "./Register";

export class RegisterConnector extends React.PureComponent {
  submit = async (values: any) => {
    console.log("register values:", values);

    return null;
  };

  render() {
    return <Register submit={this.submit} />;
  }
}

// container -> view
// container -> connector -> view

// naming convention
// controller -> connector -> view(web/native)
